import { FormattedInput } from './parseInput';
import { findRobot } from './part1';

export default function main(input: FormattedInput): number {
  const { matrix: smallMatrix, instructions } = input;
  let matrix = expandMatrix(smallMatrix);

  let pos = findRobot(matrix);

  let i = 0
  for (const instruction of instructions) {
    i++
    let vertical = false;
    let direction: -1 | 1 = -1;
    if ('^v'.includes(instruction)) {
      vertical = true;
      if (instruction === 'v') {
        direction = 1;
      }
    } else if (instruction === '>') {
      direction = 1;
    }

    if (vertical) {
      let moved = false;
      [moved, matrix] = moveRobotVertical(pos, direction, matrix);
      if (moved) {
        pos = [pos[0] + direction, pos[1]];
      }
      continue;
    }

    const moved = moveHorizontal(pos, direction, matrix);
    if (moved) {
      pos = [pos[0], pos[1] + direction];
    }
  }

  let total = 0;
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      if (matrix[row][col] === '[') {
        total += 100 * row + col;
      }
    }
  }

  return total;
}

function expandMatrix(matrix: string[][]) {
  const newMatrix: string[][] = [];
  for (let row = 0; row < matrix.length; row++) {
    newMatrix.push([]);
    for (const char of matrix[row]) {
      if (char === '#') newMatrix[row].push('#', '#');
      else if (char === '.') newMatrix[row].push('.', '.');
      else if (char === 'O') newMatrix[row].push('[', ']');
      else if (char === '@') newMatrix[row].push('@', '.');
    }
  }
  return newMatrix;
}

function moveHorizontal(
  pos: [number, number],
  direction: -1 | 1,
  matrix: string[][]
): boolean {
  const [row, col] = pos;
  if (matrix[row][col] === '@') {
  }

  const newCol = col + direction;
  const nextChar = matrix[row][newCol];

  if (nextChar === '#') {
    return false;
  }

  let moved = false;
  if (nextChar === '[' || nextChar === ']') {
    moved = moveHorizontal([row, newCol], direction, matrix);
  }

  if (nextChar === '.' || moved) {
    matrix[row][newCol] = matrix[row][col];
    matrix[row][col] = '.';
    moved = true;
  }

  if (matrix[row][col] === '@') {
  }

  return moved;
}

function moveRobotVertical(
  pos: [number, number],
  direction: -1 | 1,
  matrix: string[][]
): [boolean, string[][]] {
  const [row, col] = pos;
  const newRow = row + direction;
  let newCol = col;

  const nextChar = matrix[newRow][newCol];

  if (nextChar === '#') {
    return [false, matrix];
  }

  let moved = false;
  if (nextChar === '[' || nextChar === ']') {
    if (nextChar === ']') newCol--;

    [moved, matrix] = pushBoxVertical([newRow, newCol], direction, matrix);
  }

  if (nextChar === '.' || moved) {
    matrix[newRow][col] = '@';
    matrix[row][col] = '.';
    moved = true;
  }

  return [moved, matrix];
}

function pushBoxVertical(
  pos: [number, number],
  direction: -1 | 1,
  matrix: string[][]
): [boolean, string[][]] {
  const [row, col] = pos;

  const newRow = row + direction;
  let nextLeftChar = matrix[newRow][col];
  let nextRightChar = matrix[newRow][col + 1];

  if (nextLeftChar === '#' || nextRightChar === '#') {
    return [false, matrix];
  }

  let copy = matrix.map((row) => [...row]);
  let leftCanMove = true;
  if (nextLeftChar === '[') {
    [leftCanMove, copy] = pushBoxVertical([newRow, col], direction, copy);
  } else if (nextLeftChar === ']') {
    [leftCanMove, copy] = pushBoxVertical([newRow, col - 1], direction, copy);
  } 
  
  let rightCanMove = true;
  if (leftCanMove && nextRightChar === '[') {
    [rightCanMove, copy] = pushBoxVertical([newRow, col + 1], direction, copy);
  }
  
  let moved = false
  if (leftCanMove && rightCanMove) {
    copy[newRow][col] = '[';
    copy[newRow][col + 1] = ']';
    copy[row][col] = '.';
    copy[row][col + 1] = '.';
    moved = true;
  }

  if (moved) matrix = copy;

  return [moved, matrix];
}
