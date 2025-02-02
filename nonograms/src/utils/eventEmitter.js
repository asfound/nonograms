/** @typedef {import('@/types/types').EventEmitter} EventEmitter */

/**
 * @typedef {function} Listener
 */

/**
 * @returns {EventEmitter}
 */

function createEventEmitter() {
  /** @type {{ [key: string]: Listener[] }} */
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

    /**
     * @param {string} event
     * @param {function} listener
     *
     * @returns {function}
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
