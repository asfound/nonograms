import createSoundManager from '@/components/audio/audio';
import {
  setUpGame,
  handleCellClick,
  loadGame,
  setupTimer,
} from '@/components/game/gameLogic';
import createGameState, {
  updateTemplateData,
} from '@/components/game/gameState';
import { loadUserPreferencesOrDefault } from '@/components/game/gameUtils';
import templates from '@/components/game/templates';
import createGameControls from '@/components/gameControlsPanel/gameControlsPanel';
import createGameSettings from '@/components/gameSettingsPanel/gameSettingsPanel';
import createHeaderElement from '@/components/header/header';
import createModal from '@/components/modal/modal';
import createPuzzleMenu from '@/components/puzzlesMenuPanel/puzzlesMenuPanel';
import createTimer from '@/components/timer/timer';
import { div, main } from '@/utils/createElement';
import createEventEmitter, { Events } from '@/utils/eventEmitter';

/** @typedef {import('@/types/types').Template} Template */
/** @typedef {import('@/types/types').CellParams} CellParams */

function initApp() {
  const emitter = createEventEmitter();

  const initialTemplate = templates[0];
  const initialPreferences = loadUserPreferencesOrDefault();

  const gameState = createGameState(initialTemplate, initialPreferences);

  createModal(emitter);
  createSoundManager(gameState, emitter);

  const gameName = 'Nonograms';
  const header = createHeaderElement(gameName);
  document.body.appendChild(header);

  const mainElement = main({ className: 'main' });
  document.body.appendChild(mainElement);

  const puzzleMenu = createPuzzleMenu(templates, emitter);
  mainElement.appendChild(puzzleMenu.levelsContainer);

  const timer = createTimer(gameState);
  mainElement.appendChild(timer.timerElement);
  setupTimer(emitter, gameState, timer.controls);

  const gameContainer = div({ className: 'container' });
  mainElement.appendChild(gameContainer);

  /** @param {CellParams} params */
  const cellClickHandler = (params) => {
    handleCellClick(params, gameState, emitter, timer.controls, gameContainer);
  };

  setUpGame(
    gameState,
    emitter,
    timer.controls,
    gameContainer,
    cellClickHandler
  );

  emitter.on(
    Events.TEMPLATE_SELECTION,
    /**
     * @param {Template} selectedTemplate
     */ (selectedTemplate) => {
      updateTemplateData(gameState, selectedTemplate);
      setUpGame(
        gameState,
        emitter,
        timer.controls,
        gameContainer,
        cellClickHandler
      );
    }
  );

  emitter.on(Events.CONTINUE_GAME, () => {
    const currentTemplate = loadGame(gameState);
    puzzleMenu.setMenuValues(currentTemplate);
    setUpGame(
      gameState,
      emitter,
      timer.controls,
      gameContainer,
      cellClickHandler
    );
  });

  emitter.on(Events.GAME_STARTED, () => {
    gameState.updateState({ isGameOver: false });
  });

  emitter.on(Events.GAME_OVER, () => {
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
