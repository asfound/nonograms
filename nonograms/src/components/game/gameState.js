/**
 * @typedef {Object} GameState
 * @property {() => { puzzle: Object | null }} getState
 * @property {function(Object): void} updateState  updateState - Updates the state with the provided object.
 */

/**
 * Creates a game state manager.
 * @param {Object} [initialState={}] - The initial state for the game.
 * @returns {GameState}
 */

function createGameState(initialState = {}) {
  let state = { ...initialState, puzzle: null };

  return {
    getState() {
      return { ...state };
    },

    /** @param {Object} update - An object containing the new state values. */
    updateState(update) {
      state = { ...state, ...update };
    },
  };
}

export default createGameState;
