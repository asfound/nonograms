import createSoundManager from '@/components/audio/audio';
import { setUpGame, handleCellClick } from '@/components/game/gameLogic';
import createGameState from '@/components/game/gameState';
import templates from '@/components/game/templates';
import createGameControls from '@/components/gameControls/gameControls';
import createGameSettings from '@/components/gameSettings/gameSettings';
import createModal from '@/components/modal/modal';
import createPuzzleMenu from '@/components/puzzlesMenu/puzzlesMenu';
import createTimer from '@/components/timer/timer';
import { div, h1 } from '@/utils/createElement';
import createEventEmitter from '@/utils/eventEmitter';

function initApp() {
  const emitter = createEventEmitter();
  const gameState = createGameState();
  createModal(emitter);
  createSoundManager(gameState, emitter);

  const gameName = h1({ className: 'heading' });
  gameName.textContent = 'Nonograms';
  document.body.appendChild(gameName);

  const puzzleMenu = createPuzzleMenu(templates, emitter);
  document.body.appendChild(puzzleMenu);

  const timer = createTimer(gameState, emitter, document.body);

  const gameContainer = div({ className: 'container' });
  document.body.appendChild(gameContainer);

  const initialTemplate = templates[0];

  /** @param {CellParams} params */
  const cellClickHandler = (params) => {
    handleCellClick(params, gameState, emitter, timer, gameContainer);
  };

  setUpGame(
    initialTemplate,
    gameState,
    emitter,
    timer,
    gameContainer,
    cellClickHandler
  );

  emitter.on(
    'templateSelection',
    /**
     * @param {Template} selectedTemplate
     */ (selectedTemplate) => {
      setUpGame(
        selectedTemplate,
        gameState,
        emitter,
        timer,
        gameContainer,
        cellClickHandler
      );
    }
  );

  const gameControls = createGameControls(
    gameState,
    templates,
    emitter,
    gameContainer
  );
  document.body.appendChild(gameControls);

  const gameSettings = createGameSettings(gameState, emitter);
  document.body.appendChild(gameSettings);
}

export default initApp;
