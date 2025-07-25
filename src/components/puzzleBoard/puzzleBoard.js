import {
  calculateSideHints,
  calculateTopHints,
} from '@/components/puzzleBoard/boardUtils';
import { table, thead, tbody, tr, th, td } from '@/utils/createElement';
import { Events } from '@/utils/eventEmitter';

import styles from './puzzleBoard.module.css';

/** @typedef {import('@/types/types').EventEmitter} EventEmitter */

/**
 * @param {number[][]} matrix
 * @param {string} icon
 * @param {EventEmitter} emitter
 * @param {number[][]} userMatrix
 */
function createPuzzleBoard(matrix, icon, emitter, userMatrix) {
  const tableElement = table({ className: styles.board });

  const tableHeadElement = thead({ className: styles.head });
  const tableHeadRowElement = tr({ className: styles.row });
  const tableHeaderElement = th({ className: styles.heading });

  tableHeadRowElement.appendChild(tableHeaderElement);
  tableHeadElement.appendChild(tableHeadRowElement);

  const topHints = calculateTopHints(matrix);
  const sideHints = calculateSideHints(matrix);

  const topRowElement = tr({ className: styles.row });
  const cornerElement = td({ innerText: icon, className: styles.icon });
  topRowElement.appendChild(cornerElement);

  const tableBody = tbody({ className: styles.field });
  tableBody.appendChild(topRowElement);

  tableBody.addEventListener(
    'mousedown',
    (event) => {
      if (event.target instanceof HTMLTableCellElement) {
        if (
          event.target.hasAttribute('data-state') &&
          (event.button === 0 || event.button === 2)
        ) {
          emitter.emit(Events.GAME_STARTED);
        }
      }
    },
    { once: true }
  );

  topHints.forEach((hint) => {
    const tdElement = td({
      innerText: hint.join('\n'),
      className: `${styles.hint} ${styles.cell}`,
    });

    topRowElement.appendChild(tdElement);
  });

  /**
   * @param {HTMLTableCellElement} cellElement
   * @param {number} rowIndex
   * @param {number} colIndex
   */
  function revealCell(cellElement, rowIndex, colIndex) {
    const cellValue = matrix[rowIndex][colIndex];
    const cellAttributeValue = cellValue === 1 ? 1 : -1;
    cellElement.setAttribute('data-state', String(cellAttributeValue));
  }

  const rows = matrix.map((row, rowIndex) => {
    const rowElement = tr({ className: styles.row });
    const hintElement = td({
      innerText: sideHints[rowIndex].join(' '),
      className: `${styles.hint} ${styles.cell}`,
    });

    const cells = row.map((_, colIndex) => {
      const cellElement = td({ className: styles.cell });

      const cellValue = userMatrix[rowIndex][colIndex];
      cellElement.setAttribute('data-state', String(cellValue));

      emitter.on(Events.SOLUTION_REVEAL, () =>
        revealCell(cellElement, rowIndex, colIndex)
      );

      cellElement.addEventListener('mousedown', (event) => {
        if (event.button === 0) {
          const cellState = cellElement.getAttribute('data-state');
          const updatedCellState = cellState !== '1' ? '1' : '0';
          cellElement.setAttribute('data-state', updatedCellState);

          emitter.emit(Events.CELL_CLICK, {
            rowIndex,
            colIndex,
            cellElement,
            cellState: Number(updatedCellState),
          });
        }
      });

      cellElement.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        const cellState = cellElement.getAttribute('data-state');
        const updatedCellState = cellState !== '-1' ? '-1' : '0';
        cellElement.setAttribute('data-state', updatedCellState);

        emitter.emit(Events.CELL_CLICK, {
          rowIndex,
          colIndex,
          cellState: updatedCellState,
        });
      });

      return cellElement;
    });

    rowElement.append(hintElement, ...cells);
    return rowElement;
  });

  tableBody.append(...rows);
  tableElement.append(tableHeadElement, tableBody);

  return tableElement;
}

export default createPuzzleBoard;
