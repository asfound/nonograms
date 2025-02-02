import renderTemplate from '@/components/game/gameRender';
import { updateLoadedTemplateData } from '@/components/game/gameState';
import { saveScore, loadGameData } from '@/components/game/gameUtils';
import templates from '@/components/game/templates';

/**
 * @param {GameState} gameState
 */
export function isPuzzleSolved(gameState) {
  const { correctCellsCount, playerCorrectCellsCount } = gameState.getState();
  return correctCellsCount === playerCorrectCellsCount;
}
/**
 * @param {CellParams} params
 * @param {GameState} gameState
 */
export function checkCell({ rowIndex, colIndex, cellState }, gameState) {
  const { currentTemplateMatrix, playerMatrix, playerCorrectCellsCount } =
    gameState.getState();

  const correctCellState = currentTemplateMatrix[rowIndex][colIndex];
  const previousCellState = playerMatrix[rowIndex][colIndex];

  const playerCellState = Number(cellState);

  let currentCorrectCellsCount = playerCorrectCellsCount;

  const isCorrectBlackAdded = playerCellState === 1 && correctCellState === 1;
  const isCorrectBlackRemoved =
    previousCellState === 1 && playerCellState !== 1 && correctCellState === 1;

  const isIncorrectBlackAdded = playerCellState === 1 && correctCellState === 0;
  const isIncorrectBlackRemoved =
    previousCellState === 1 && playerCellState !== 1 && correctCellState === 0;

  if (isCorrectBlackAdded || isIncorrectBlackRemoved) {
    currentCorrectCellsCount += 1;
  } else if (isCorrectBlackRemoved || isIncorrectBlackAdded) {
    currentCorrectCellsCount -= 1;
  }

  const updatedPlayerMatrix = playerMatrix;
  updatedPlayerMatrix[rowIndex][colIndex] = playerCellState;

  gameState.updateState({
    playerMatrix: updatedPlayerMatrix,
    playerCorrectCellsCount: currentCorrectCellsCount,
  });
}

/**
 * @param {CellParams} params
 * @param {GameState} gameState
 * @param {EventEmitter} emitter
 * @param {TimerControls} timer
 * @param {HTMLElement} gameContainer
 */
export function handleCellClick(
  { rowIndex, colIndex, cellState },
  gameState,
  emitter,
  timer,
  gameContainer
) {
  checkCell({ rowIndex, colIndex, cellState }, gameState);

  if (isPuzzleSolved(gameState)) {
    timer.stopTimer();
    const { elapsedTime, currentTemplateName } = gameState.getState();
    emitter.emit('solutionReveal');

    setTimeout(() => {
      emitter.emit('gameOver', `You won in ${elapsedTime} seconds!`);
    }, 100);

    saveScore(currentTemplateName, elapsedTime);

    const gameContainerElement = gameContainer;
    gameContainerElement.style.pointerEvents = 'none';
  }
}

/**
 * @param {GameState} gameState
 * @param {EventEmitter} emitter
 * @param {TimerControls} timer
 * @param {HTMLElement} gameContainer
 * @param {function} cellClickHandler
 * */
export function setUpGame(
  gameState,
  emitter,
  timer,
  gameContainer,
  cellClickHandler
) {
  emitter.off('cellClick', cellClickHandler);
  const { currentTemplateName, elapsedTime, playerMatrix } =
    gameState.getState();

  const currentTemplate = /** @type {Template} */ (
    templates.find((t) => t.name === currentTemplateName)
  );

  renderTemplate(currentTemplate, gameContainer, emitter, playerMatrix);

  timer.resetTimer();
  timer.setTimer(elapsedTime);

  emitter.on('cellClick', cellClickHandler);
}

/**
 *
 * @param {GameState} gameState
 * @returns {Template}
 */
export function loadGame(gameState) {
  const loadedGame = loadGameData();

  const { name, matrix, cellsCount, seconds } = loadedGame;

  const template = templates.find((t) => t.name === name);

  if (template) {
    updateLoadedTemplateData(gameState, template, matrix, cellsCount, seconds);
  }
  return /** @type {Template} */ (template);
}

/**
 * @param {GameState} gameState
 * @param {EventEmitter} emitter
 * @param {TimerControls} timer
 * @param {HTMLElement} gameContainer
 * @param {function} cellClickHandler
 * */
export function continueGame(
  gameState,
  emitter,
  timer,
  gameContainer,
  cellClickHandler
) {
  loadGame(gameState);
  setUpGame(gameState, emitter, timer, gameContainer, cellClickHandler);
}

/**
 *
 * @param {EventEmitter} emitter
 * @param {GameState} gameState
 * @param {TimerControls} timerControls
 */
export function setupTimer(emitter, gameState, timerControls) {
  emitter.on('gameOver', () => {
    timerControls.stopTimer();
    gameState.updateState({ elapsedTime: timerControls.getSeconds() });
  });

  emitter.on('solutionReveal', timerControls.stopTimer);

  emitter.on('gameStarted', timerControls.startTimer);

  emitter.on('saveGame', () => {
    gameState.updateState({ elapsedTime: timerControls.getSeconds() });
  });
}
