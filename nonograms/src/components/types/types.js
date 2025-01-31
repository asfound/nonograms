// state types
/**
 * @typedef {Object} State
 * @property {string} currentTemplateName
 * @property {number[][]} currentTemplateMatrix
 * @property {number[][]} playerMatrix
 * @property {number} correctCellsCount
 * @property {number} playerCorrectCellsCount
 * @property {boolean} isGameOver
 * @property {number} elapsedTime
 * @property {string} mode
 * @property {boolean} sound
 */

/**
 * @typedef {Object} GameState
 * @property {() => State} getState
 * @property {(update: Partial<State>) => void} updateState
 * /


// game types
/**
 * @typedef {Object} Template
 * @property {string} name
 * @property {string} icon
 * @property {number} size
 * @property {number[][]} matrix
 */

/**
 * @typedef {Object} CellParams
 * @property {number} rowIndex
 * @property {number} colIndex
 * @property {number} cellState
 */

/**
 * @typedef {Object} TimerControls
 * @property {() => void} resetTimer
 * @property {() => void} stopTimer
 */

// emitter types
/**
 * @typedef {function} Listener
 */

/**
 * @typedef {Object} EventEmitter
 * @property {function} on
 * @property {function} off
 * @property {function} emit
 * @property {function} once
 */

// utils
/**
 * @typedef {Object} GameResult
 * @property {string} name
 * @property {number} size
 * @property {number} seconds
 *
 */
