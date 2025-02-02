import createSoundManager from '@/components/audio/audio';
import {
  setUpGame,
  handleCellClick,
  loadGame,
} from '@/components/game/gameLogic';
import createGameState, {
  updateTemplateData,
} from '@/components/game/gameState';
import templates from '@/components/game/templates';
import createGameControls from '@/components/gameControls/gameControls';
import createGameSettings from '@/components/gameSettings/gameSettings';
import createHeaderElement from '@/components/header/header';
import createModal from '@/components/modal/modal';
import createPuzzleMenu from '@/components/puzzlesMenu/puzzlesMenu';
import createTimer from '@/components/timer/timer';
import { div, main } from '@/utils/createElement';
import createEventEmitter from '@/utils/eventEmitter';

function initApp() {
  const emitter = createEventEmitter();

  const initialTemplate = templates[0];

  const gameState = createGameState(initialTemplate);

  createModal(emitter);
  createSoundManager(gameState, emitter);

  const gameName = 'Nonograms';
  const header = createHeaderElement(gameName);
  document.body.appendChild(header);

  const mainElement = main({ className: 'main' });
  document.body.appendChild(mainElement);

  const puzzleMenu = createPuzzleMenu(templates, emitter);
  mainElement.appendChild(puzzleMenu.levelsContainer);

  const timer = createTimer(gameState, emitter, mainElement);

  const gameContainer = div({ className: 'container' });
  mainElement.appendChild(gameContainer);

  /** @param {CellParams} params */
  const cellClickHandler = (params) => {
    handleCellClick(params, gameState, emitter, timer, gameContainer);
  };

  setUpGame(gameState, emitter, timer, gameContainer, cellClickHandler);

  emitter.on(
    'templateSelection',
    /**
     * @param {Template} selectedTemplate
     */ (selectedTemplate) => {
      updateTemplateData(gameState, selectedTemplate);
      setUpGame(gameState, emitter, timer, gameContainer, cellClickHandler);
    }
  );

  emitter.on('continueGame', () => {
    const currentTemplate = loadGame(gameState);
    puzzleMenu.setMenuValues(currentTemplate);
    setUpGame(gameState, emitter, timer, gameContainer, cellClickHandler);
  });

  emitter.on('gameStarted', () => {
    gameState.updateState({ isGameOver: false });
  });

  emitter.on('gameOver', () => {
    gameState.updateState({ isGameOver: true });
  });

  const gameControls = createGameControls(
    gameState,
    templates,
    emitter,
    gameContainer
  );
  mainElement.appendChild(gameControls);

  const gameSettings = createGameSettings(gameState, emitter);
  mainElement.appendChild(gameSettings);
}

export default initApp;
