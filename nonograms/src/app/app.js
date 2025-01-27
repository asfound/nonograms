import templates from '@/components/game/templates';
import createPuzzleBoard from '@/components/puzzleBoard/puzzleBoard';
import createPuzzleMenu from '@/components/puzzlesMenu/puzzlesMenu';
import createEventEmitter from '@/utils/eventEmitter';

const emitter = createEventEmitter();
const ui = new Map();

/**
 * @param {{ name: string, icon: string, size: number, matrix: number[][] }} template
 */
function renderTemplate(template) {
  const oldPuzzle = ui.get('puzzle');
  if (oldPuzzle) {
    oldPuzzle.remove();
  }

  const puzzle = createPuzzleBoard(template.matrix, template.icon);
  ui.set('puzzle', puzzle);
  document.body.appendChild(puzzle);
}

function initApp() {
  const puzzleMenu = createPuzzleMenu(templates, emitter);
  document.body.appendChild(puzzleMenu);
  renderTemplate(templates[0]);
  emitter.on(
    'templateSelected',
    /** @param {{ name: string, icon: string, size: number, matrix: number[][] }} selectedTemplate */ (
      selectedTemplate
    ) => {
      renderTemplate(selectedTemplate);
    }
  );
}

export default initApp;
