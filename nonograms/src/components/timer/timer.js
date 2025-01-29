import { div } from '@/utils/createElement';

/**
 *
 * @param {number} timeInSeconds
 * @returns {string}
 */
function calculateMinutes(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * @param {import('@/components/game/gameState').GameState} gameState
 * @param {import('@/utils/eventEmitter').EventEmitter} emitter
 * @param {HTMLElement} parentElement
 */
function createTimer(gameState, emitter, parentElement) {
  let seconds = 0;
  /** @type {NodeJS.Timeout | null} */
  let interval = null;

  const timerElement = div({
    className: 'timer',
    textContent: '00:00',
  });
  parentElement.appendChild(timerElement);

  function updateTimerDisplay() {
    timerElement.textContent = calculateMinutes(seconds);
  }

  function startTimer() {
    interval = setInterval(() => {
      seconds += 1;
      updateTimerDisplay();
    }, 1000);
  }

  function stopTimer() {
    if (interval !== null) {
      clearInterval(interval);
      interval = null;
    }
    gameState.updateState({
      elapsedTime: seconds,
    });
  }

  function resetTimer() {
    stopTimer();
    timerElement.textContent = '00:00';
    seconds = 0;
  }

  emitter.on('gameOver', stopTimer);
  emitter.on('gameStarted', startTimer);

  return { resetTimer, stopTimer };
}

export default createTimer;
