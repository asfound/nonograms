import { calculateMinutes } from '@/components/game/gameUtils';
import { div } from '@/utils/createElement';

import styles from './timer.module.css';

/**
 * @param {GameState} gameState
 * @param {EventEmitter} emitter
 * @param {HTMLElement} parentElement
 * @returns {TimerControls}
 */
function createTimer(gameState, emitter, parentElement) {
  let seconds = 0;
  /** @type {number | null} */
  let interval = null;

  const timerElement = div({
    className: styles.timer,
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
  emitter.on('solutionReveal', stopTimer);
  emitter.on('gameStarted', startTimer);

  return { resetTimer, stopTimer };
}

export default createTimer;
