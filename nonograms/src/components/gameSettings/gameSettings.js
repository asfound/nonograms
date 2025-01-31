import createScoreTable from '@/components/scoreTable/scoreTable';
import { button, div } from '@/utils/createElement';

import styles from './gameSettings.module.css';
/**
 * @param {GameState} gameState
 * @param {EventEmitter} emitter
 * @returns {HTMLElement}
 */
function createGameSettings(gameState, emitter) {
  const settingsContainer = div({ className: 'settings panel' });

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

    // TODO: move to theme toggler function
    gameState.updateState({ mode: newModeValue });
  };

  const themeButton = button({
    className: 'button',
  });
  themeButton.classList.add(styles.fixed);

  setThemeButtonContent(themeButton);
  themeButton.addEventListener('click', () => {
    setThemeButtonContent(themeButton);
    emitter.emit('toggleTheme');
  });

  /** @param {HTMLButtonElement} buttonElement */
  const setSoundButtonContent = (buttonElement) => {
    const { sound } = gameState.getState();
    const newModeValue = sound ? 'off' : 'on';
    const content = `Sound ${newModeValue}`;
    const buttonToUpdate = buttonElement;
    buttonToUpdate.textContent = content;

    // TODO: move to sound toggler function
    gameState.updateState({ sound: !sound });
  };

  const soundButton = button({
    className: 'button',
  });

  setSoundButtonContent(soundButton);
  soundButton.addEventListener('click', () => {
    setSoundButtonContent(soundButton);
    emitter.emit('toggleSound');
  });

  settingsContainer.appendChild(resultsButton);
  settingsContainer.appendChild(themeButton);
  settingsContainer.appendChild(soundButton);

  return settingsContainer;
}
export default createGameSettings;
