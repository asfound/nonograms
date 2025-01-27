/**
 * @typedef {function} Listener
 */

/**
 * @typedef {Object} EventEmitter
 * @property {function} on
 * @property {function} off
 * @property {function} emit
 */

/**
 * @returns {EventEmitter}
 */

function createEventEmitter() {
  /** @type {Record<string, Listener[]>} */
  const listeners = {};

  return {
    /**
     * @param {string} event
     * @param {function} listener
     * @returns {function}
     */
    on(event, listener) {
      if (!listeners[event]) {
        listeners[event] = [];
      }
      listeners[event].push(listener);
      return listener;
    },

    /**
     * @param {string} event
     * @param {function} listener
     */
    off(event, listener) {
      if (listeners[event]) {
        listeners[event] = listeners[event].filter((l) => l !== listener);
      }
    },

    /**
     * @param {string} event
     * @param {...*} args
     */
    emit(event, ...args) {
      if (listeners[event]) {
        listeners[event].forEach((listener) => {
          listener(...args);
        });
      }
    },
  };
}

export default createEventEmitter;
