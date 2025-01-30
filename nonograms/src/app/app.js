import { setUpGame, handleCellClick } from '@/components/game/gameLogic';
import createGameState from '@/components/game/gameState';
import templates from '@/components/game/templates';
import createGameControls from '@/components/gameControls/gameControls';
import createModal from '@/components/modal/modal';
import createPuzzleMenu from '@/components/puzzlesMenu/puzzlesMenu';
import createTimer from '@/components/timer/timer';
import { div } from '@/utils/createElement';
import createEventEmitter from '@/utils/eventEmitter';

function initApp() {
  const emitter = createEventEmitter();
  const gameState = createGameState();
  createModal(emitter);

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

  const gameControls = createGameControls(gameState, templates, emitter);
  document.body.appendChild(gameControls);
}

export default initApp;
