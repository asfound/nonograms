import createGameState from '@/components/game/gameState';
import templates from '@/components/game/templates';
import { calcCells } from '@/components/puzzleBoard/boardUtils';
import createPuzzleBoard from '@/components/puzzleBoard/puzzleBoard';
import createPuzzleMenu from '@/components/puzzlesMenu/puzzlesMenu';
import { div } from '@/utils/createElement';
import createEventEmitter from '@/utils/eventEmitter';

/**
 * @param {{ name: string, icon: string, size: number, matrix: number[][] }} template
 * @param {HTMLElement} gameContainer
 * @param {import('@/utils/eventEmitter').EventEmitter} emitter
 */
function renderTemplate(template, gameContainer, emitter) {
  gameContainer.replaceChildren();

  const newPuzzleBoard = createPuzzleBoard(
    template.matrix,
    template.icon,
    emitter
  );

  gameContainer.appendChild(newPuzzleBoard);
}

function initApp() {
  const emitter = createEventEmitter();
  const gameState = createGameState();

  const puzzleMenu = createPuzzleMenu(templates, emitter);
  document.body.appendChild(puzzleMenu);

  const gameContainer = div({ className: 'container' });
  document.body.appendChild(gameContainer);

  const initialPuzzle = templates[0];

  renderTemplate(initialPuzzle, gameContainer, emitter);
  gameState.updateState({ currentTemplateMatrix: initialPuzzle.matrix });
  gameState.updateState({ correctCellsCount: calcCells(initialPuzzle.matrix) });

  emitter.on(
    'templateSelected',
    /** @param {{ name: string, icon: string, size: number, matrix: number[][] }} selectedTemplate */ (
      selectedTemplate
    ) => {
      renderTemplate(selectedTemplate, gameContainer, emitter);
      gameState.updateState({ currentTemplateMatrix: selectedTemplate.matrix });
      gameState.updateState({
        correctCellsCount: calcCells(selectedTemplate.matrix),
      });
    }
  );
}

export default initApp;
