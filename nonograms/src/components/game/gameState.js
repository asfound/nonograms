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
