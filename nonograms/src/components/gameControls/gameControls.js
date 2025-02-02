import { saveGameData, hasSavedGame } from '@/components/game/gameUtils';
import { button, div } from '@/utils/createElement';

import styles from './gameControls.module.css';
/**
 * @param {GameState} gameState
 * @param {Template[]} templates
 * @param {EventEmitter} emitter
 * @param {HTMLElement} gameContainer
 * @returns {HTMLElement}
 */
function createGameControls(gameState, templates, emitter, gameContainer) {
  const controlsContainer = div({ className: styles.controls });
  controlsContainer.classList.add('panel');

  const resetButton = button({
    className: 'button',
    textContent: 'Reset Game',
  });
  resetButton.disabled = true;

  const saveButton = button({
    className: 'button',
    textContent: 'Save Game',
  });
  saveButton.disabled = true;

  const solutionButton = button({
    className: 'button',
    textContent: 'Solution',
  });

  emitter.on('templateSelection', () => {
    solutionButton.disabled = false;
  });

  const continueButton = button({
    className: 'button continue-button',
    textContent: 'Continue Last Game',
  });
  continueButton.disabled = !hasSavedGame();

  continueButton.addEventListener('click', () => {
    continueButton.disabled = true;
    solutionButton.disabled = false;
    emitter.emit('continueGame');
  });

  emitter.on('gameStarted', () => {
    resetButton.disabled = false;
    saveButton.disabled = false;
    continueButton.disabled = !hasSavedGame();
  });

  emitter.on('gameOver', () => {
    solutionButton.disabled = true;
    saveButton.disabled = true;
  })

  solutionButton.addEventListener('click', () => {
    emitter.emit('solutionReveal');
    gameState.updateState({ isGameOver: true });
    const gameContainerElement = gameContainer;
    gameContainerElement.style.pointerEvents = 'none';

    resetButton.disabled = false;
    saveButton.disabled = true;
    solutionButton.disabled = true;
    continueButton.disabled = !hasSavedGame();
  });

  resetButton.addEventListener('click', () => {
    const { currentTemplateName } = gameState.getState();
    const selectedTemplate = templates.find(
      (template) => template.name === currentTemplateName
    );
    emitter.emit('templateSelection', selectedTemplate);

    resetButton.disabled = true;
  });

  saveButton.addEventListener('click', () => {
    const { isGameOver } = gameState.getState();

    if (!isGameOver) {
      emitter.emit('saveGame');
      saveGameData(gameState);
    }

    continueButton.disabled = false;
  });

  controlsContainer.appendChild(resetButton);
  controlsContainer.appendChild(saveButton);
  controlsContainer.appendChild(solutionButton);
  controlsContainer.appendChild(continueButton);

  return controlsContainer;
}

export default createGameControls;
