import cross from '@/assets/audio/cross.mp3';
import fill from '@/assets/audio/fill.mp3';
import remove from '@/assets/audio/remove.mp3';
import win from '@/assets/audio/win.mp3';

/**
 * @param {EventEmitter} emitter
 * @param {GameState} gameState
 */
function createSoundManager(gameState, emitter) {
  /**
   * @type {Object.<string, HTMLAudioElement>}
   */
  const sounds = {
    win: new Audio(win),
    1: new Audio(fill),
    '-1': new Audio(cross),
    0: new Audio(remove),
  };

  Object.values(sounds).forEach((sound) => {
    sound.load();
  });

  /**
   *
   * @param {string} soundName
   */
  function playSound(soundName) {
    if (gameState.getState().sound) {
      const sound = sounds[soundName];

      sound.currentTime = 0;
      sound.play();
    }
  }

  emitter.on(
    'cellClick',
    /**
     * @param {CellParams} cellParams
     */ ({ cellState }) => {
      const soundName = String(cellState);
      playSound(soundName);
    }
  );

  emitter.on('gameOver', () => {
    playSound('win');
  });

  return {
    playSound,
  };
}

export default createSoundManager;
