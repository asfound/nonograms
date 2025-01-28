/**
 * @param {Object} params
 * @param {number} params.rowIndex
 * @param {number} params.colIndex
 * @param {number} params.cellState
 * @param {import("@/components/game/gameState").GameState} gameState
 */
export function checkCell({ rowIndex, colIndex, cellState }, gameState) {
  const { currentTemplateMatrix, playerMatrix, playerCorrectCellsCount } =
    gameState.getState();

  const correctCellState = currentTemplateMatrix[rowIndex][colIndex];
  const previousCellState = playerMatrix[rowIndex][colIndex];

  const playerCellState = Number(cellState);

  let currentCorrectCellsCount = playerCorrectCellsCount;

  const isCorrectBlackAdded = playerCellState === 1 && correctCellState === 1;
  const isCorrectBlackRemoved =
    previousCellState === 1 && playerCellState !== 1 && correctCellState === 1;

  if (isCorrectBlackAdded) {
    currentCorrectCellsCount += 1;
  } else if (isCorrectBlackRemoved) {
    currentCorrectCellsCount -= 1;
  }

  const updatedPlayerMatrix = playerMatrix;
  updatedPlayerMatrix[rowIndex][colIndex] = playerCellState;

  gameState.updateState({
    playerMatrix: updatedPlayerMatrix, playerCorrectCellsCount: currentCorrectCellsCount,
  });

}

/**
 * @param {import("@/components/game/gameState").GameState} gameState
 */
export function isPuzzleSolved(gameState) {
  const { correctCellsCount, playerCorrectCellsCount } = gameState.getState();
  return correctCellsCount === playerCorrectCellsCount;
}
