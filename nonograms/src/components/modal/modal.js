import { button, dialog, p } from '@/utils/createElement';

import styles from './modal.module.css';

/**
 * @param {import('@/utils/eventEmitter').EventEmitter} emitter
 */
function createModal(emitter) {
  const modalWindow = dialog({
    className: styles.modal,
  });

  const contentElement = p({
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

  /** * @param {string} content */
  function showModal(content) {
    contentElement.textContent = content;

    modalWindow.showModal();
  }

  emitter.on('gameOver', showModal);
}

export default createModal;
