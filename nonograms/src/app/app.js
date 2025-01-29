import { checkCell, isPuzzleSolved } from '@/components/game/gameLogic';
import createGameState from '@/components/game/gameState';
import templates from '@/components/game/templates';
import createGameControls from '@/components/gameControls/gameControls';
import createModal from '@/components/modal/modal';
import { calcCells } from '@/components/puzzleBoard/boardUtils';
import createPuzzleBoard from '@/components/puzzleBoard/puzzleBoard';
import createPuzzleMenu from '@/components/puzzlesMenu/puzzlesMenu';
import createTimer from '@/components/timer/timer';
import { div } from '@/utils/createElement';
import createEventEmitter from '@/utils/eventEmitter';

/**
 * @param {{ name: string, icon: string, size: number, matrix: number[][] }} template
 * @param {HTMLElement} gameContainer
 * @param {import('@/utils/eventEmitter').EventEmitter} emitter
 */
function renderTemplate(template, gameContainer, emitter) {
  gameContainer.replaceChildren();
  gameContainer.style.removeProperty('pointer-events');

  const newPuzzleBoard = createPuzzleBoard(
    template.matrix,
    template.icon,
    emitter
  );

  gameContainer.appendChild(newPuzzleBoard);
}

// /**
//  * @param {{ name: string, icon: string, size: number, matrix: number[][] }} template
//  * @param {import('@/components/game/gameState').GameState} gameState
//  * @param {import('@/utils/eventEmitter').EventEmitter} emitter
//  * */
// function setUpGame(template, gameState, emitter) {
//   gameState.updateState({ isGameOver: false });
//   gameState.updateState({ currentTemplateMatrix: template.matrix });
//   gameState.updateState({
//     correctCellsCount: calcCells(template.matrix),
//   });
//   emitter.on('cellClick', cellClickHandler);
// }

/**
 * @param {number} size
 * @returns {number[][]}
 */
function generatePlayerMatrix(size) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 0)
  );
}

function initApp() {
  const emitter = createEventEmitter();
  const gameState = createGameState();
  createModal(emitter);

  const puzzleMenu = createPuzzleMenu(templates, emitter);
  document.body.appendChild(puzzleMenu);

  const timer = createTimer(gameState, emitter, document.body);

  const gameContainer = div({ className: 'container' });
  document.body.appendChild(gameContainer);

  const initialPuzzle = templates[0];

  renderTemplate(initialPuzzle, gameContainer, emitter);

  gameState.updateState({
    currentTemplateName: initialPuzzle.name,
    currentTemplateMatrix: initialPuzzle.matrix,
    correctCellsCount: calcCells(initialPuzzle.matrix),
    playerMatrix: generatePlayerMatrix(initialPuzzle.size),
    playerCorrectCellsCount: 0,
  });

  /**
   * @param {Object} params
   * @param {number} params.rowIndex
   * @param {number} params.colIndex
   * @param {number} params.cellState
   */
  const cellClickHandler = ({ rowIndex, colIndex, cellState }) => {
    checkCell({ rowIndex, colIndex, cellState }, gameState);

    if (isPuzzleSolved(gameState)) {
      timer.stopTimer();
      const { elapsedTime } = gameState.getState();
      emitter.emit('gameOver', `You won in ${elapsedTime} seconds!`);
      emitter.emit('solutionReveal');

      gameContainer.style.pointerEvents = 'none';
      emitter.off('cellClick', cellClickHandler);
    }
  };

  /**
   * @param {{ name: string, icon: string, size: number, matrix: number[][] }} selectedTemplate
   */
  const templateSelectHandler = (selectedTemplate) => {
    emitter.off('cellClick', cellClickHandler);

    renderTemplate(selectedTemplate, gameContainer, emitter);
    timer.resetTimer();

    // TODO: use setup game
    gameState.updateState({
      currentTemplateName: selectedTemplate.name,
      currentTemplateMatrix: selectedTemplate.matrix,
      correctCellsCount: calcCells(selectedTemplate.matrix),
      playerMatrix: generatePlayerMatrix(selectedTemplate.size),
      playerCorrectCellsCount: 0,
    });

    emitter.on('cellClick', cellClickHandler);
  };

  // TODO: templateChangeHandler
  emitter.on('templateSelected', templateSelectHandler);

  emitter.on('cellClick', cellClickHandler);

  const gameControls = createGameControls(gameState, templates, emitter);
  document.body.appendChild(gameControls);
}

export default initApp;
