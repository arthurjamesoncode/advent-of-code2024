import { FormattedInput } from './parseInput';

const DIRECTIONS: [number, number, string][] = [
  [1, 0, 'v'],
  [-1, 0, '^'],
  [0, 1, '>'],
  [0, -1, '<'],
];

export const dPad = [
  [' ', '^', 'A'],
  ['<', 'v', '>'],
];

export const dPositions: Record<string, [number, number]> = dPad.reduce(
  reduceToPositionMap,
  {}
);

export const numPad = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  [' ', '0', 'A'],
];

export const numPositions: Record<string, [number, number]> = numPad.reduce(
  reduceToPositionMap,
  {}
);

function reduceToPositionMap(
  acc: Record<string, [number, number]>,
  curr: string[],
  row: number
) {
  return {
    ...acc,
    ...curr.reduce((acc, curr, col) => ({ ...acc, [curr]: [row, col] }), {}),
  };
}

export default function main(input: FormattedInput): number {
  let total = 0;

  for (const code of input) {
    const length = findPathLength(code, 2, numPad, numPositions);
    total += Number(code.substring(0, 3)) * length;
  }

  return total;
}

function findPathLength(
  string: string,
  robot: number,
  keypad: string[][],
  positions: Record<string, [number, number]>
): number {
  let length = 0;

  let curr = 'A';
  for (let i = 0; i < string.length; i++) {
    const next = string[i];
    const paths = findAllMinPaths(curr, next, keypad, positions);
    curr = next;

    if (robot === 0) {
      length += paths[0].length;
      continue;
    }

    const lengths = paths.map((path) =>
      findPathLength(path, robot - 1, dPad, dPositions)
    );

    length += Math.min(...lengths);
  }

  return length;
}

export function findAllMinPaths(
  start: string,
  end: string,
  keypad: string[][],
  positions: Record<string, [number, number]>
): string[] {
  const paths: string[] = [];
  const [startRow, startCol] = positions[start];
  const [endRow, endCol] = positions[end];
  const maxDistance = Math.abs(endRow - startRow) + Math.abs(endCol - startCol);

  const queue: [[number, number], number, string][] = [
    [[startRow, startCol], 0, ''],
  ];

  const visited = new Set<string>();

  while (queue.length) {
    const [[row, col], distance, path] = queue.shift()!;

    if (distance > maxDistance) continue;

    const char = keypad[row][col];
    if (char === ' ') continue;

    if (visited.has(path)) continue;
    visited.add(path);

    if (row === endRow && col === endCol) {
      paths.push(path + 'A');
      continue;
    }

    for (const direction of DIRECTIONS) {
      const [dRow, dCol, dChar] = direction;
      const [newRow, newCol] = [row + dRow, col + dCol];

      if (!keypad[newRow] || !keypad[newRow][newCol]) continue;

      queue.push([[newRow, newCol], distance + 1, path + dChar]);
    }
  }

  return paths
}
