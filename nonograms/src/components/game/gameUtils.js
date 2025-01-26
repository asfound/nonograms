/**
 * @param {number[][]} matrix
 * @returns {number[][]}
 */
export function calculateTopHints(matrix) {
  const hints = [];

  for (let col = 0; col < matrix[0].length; col += 1) {
    const colHints = [];
    let count = 0;

    matrix.forEach((row) => {
      if (row[col] === 1) {
        count += 1;
      } else if (count > 0) {
        colHints.push(count);
        count = 0;
      }
    });

    if (count > 0) {
      colHints.push(count);
    }

    hints.push(colHints);
  }

  return hints;
}

/**
 * @param {number[][]} matrix
 * @returns {number[][]}
 */
export function calculateSideHints(matrix) {
  /** @type {number[][]}  */
  const hints = [];

  matrix.forEach((row) => {
    let count = 0;
    const rowHints = [];
    row.forEach((value) => {
      if (value === 1) {
        count += 1;
      } else if (count > 0) {
        rowHints.push(count);
        count = 0;
      }
    });

    if (count > 0) {
      rowHints.push(count);
    }

    hints.push(rowHints);
  });

  return hints;
}
