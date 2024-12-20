import { FormattedInput } from './parseInput';

const DIRECTIONS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

export default function main(input: FormattedInput): number {
  const distances = getDistanceMap(input);
  const cheats = new Map<number, number>(); //seconds saved -> count

  let pos = findCell('S', input);
  const visited = new Set<string>();

  const stack: [number, number][] = [pos];
  while (stack.length) {
    const pos = stack.pop()!;
    const key = pos.join(',');

    if (visited.has(key)) continue;
    visited.add(key);

    const [row, col] = pos;
    const char = input[row][col];

    if (char === 'E') {
      break;
    }

    const distance = distances.get(key)!;

    const newPositions: [string, number][] = [];
    for (const direction of DIRECTIONS) {
      const [dRow, dCol] = direction;
      let [newRow, newCol] = [row + dRow, col + dCol];

      for (const direction of DIRECTIONS) {
        const [dRow, dCol] = direction;
        const newPos: [number, number] = [newRow + dRow, newCol + dCol];
        if (input[newPos[0]] && input[newPos[0]][newPos[1]] !== '#')
          newPositions.push([newPos.join(','), distance + 2]);
      }
    }

    for (const [key, distance] of newPositions) {
      const current = distances.get(key);
      if (current && distance < current) {
        const numCheats = cheats.get(distance - current);
        numCheats
          ? cheats.set(distance - current, numCheats + 1)
          : cheats.set(distance - current, 1);
      }
    }

    for (const direction of DIRECTIONS) {
      const [dRow, dCol] = direction;
      const newPos: [number, number] = [row + dRow, col + dCol];

      const [newRow, newCol] = newPos;
      if (input[newRow] && input[newRow][newCol] !== '#') {
        stack.push(newPos);
      }
    }
  }

  let total = 0;
  for (const [key, value] of cheats) {
    if (key > -100) continue;

    total += value;
  }

  return total;
}

function getDistanceMap(matrix: string[][]) {
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

function findCell(cell: string, matrix: string[][]): [number, number] {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      if (matrix[row][col] === cell) return [row, col];
    }
  }

  return [-1, -1];
}
