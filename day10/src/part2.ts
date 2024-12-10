import { FormattedInput } from './parseInput';
import { DIRECTIONS } from './part1';

export default function main(input: FormattedInput): number {
  let total = 0;

  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      if (input[row][col] === 0) {
        const score = calculateScore([row, col], input);
        total += score;
      }
    }
  }

  return total;
}

function calculateScore(
  trailhead: [number, number],
  matrix: number[][]
): number {
  let paths = 0;
  const stack = [trailhead];

  while (stack.length) {
    const pos = stack.pop()!;
    const [row, col] = pos;
    const height = matrix[row][col];

    if (height === 9) {
      paths++
      continue;
    }

    for (const direction of DIRECTIONS) {
      const newRow = row + direction[0];
      const newCol = col + direction[1];

      if (!matrix[newRow] || !matrix[newRow][newCol]) continue;

      const newHeight = matrix[newRow][newCol];
      if (newHeight - height === 1) stack.push([newRow, newCol]);
    }
  }

  return paths;
}
