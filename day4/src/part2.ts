import { FormattedInput } from './parseInput';

const DIRECTIONS: [number, number][] = [
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

export default function main(input: FormattedInput): number {
  const checked = new Set<string>();

  let total = 0;

  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      if (input[row][col] === 'M') {
        total += checkX([row, col], checked, input);
      }
    }
  }

  return total;
}

function checkX(
  pos: [number, number],
  checked: Set<string>,
  input: FormattedInput
): number {
  let total = 0;
  const [row, col] = pos;

  for (const direction of DIRECTIONS) {
    if (checked.has(`${row},${col},${direction}`)) continue;

    const check1 = checkMas([row, col], direction, input);
    checked.add(`${row},${col},${direction}`);
    if (!check1 === true) continue;

    let newRow = row + direction[0] * 2;
    let newCol = col;
    let newDirection: [number, number] = [-direction[0], direction[1]];
    if (checked.has(`${newRow},${newCol},${newDirection}`)) continue;

    let check2 = checkMas([newRow, newCol], newDirection, input);
    checked.add(`${newRow},${newCol},${newDirection}`);
    if (check2) {
      total++;
      continue;
    }

    newRow = row;
    newCol = col + direction[1] * 2;
    newDirection = [direction[0], -direction[1]];
    if (checked.has(`${newRow},${newCol},${newDirection}`)) continue;

    check2 = checkMas([newRow, newCol], newDirection, input);
    checked.add(`${newRow},${newCol},${newDirection}`);
    if (check2) {
      total += 1;
    }
  }

  return total;
}

function checkMas(
  pos: [number, number],
  direction: [number, number],
  input: FormattedInput
): boolean {
  let CHECK = 'MAS';
  let [currRow, currCol] = pos;
  let count = 0;
  for (const char of CHECK) {
    if (input[currRow] && input[currRow][currCol] === char) {
      currRow += direction[0];
      currCol += direction[1];
      count++;
    }
  }

  return count === 3;
}
