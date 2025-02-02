import { calculateMinutes } from '@/components/game/gameUtils';
import { div } from '@/utils/createElement';

import styles from './timer.module.css';

/**
 * @param {GameState} gameState
 * @returns {Timer}
 */
function createTimer(gameState) {
  let seconds = 0;
  /** @type {number | null} */
  let interval = null;

  const timerElement = div({
    className: styles.timer,
    textContent: '00:00',
  });

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

  /**
   *
   * @param {number} currentSeconds
   */
  function setTimer(currentSeconds) {
    seconds = currentSeconds;
    timerElement.textContent = calculateMinutes(seconds);
  }

  /**
   * @returns {number}
   */
  function getSeconds() {
    return seconds;
  }

  return {
    timerElement,
    controls: { resetTimer, setTimer, stopTimer, getSeconds, startTimer },
  };
}

export default createTimer;
