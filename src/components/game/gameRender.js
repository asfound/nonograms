import createPuzzleBoard from '@/components/puzzleBoard/puzzleBoard';

/** @typedef {import('@/types/types').EventEmitter} EventEmitter */
/** @typedef {import('@/types/types').Template} Template */

/**
 * @param {Template} template
 * @param {HTMLElement} gameContainer
 * @param {EventEmitter} emitter
 * @param {number[][]} userMatrix
 */
function renderTemplate(template, gameContainer, emitter, userMatrix) {
  gameContainer.replaceChildren();
  gameContainer.style.removeProperty('pointer-events');

  const newPuzzleBoard = createPuzzleBoard(
    template.matrix,
    template.icon,
    emitter,
    userMatrix
  );

  gameContainer.appendChild(newPuzzleBoard);
}

export default renderTemplate;
