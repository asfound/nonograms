import { header, h1 } from '@/utils/createElement';

import styles from './header.module.css';
/**
 *
 * @param {string} gameName
 */
function createHeaderElement(gameName) {
  const headerElement = header({});
  const headingElement = h1({ className: styles.title, textContent: gameName });

  headerElement.appendChild(headingElement);
  return headerElement;
}

export default createHeaderElement;
