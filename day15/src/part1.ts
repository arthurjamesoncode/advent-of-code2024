import { FormattedInput } from './parseInput';

const DIRECTIONS: Record<string, [number, number]> = {
  '^': [-1, 0],
  '>': [0, 1],
  v: [1, 0],
  '<': [0, -1],
};

export default function main(input: FormattedInput): number {
  const { matrix, instructions } = input;

  let pos = findRobot(matrix);
  for (const instruction of instructions) {
    const direction = DIRECTIONS[instruction];
    const moved = move(pos, direction, matrix);
    if (moved) {
      pos = [pos[0] + direction[0], pos[1] + direction[1]];
    }
  }

  let total = 0;
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix.length; col++) {
      if (matrix[row][col] === 'O') {
        total += 100 * row + col;
      }
    }
  }
  return total;
}

function findRobot(matrix: string[][]): [number, number] {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      const char = matrix[row][col];
      if (char === '@') return [row, col];
    }
  }

  return [-1, -1];
}

function move(
  pos: [number, number],
  direction: [number, number],
  matrix: string[][]
): boolean {
  const [row, col] = pos;

  const [newRow, newCol] = [row + direction[0], col + direction[1]];
  const nextChar = matrix[newRow][newCol];

  if (nextChar === '#') {
    return false;
  }

  let moved = false;
  if (nextChar === 'O') {
    moved = move([newRow, newCol], direction, matrix);
  }

  if (nextChar === '.' || moved) {
    matrix[newRow][newCol] = matrix[row][col];
    matrix[row][col] = '.';
    moved = true;
  }

  return moved;
}
