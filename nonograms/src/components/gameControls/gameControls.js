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

  const resetButton = button({
    className: 'button reset-button',
    textContent: 'Reset Game',
  });

  resetButton.addEventListener('click', () => {
    const { currentTemplateName } = gameState.getState();
    const selectedTemplate = templates.find(
      (template) => template.name === currentTemplateName
    );
    emitter.emit('templateSelection', selectedTemplate);
  });

  const saveButton = button({
    className: 'button save-button',
    textContent: 'Save Game',
  });

  const solutionButton = button({
    className: 'button solution-button',
    textContent: 'Solution',
  });

  solutionButton.addEventListener('click', () => {
    emitter.emit('solutionReveal');
    const gameContainerElement = gameContainer;
    gameContainerElement.style.pointerEvents = 'none';
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
