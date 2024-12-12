import { FormattedInput } from './parseInput';

export const DIRECTIONS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

export default function main(input: FormattedInput): number {
  const visited = new Set<string>();

  let total = 0;
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      const pos = `${row},${col}`;
      if (visited.has(pos)) continue;

      const { area, perimeter } = calculateRegion([row, col], input, visited);
      total += area * perimeter;
    }
  }
  return total;
}

function calculateRegion(
  pos: [number, number],
  matrix: string[][],
  visited: Set<string>
) {
  const [row, col] = pos;
  const plot = matrix[row][col];
  const stack: [number, number][] = [[row, col]];
  let area = 1;
  let perimeter = 4;

  while (stack.length) {
    const [row, col] = stack.pop()!;
    const pos = `${row},${col}`;
    visited.add(pos);

    for (const direction of DIRECTIONS) {
      const newRow = row + direction[0];
      const newCol = col + direction[1];
      const newPos = `${newRow},${newCol}`;

      if (!matrix[newRow] || matrix[newRow][newCol] !== plot) continue;

      if (visited.has(newPos)) {
        perimeter -= 1;
        continue;
      }

      visited.add(newPos);

      area += 1;

      perimeter--; //separate lines to make the algorithm more obvious
      perimeter += 4;
      stack.push([newRow, newCol]);
    }
  }
  return { area, perimeter };
}
