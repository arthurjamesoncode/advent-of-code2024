import { FormattedInput } from './parseInput';

const DIRECTIONS = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 0],
  [0, -1],
  [-1, -1],
  [1, -1],
  [-1, 1],
];

export default function main(input: FormattedInput): number {
  let total = 0;

  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      if (input[row][col] === 'X') {
        total += countXmas([row, col], input);
      }
    }
  }

  return total;
}

function countXmas(pos: [number, number], input: FormattedInput): number {
  const CHECK = 'XMAS';
  let total = 0
  for (const direction of DIRECTIONS) {
    let [currRow, currCol] = pos;
    let count = 0;
    for (const char of CHECK) {
      if (input[currRow] && input[currRow][currCol] === char) {
        currRow += direction[0];
        currCol += direction[1];
        count++
      }
    }

    if(count === 4) total++
  }
  return total;
}
