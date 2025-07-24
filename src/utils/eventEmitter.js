/** @typedef {import('@/types/types').EventEmitter} EventEmitter */

/**
 * @enum {string}
 */
export const Events = Object.freeze({
  TEMPLATE_SELECTION: 'templateSelection',
  GAME_STARTED: 'gameStarted',
  GAME_OVER: 'gameOver',
  CONTINUE_GAME: 'continueGame',
  SAVE_GAME: 'saveGame',
  SOLUTION_REVEAL: 'solutionReveal',
  SHOW_SCORE: 'showScore',
  CELL_CLICK: 'cellClick',
});

/**
 * @typedef {function} Listener
 */

/**
 * @returns {EventEmitter}
 */

function createEventEmitter() {
  /** @type {{ [key in Events]?: Listener[] }} */
  const listeners = {};

  return {
    /**
     * @param {Events} event
     * @param {Listener} listener
     * @returns {Listener}
     */
    on(event, listener) {
      if (!listeners[event]) {
        listeners[event] = [];
      }
      listeners[event].push(listener);
      return listener;
    },

    /**
     * @param {Events} event
     * @param {Listener} listener
     */
    off(event, listener) {
      if (listeners[event]) {
        listeners[event] = listeners[event].filter((l) => l !== listener);
      }
    },

    /**
     * @param {Events} event
     * @param {...*} args
     */
    emit(event, ...args) {
      if (listeners[event]) {
        listeners[event].forEach((listener) => {
          listener(...args);
        });
      }
    },

    /**
     * @param {Events} event
     * @param {Listener} listener
     *
     * @returns {Listener}
     */
    once(event, listener) {
      /** @param {...*} args */
      const onceListener = (...args) => {
        listener(...args);
        this.off(event, onceListener);
      };
      this.on(event, onceListener);
      return onceListener;
    },
  };
}

export default createEventEmitter;
