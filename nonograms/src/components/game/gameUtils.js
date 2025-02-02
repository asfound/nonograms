import templates from '@/components/game/templates';

const LS_PREFIX = 'asfound-nonograms';
const LS_SCORE_KEY = `${LS_PREFIX}-score`;
const LS_GAME_KEY = `${LS_PREFIX}-game`;

/**
 * @param {string} templateName
 * @param {number} seconds
 */
export function saveScore(templateName, seconds) {
  /** @type {GameResult[]} */
  const results = JSON.parse(localStorage.getItem(LS_SCORE_KEY) || '[]');

  const template = templates.find((t) => t.name === templateName);
  const size = template ? template.size : 0;

  results.unshift({ name: templateName, size, seconds });
  const updatedResults = results.slice(0, 5);

  updatedResults.sort((a, b) => a.seconds - b.seconds);

  localStorage.setItem(LS_SCORE_KEY, JSON.stringify(updatedResults));
}

export function getScores() {
  return JSON.parse(localStorage.getItem(LS_SCORE_KEY) || '[]');
}

/**
 *
 * @param {number} timeInSeconds
 * @returns {string}
 */
export function calculateMinutes(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 *
 * @param {GameState} gameState
 */
export function saveGameData(gameState) {
  const {
    currentTemplateName,
    playerMatrix,
    playerCorrectCellsCount,
    elapsedTime,
  } = gameState.getState();

  const savedGame = {
    name: currentTemplateName,
    matrix: playerMatrix,
    cellsCount: playerCorrectCellsCount,
    seconds: elapsedTime,
  };

  localStorage.setItem(LS_GAME_KEY, JSON.stringify(savedGame));
}

/**
 * @returns {StateData}
 */
export function loadGameData() {
  const savedGame = localStorage.getItem(LS_GAME_KEY);
  return /** @type {StateData} */ (JSON.parse(savedGame || ''));
}
