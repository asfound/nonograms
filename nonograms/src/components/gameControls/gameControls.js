import { button, div } from '@/utils/createElement';

import styles from './gameControls.module.css';

/**
 * @param {import('@/components/game/gameState').GameState} gameState
 * @param {import('@/components/game/templates').Template[]} templates
 * @param {import('@/utils/eventEmitter').EventEmitter} emitter
 * @returns {HTMLElement}
 */
function createGameControls(gameState, templates, emitter) {
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
    emitter.emit('templateSelected', selectedTemplate);
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
