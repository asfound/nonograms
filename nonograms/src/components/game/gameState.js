/**
 * @typedef {Object} State
 * @property {string} currentTemplateName
 * @property {number[][]} currentTemplateMatrix
 * @property {number[][]} playerMatrix
 * @property {number} correctCellsCount
 * @property {number} playerCorrectCellsCount
 * @property {boolean} isGameOver
 * @property {number} elapsedTime
 */

/**
 * @typedef {Object} GameState
 * @property {() => State} getState
 * @property {(update: Partial<State>) => void} updateState

/**
 * @returns {GameState}
 */
function createGameState() {
  /** @type {State} */
  let state = {
    currentTemplateName: '',
    currentTemplateMatrix: [],
    playerMatrix: [],
    correctCellsCount: 0,
    playerCorrectCellsCount: 0,
    isGameOver: true,
    elapsedTime: 0,
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

export default createGameState;
