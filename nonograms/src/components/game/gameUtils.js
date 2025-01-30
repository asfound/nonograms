import createPuzzleBoard from '@/components/puzzleBoard/puzzleBoard';

/**
 * @param {Template} template
 * @param {HTMLElement} gameContainer
 * @param {EventEmitter} emitter
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

export default renderTemplate;
