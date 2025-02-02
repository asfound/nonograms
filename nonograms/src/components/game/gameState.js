import {
  calcCells,
  generatePlayerMatrix,
} from '@/components/puzzleBoard/boardUtils';

/** @typedef {import("@/types/types").State} State */
/** @typedef {import("@/types/types").GameState} GameState */
/** @typedef {import('@/types/types').UserPreferences} UserPreferences */
/** @typedef {import('@/types/types').Template} Template */

/**
 * @param {Template} template
 * @param {UserPreferences} userPreferences
 * @returns {GameState}
 */
function createGameState(template, userPreferences) {
  /** @type {State} */
  let state = {
    currentTemplateName: template.name,
    currentTemplateMatrix: template.matrix,
    playerMatrix: generatePlayerMatrix(template.size),
    correctCellsCount: calcCells(template.matrix),
    playerCorrectCellsCount: 0,
    isGameOver: true,
    elapsedTime: 0,
    mode: userPreferences.themeMode,
    sound: userPreferences.isSoundOn,
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
