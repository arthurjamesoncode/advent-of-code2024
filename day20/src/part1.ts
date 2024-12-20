import { FormattedInput } from './parseInput';

export const DIRECTIONS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

export default function main(input: FormattedInput): number {
  const distances = getDistanceMap(input);
  
  let total = 0;
  for (const [key, distance] of distances) {
    const [row, col] = key.split(',').map(Number);

    for (const direction of DIRECTIONS) {
      const [dRow, dCol] = direction;
      let [newRow, newCol] = [row + dRow, col + dCol];

      for (const direction of DIRECTIONS) {
        const [dRow, dCol] = direction;
        const newPos: [number, number] = [newRow + dRow, newCol + dCol];

        if (!input[newPos[0]] || input[newPos[0]][newPos[1]] === '#') {
          continue;
        }

        const newDistance = distance + 2;
        const newKey = newPos.join(',');
        const current = distances.get(newKey);

        if (!current || current < newDistance) {
          continue;
        }

        if(current - newDistance >= 100) total ++
      }
    }
  }

  return total;
}

export function getDistanceMap(matrix: string[][]) {
  let pos = findCell('S', matrix);

  const distances = new Map<string, number>();

  const stack: [[number, number], number][] = [[pos, 0]];
  while (stack.length) {
    const [pos, distance] = stack.pop()!;
    const key = pos.join(',');

    if (distances.get(key) !== undefined) continue;
    distances.set(key, distance);

    const [row, col] = pos;
    const char = matrix[row][col];

    if (char === 'E') {
      return distances;
    }

    for (const direction of DIRECTIONS) {
      const [dRow, dCol] = direction;
      const newPos: [number, number] = [row + dRow, col + dCol];

      const [newRow, newCol] = newPos;
      if (matrix[newRow] && matrix[newRow][newCol] !== '#') {
        stack.push([newPos, distance + 1]);
      }
    }
  }

  return distances;
}

export function findCell(cell: string, matrix: string[][]): [number, number] {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      if (matrix[row][col] === cell) return [row, col];
    }
  }

  return [-1, -1];
}
