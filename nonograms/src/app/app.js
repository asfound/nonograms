import createGameState from '@/components/game/gameState';
import templates from '@/components/game/templates';
import createPuzzleBoard from '@/components/puzzleBoard/puzzleBoard';
import createPuzzleMenu from '@/components/puzzlesMenu/puzzlesMenu';
import createEventEmitter from '@/utils/eventEmitter';

/**
 * @param {{ name: string, icon: string, size: number, matrix: number[][] }} template
 * @param {import('@/components/game/gameState').GameState} gameState
 */
function renderTemplate(template, gameState) {
  const oldPuzzle = gameState.getState().puzzle;
  if (oldPuzzle instanceof HTMLElement) {
    oldPuzzle.remove();
  }

  const puzzle = createPuzzleBoard(template.matrix, template.icon);
  gameState.updateState({ puzzle });
  document.body.appendChild(puzzle);
}

function initApp() {
  const emitter = createEventEmitter();
  const gameState = createGameState();

  const puzzleMenu = createPuzzleMenu(templates, emitter);
  document.body.appendChild(puzzleMenu);
  renderTemplate(templates[0], gameState);
  emitter.on(
    'templateSelected',
    /** @param {{ name: string, icon: string, size: number, matrix: number[][] }} selectedTemplate */ (
      selectedTemplate
    ) => {
      renderTemplate(selectedTemplate, gameState);
    }
  );
}

export default initApp;
