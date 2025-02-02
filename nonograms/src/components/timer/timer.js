import { calculateMinutes } from '@/components/game/gameUtils';
import { div } from '@/utils/createElement';

import styles from './timer.module.css';

/**
 * @param {GameState} gameState
 * @param {EventEmitter} emitter
 * @returns {Timer}
 */
function createTimer(gameState, emitter) {
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

  emitter.on('gameOver', () => {
    stopTimer();
    gameState.updateState({ elapsedTime: seconds });
  });

  emitter.on('solutionReveal', stopTimer);

  emitter.on('gameStarted', startTimer);

  emitter.on('saveGame', () => {
    gameState.updateState({ elapsedTime: seconds });
  });

  return {
    timerElement,
    controls: { resetTimer, setTimer, stopTimer },
  };
}

export default createTimer;
