import {
  calculateSideHints,
  calculateTopHints,
} from '@/components/puzzleBoard/boardUtils';
import { table, thead, tbody, tr, th, td } from '@/utils/createElement';

import styles from './puzzleBoard.module.css';

/**
 * @param {number[][]} matrix
 * @param {string} icon
 * @param {import('@/utils/eventEmitter').EventEmitter} emitter
 */
function createPuzzleBoard(matrix, icon, emitter) {
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

  tableBody.addEventListener(
    'click',
    (event) => {
      if (event.target instanceof HTMLTableCellElement) {
        if (event.target.hasAttribute('data-state')) {
          emitter.emit('gameStarted');
        }
      }
    },
    { once: true }
  );

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
      cellElement.setAttribute('data-state', '0');

      cellElement.addEventListener('click', (event) => {
        if (event.button === 0) {
          const cellState = cellElement.getAttribute('data-state');
          const updatedCellState = cellState !== '1' ? '1' : '0';
          cellElement.setAttribute('data-state', updatedCellState);

          emitter.emit('cellClick', {
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

        emitter.emit('cellClick', {
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
