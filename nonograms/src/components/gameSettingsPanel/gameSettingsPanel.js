import { saveUserPreferences } from '@/components/game/gameUtils';
import createScoreTable from '@/components/scoreTable/scoreTable';
import { button, div } from '@/utils/createElement';

import styles from './gameSettingsPanel.module.css';

/** @typedef {import("@/types/types").GameState} GameState */
/** @typedef {import('@/types/types').EventEmitter} EventEmitter */

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

  /** @param {HTMLButtonElement} buttonElement
   *  @param {string} theme
   */
  const setThemeButtonContent = (buttonElement, theme) => {
    const newContentValue = theme === 'light' ? 'dark' : 'light';
    const content = `${newContentValue} Mode`;
    const buttonToUpdate = buttonElement;
    buttonToUpdate.textContent = content;

    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  const themeButton = button({
    className: 'button',
  });
  themeButton.classList.add(styles.fixed);

  const initialTheme = gameState.getState().mode;
  setThemeButtonContent(themeButton, initialTheme);

  themeButton.addEventListener('click', () => {
    const { mode } = gameState.getState();
    const newModeValue = mode === 'light' ? 'dark' : 'light';
    setThemeButtonContent(themeButton, newModeValue);
    gameState.updateState({ mode: newModeValue });

    saveUserPreferences(gameState);
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
    setSoundButtonContent(soundButton, !sound);

    saveUserPreferences(gameState);
  });

  settingsContainer.appendChild(resultsButton);
  settingsContainer.appendChild(themeButton);
  settingsContainer.appendChild(soundButton);

  return settingsContainer;
}
export default createGameSettings;
