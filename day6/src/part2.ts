import { FormattedInput } from './parseInput';
import { findGuard, DIRECTIONS } from './part1';

export default function main(input: FormattedInput): number {
  let [currentRow, currentCol] = findGuard(input);
  const checked = new Set<string>();

  let total = 0;
  let direction = 0;
  while (input[currentRow] && input[currentRow][currentCol]) {
    const vector = DIRECTIONS[direction];
    const newRow = currentRow + vector[0];
    const newCol = currentCol + vector[1];

    if (!input[newRow] || !input[newRow][newCol]) break;

    if (input[newRow][newCol] === '#') {
      direction = (direction + 1) % 4;
      continue;
    }

    const newPos = `${newRow},${newCol}`;
    if (!checked.has(newPos)) {
      const newMatrix = input.map((row) => [...row]);
      newMatrix[newRow][newCol] = '#';
      const isLoop = checkLoop([currentRow, currentCol], direction, newMatrix);

      if(isLoop) total++

      checked.add(newPos);
    }

    currentRow = newRow;
    currentCol = newCol;
  }

  return total;
}

function checkLoop(
  pos: [number, number],
  direction: number,
  matrix: string[][]
): boolean {
  const visited = new Set<string>();
  let [currentRow, currentCol] = pos;

  while (matrix[currentRow] && matrix[currentRow][currentCol]) {
    const currentPos = `${currentRow},${currentCol}:${direction}`;
    if (visited.has(currentPos)) return true;

    visited.add(currentPos);

    const vector = DIRECTIONS[direction];
    const newRow = currentRow + vector[0];
    const newCol = currentCol + vector[1];

    if (matrix[newRow] && matrix[newRow][newCol] === '#') {
      direction = (direction + 1) % 4;
      continue;
    }

    currentRow = newRow;
    currentCol = newCol;
  }

  return false;
}
