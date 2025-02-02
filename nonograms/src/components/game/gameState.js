import {
  calcCells,
  generatePlayerMatrix,
} from '@/components/puzzleBoard/boardUtils';

/**
 * @param {Template} template
 * @returns {GameState}
 */
function createGameState(template) {
  /** @type {State} */
  let state = {
    currentTemplateName: template.name,
    currentTemplateMatrix: template.matrix,
    playerMatrix: generatePlayerMatrix(template.size),
    correctCellsCount: calcCells(template.matrix),
    playerCorrectCellsCount: 0,
    isGameOver: true,
    elapsedTime: 0,
    mode: 'light',
    sound: true,
  };

  return {
    /**
     * @returns {State}
     */
    getState() {
      return { ...state };
    },

    /** @param {Object} update  */
    updateState(update) {
      state = { ...state, ...update };
    },
  };
}

/**
 *
 * @param {GameState} gameState
 * @param {Template} template
 */
export function updateTemplateData(gameState, template) {
  gameState.updateState({
    currentTemplateName: template.name,
    currentTemplateMatrix: template.matrix,
    playerMatrix: generatePlayerMatrix(template.size),
    correctCellsCount: calcCells(template.matrix),
    playerCorrectCellsCount: 0,
    isGameOver: true,
    elapsedTime: 0,
  });
}

/**
 *
 * @param {GameState} gameState
 * @param {Template} template
 * @param {number[][]} playerMatrix
 * @param {number} cellsCount
 * @param {number} time
 */
export function updateLoadedTemplateData(
  gameState,
  template,
  playerMatrix,
  cellsCount,
  time
) {
  gameState.updateState({
    currentTemplateName: template.name,
    currentTemplateMatrix: template.matrix,
    playerMatrix,
    correctCellsCount: calcCells(template.matrix),
    playerCorrectCellsCount: cellsCount,
    isGameOver: true,
    elapsedTime: time,
  });
}

export default createGameState;
