import renderTemplate from '@/components/game/gameRender';
import { saveScore } from '@/components/game/gameUtils';
import {
  calcCells,
  generatePlayerMatrix,
} from '@/components/puzzleBoard/boardUtils';
/**
 * @param {GameState} gameState
 */
export function isPuzzleSolved(gameState) {
  const { correctCellsCount, playerCorrectCellsCount } = gameState.getState();
  return correctCellsCount === playerCorrectCellsCount;
}

/**
 * @param {CellParams} params
 * @param {GameState} gameState
 */
export function checkCell({ rowIndex, colIndex, cellState }, gameState) {
  const { currentTemplateMatrix, playerMatrix, playerCorrectCellsCount } =
    gameState.getState();

  const correctCellState = currentTemplateMatrix[rowIndex][colIndex];
  const previousCellState = playerMatrix[rowIndex][colIndex];

  const playerCellState = Number(cellState);

  let currentCorrectCellsCount = playerCorrectCellsCount;

  const isCorrectBlackAdded = playerCellState === 1 && correctCellState === 1;
  const isCorrectBlackRemoved =
    previousCellState === 1 && playerCellState !== 1 && correctCellState === 1;

  const isIncorrectBlackAdded = playerCellState === 1 && correctCellState === 0;
  const isIncorrectBlackRemoved =
    previousCellState === 1 && playerCellState !== 1 && correctCellState === 0;

  if (isCorrectBlackAdded || isIncorrectBlackRemoved) {
    currentCorrectCellsCount += 1;
  } else if (isCorrectBlackRemoved || isIncorrectBlackAdded) {
    currentCorrectCellsCount -= 1;
  }

  const updatedPlayerMatrix = playerMatrix;
  updatedPlayerMatrix[rowIndex][colIndex] = playerCellState;

  gameState.updateState({
    playerMatrix: updatedPlayerMatrix,
    playerCorrectCellsCount: currentCorrectCellsCount,
  });
}

/**
 * @param {CellParams} params
 * @param {GameState} gameState
 * @param {EventEmitter} emitter
 * @param {TimerControls} timer
 * @param {HTMLElement} gameContainer
 */
export function handleCellClick(
  { rowIndex, colIndex, cellState },
  gameState,
  emitter,
  timer,
  gameContainer
) {
  checkCell({ rowIndex, colIndex, cellState }, gameState);

  if (isPuzzleSolved(gameState)) {
    timer.stopTimer();
    const { elapsedTime, currentTemplateName} = gameState.getState();
    emitter.emit('gameOver', `You won in ${elapsedTime} seconds!`);
    emitter.emit('solutionReveal');


    saveScore(currentTemplateName, elapsedTime)

    const gameContainerElement = gameContainer;
    gameContainerElement.style.pointerEvents = 'none';
  }
}

/**
 * @param {Template} template
 * @param {GameState} gameState
 * @param {EventEmitter} emitter
 * @param {TimerControls} timer
 * @param {HTMLElement} gameContainer
 * @param {function} cellClickHandler
 * */
export function setUpGame(
  template,
  gameState,
  emitter,
  timer,
  gameContainer,
  cellClickHandler
) {
  emitter.off('cellClick', cellClickHandler);

  renderTemplate(template, gameContainer, emitter);
  timer.resetTimer();

  gameState.updateState({
    currentTemplateName: template.name,
    currentTemplateMatrix: template.matrix,
    correctCellsCount: calcCells(template.matrix),
    playerMatrix: generatePlayerMatrix(template.size),
    playerCorrectCellsCount: 0,
  });

  emitter.on('cellClick', cellClickHandler);
}
