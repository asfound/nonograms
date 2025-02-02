import { button, dialog, div } from '@/utils/createElement';

import styles from './modal.module.css';

/** @typedef {import('@/types/types').EventEmitter} EventEmitter */

/**
 * @param {EventEmitter} emitter
 */
function createModal(emitter) {
  const modalWindow = dialog({
    className: styles.modal,
  });

  const contentElement = div({
    className: styles.content,
  });

  const closeButton = button({
    className: 'button',
    textContent: 'OK',
  });

  closeButton.addEventListener('click', () => {
    modalWindow.close();
  });

  modalWindow.addEventListener('click', (event) => {
    if (event.target === modalWindow) {
      modalWindow.close();
    }
  });

  modalWindow.append(contentElement, closeButton);
  document.body.appendChild(modalWindow);

  /**
   * * @param {string | HTMLTableElement} content */
  function showModal(content) {
    if (typeof content === 'string') {
      contentElement.textContent = content;
    } else {
      contentElement.innerHTML = '';
      contentElement.appendChild(content);
    }

    modalWindow.showModal();
  }

  emitter.on('gameOver', showModal);

  emitter.on(
    'showScore',
    /** @param {HTMLTableElement} scoreTable */ (scoreTable) => {
      showModal(scoreTable);
    }
  );
}

export default createModal;
