/**
 * @param {Object} params
 * @param {number} params.rowIndex
 * @param {number} params.colIndex
 * @param {number} params.cellState
 * @param {import("@/components/game/gameState").GameState} gameState
 */
export function checkCell({ rowIndex, colIndex, cellState }, gameState) {
  const { currentTemplateMatrix, playerCorrectCellsCount } =
    gameState.getState();

  const cellStateCode = Number(cellState);
  const correctCellState = currentTemplateMatrix[rowIndex][colIndex];
  
  let currentCorrectCellsCount = playerCorrectCellsCount;

  const correctAdded = cellStateCode === correctCellState;
  const correctRemoved = cellStateCode !== 1 && correctCellState === 1;

  if (correctAdded) {
    currentCorrectCellsCount += 1;
  } else if (correctRemoved) {
    currentCorrectCellsCount -= 1;
  }

  gameState.updateState({
    playerCorrectCellsCount: currentCorrectCellsCount,
  });
}

/**
 * @param {import("@/components/game/gameState").GameState} gameState
 */
export function isPuzzleSolved(gameState) {
  const { correctCellsCount, playerCorrectCellsCount } = gameState.getState();
  return correctCellsCount === playerCorrectCellsCount;
}
