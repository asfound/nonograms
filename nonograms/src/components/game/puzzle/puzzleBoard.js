import {
  calculateSideHints,
  calculateTopHints,
} from '@/components/game/gameUtils';
import { div, table, thead, tbody, tr, th, td } from '@/utils/createElement';

import styles from './puzzleBoard.module.css';

/**
 * @param {number[][]} matrix
 */
function createPuzzleBoard(matrix) {
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
  const corner = td({});
  topRowElement.appendChild(corner);

  const tableBody = tbody({});
  tableBody.appendChild(topRowElement);

  topHints.forEach((hint) => {
    const tdElement = td({
      innerText: hint.join(' '),
    });

    topRowElement.appendChild(tdElement);
  });

  const rows = matrix.map((row, index) => {
    const rowElement = tr({});
    const hintElement = td({
      innerText: sideHints[index].join(' '),
    });

    const cells = row.map(() => {
      const cellElement = td({});
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
