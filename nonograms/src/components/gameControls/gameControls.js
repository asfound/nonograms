import { saveGame } from '@/components/game/gameUtils';
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

  emitter.on('gameStarted', () => {
    resetButton.disabled = false;
    saveButton.disabled = false;
  });

  saveButton.addEventListener('click', () => {
    const { isGameOver } = gameState.getState();

    if (!isGameOver) {
      emitter.emit('saveGame');
      saveGame(gameState);
    }
  });

  const solutionButton = button({
    className: 'button',
    textContent: 'Solution',
  });

  emitter.on('solutionReveal', () => {
    solutionButton.disabled = true;
    saveButton.disabled = true;
  });

  emitter.on('templateSelection', () => {
    solutionButton.disabled = false;
  });

  resetButton.addEventListener('click', () => {
    const { currentTemplateName } = gameState.getState();
    const selectedTemplate = templates.find(
      (template) => template.name === currentTemplateName
    );
    emitter.emit('templateSelection', selectedTemplate);

    resetButton.disabled = true;
  });

  solutionButton.addEventListener('click', () => {
    emitter.emit('solutionReveal');
    gameState.updateState({ isGameOver: true });
    const gameContainerElement = gameContainer;
    gameContainerElement.style.pointerEvents = 'none';

    solutionButton.disabled = true;
    resetButton.disabled = false;
  });

  const continueButton = button({
    className: 'button continue-button',
    textContent: 'Continue Last Game',
  });

  controlsContainer.appendChild(resetButton);
  controlsContainer.appendChild(saveButton);
  controlsContainer.appendChild(solutionButton);
  controlsContainer.appendChild(continueButton);

  return controlsContainer;
}

export default createGameControls;
