import { getScores, calculateMinutes } from '@/components/game/gameUtils';
import {
  caption,
  table,
  tbody,
  thead,
  td,
  th,
  tr,
  p,
} from '@/utils/createElement';

import styles from './scoreTable.module.css';

/** @typedef {import('@/types/types').GameResult} GameResult */

/**
 * @returns {HTMLTableElement | HTMLParagraphElement}
 */
function createScoreTable() {
  /** @type {GameResult[]} */
  const scores = getScores();

  if (!scores || scores.length === 0) {
    return p({ innerText: 'No results yet!' });
  }

  scores.sort((a, b) => a.seconds - b.seconds);

  const headers = Object.keys(scores[0]);

  const tableElement = table({ className: styles.table });

  const tableTitle = caption({
    className: styles.title,
    innerText: 'Latest Results',
  });

  tableElement.appendChild(tableTitle);

  const tableHeadElement = thead({ className: styles.head });

  const tableHeadRowElement = tr({ className: styles.row });
  tableHeadElement.appendChild(tableHeadRowElement);
  tableHeadRowElement.appendChild(th({ className: styles.corner }));

  headers.forEach((header) => {
    const tableHeaderElement = th({
      className: styles.header,
      textContent: header,
    });
    tableHeadRowElement.appendChild(tableHeaderElement);
  });

  const tableBody = tbody({});
  scores.forEach(({ name, size, seconds }, index) => {
    const rowElement = tr({ className: styles.row });

    const indexData = td({ className: styles.data, textContent: index + 1 });
    const nameData = td({ className: styles.data, textContent: name });
    const sizeData = td({
      className: styles.data,
      textContent: `${size}x${size}`,
    });
    const timeData = td({
      className: styles.data,
      textContent: calculateMinutes(seconds),
    });

    rowElement.append(indexData, nameData, sizeData, timeData);
    tableBody.appendChild(rowElement);
  });

  tableElement.appendChild(tableHeadElement);
  tableElement.appendChild(tableBody);

  return tableElement;
}

export default createScoreTable;
