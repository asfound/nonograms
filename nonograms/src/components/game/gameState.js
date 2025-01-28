/**
 * @typedef {Object} State
 * @property {number[][]} currentTemplateMatrix
 * @property {number} correctCellsCount
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
    currentTemplateMatrix: [],
    correctCellsCount: 0,
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
