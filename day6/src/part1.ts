import { FormattedInput } from './parseInput';

const DIRECTIONS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

export default function main(input: FormattedInput): number {
  const visited = new Set<string>();
  let [currentRow, currentCol] = findGuard(input);

  let direction = 0;
  while (input[currentRow] && input[currentRow][currentCol]) {
    visited.add(`${currentRow},${currentCol}`);

    const vector = DIRECTIONS[direction];
    const newRow = currentRow + vector[0];
    const newCol = currentCol + vector[1];

    if (input[newRow] && input[newRow][newCol] === '#') {
      direction = (direction + 1) % 4;
      continue;
    }

    currentRow = newRow;
    currentCol = newCol;
  }
  
  return visited.size;
}

function findGuard(matrix: string[][]): [number, number] {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      if (matrix[row][col] === '^') return [row, col];
    }
  }

  throw new Error('Invalid Input');
}
