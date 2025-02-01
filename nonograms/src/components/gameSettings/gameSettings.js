import createScoreTable from '@/components/scoreTable/scoreTable';
import { button, div } from '@/utils/createElement';

import styles from './gameSettings.module.css';
/**
 * @param {GameState} gameState
 * @param {EventEmitter} emitter
 * @returns {HTMLElement}
 */
function createGameSettings(gameState, emitter) {
  const settingsContainer = div({ className: 'panel settings' });

  const resultsButton = button({
    className: 'button',
    textContent: 'Results',
  });

  resultsButton.addEventListener('click', () => {
    const scoreTable = createScoreTable();

    emitter.emit('showScore', scoreTable);
  });

  /** @param {HTMLButtonElement} buttonElement */
  const setThemeButtonContent = (buttonElement) => {
    const { mode } = gameState.getState();
    const newModeValue = mode === 'light' ? 'dark' : 'light';
    const content = `${newModeValue} Mode`;
    const buttonToUpdate = buttonElement;
    buttonToUpdate.textContent = content;

    gameState.updateState({ mode: newModeValue });
  };

  const themeButton = button({
    className: 'button',
  });
  themeButton.classList.add(styles.fixed);

  setThemeButtonContent(themeButton);
  themeButton.addEventListener('click', () => {
    setThemeButtonContent(themeButton);
    document.body.classList.toggle('dark');
    emitter.emit('toggleTheme');
  });

  /**
   * @param {HTMLButtonElement} buttonElement
   * @param {boolean} mode
   */
  const setSoundButtonContent = (buttonElement, mode) => {
    const newModeValue = mode ? 'off' : 'on';
    const content = `Sound ${newModeValue}`;
    const buttonToUpdate = buttonElement;
    buttonToUpdate.textContent = content;
  };

  const soundButton = button({
    className: 'button',
  });

  const initialMode = gameState.getState().sound;
  setSoundButtonContent(soundButton, initialMode);
  soundButton.addEventListener('click', () => {
    const { sound } = gameState.getState();
    gameState.updateState({ sound: !sound });
    setSoundButtonContent(soundButton, sound);
  });

  settingsContainer.appendChild(resultsButton);
  settingsContainer.appendChild(themeButton);
  settingsContainer.appendChild(soundButton);

  return settingsContainer;
}
export default createGameSettings;
