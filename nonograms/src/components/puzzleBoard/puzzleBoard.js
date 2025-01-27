import {
  calculateSideHints,
  calculateTopHints,
} from '@/components/puzzleBoard/boardUtils';
import { div, table, thead, tbody, tr, th, td } from '@/utils/createElement';

import styles from './puzzleBoard.module.css';

/**
 * @param {number[][]} matrix
 * @param {string} icon
 */
function createPuzzleBoard(matrix, icon) {
  const puzzleBoard = div({
    className: styles.board,
  });

  const tableElement = table({});

  const tableHeadElement = thead({});
  const tableHeadRowElement = tr({});
  const tableHeaderElement = th({});

  tableHeadRowElement.appendChild(tableHeaderElement);
  tableHeadElement.appendChild(tableHeadRowElement);

  const topHints = calculateTopHints(matrix);
  const sideHints = calculateSideHints(matrix);

  const topRowElement = tr({});
  const cornerElement = td({ innerText: icon });
  topRowElement.appendChild(cornerElement);

  const tableBody = tbody({});
  tableBody.appendChild(topRowElement);

  topHints.forEach((hint) => {
    const tdElement = td({
      innerText: hint.join('\n'),
      className: styles.hint,
    });

    topRowElement.appendChild(tdElement);
  });

  const rows = matrix.map((row, rowIndex) => {
    const rowElement = tr({});
    const hintElement = td({
      innerText: sideHints[rowIndex].join(' '),
      className: styles.hint,
    });

    const cells = row.map((_, colIndex) => {
      const cellElement = td({ className: styles.cell });

      cellElement.addEventListener('click', (event) => {
        if (event.button === 0) {
          cellElement.classList.toggle(styles.filled);
          cellElement.classList.remove(styles.crossed);
        }
      });

      cellElement.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        cellElement.classList.toggle(styles.crossed);
        cellElement.classList.remove(styles.filled);
      });

      return cellElement;
    });

    rowElement.append(hintElement, ...cells);
    return rowElement;
  });

  tableBody.append(...rows);
  tableElement.append(tableHeadElement, tableBody);
  puzzleBoard.appendChild(tableElement);

  return puzzleBoard;
}

export default createPuzzleBoard;
