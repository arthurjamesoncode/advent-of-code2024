import { FormattedInput } from './parseInput';
import { findStart, DIRECTIONS, QueueItem, getScore } from './part1';
import part1 from './part1';
import { MinPriorityQueue } from '@datastructures-js/priority-queue';

const REVERSE_DIRECTIONS = [
  [0, -1],
  [-1, 0],
  [0, 1],
  [1, 0],
];

export default function main(input: FormattedInput): number {
  const matrix = input;
  const startPos = findEnd(matrix);

  const totalScore = part1(input);
  const distances = getDistanceMap(matrix, totalScore);
  const uniqueTiles = new Set<string>();

  const queue: QueueItem[] = [
    { pos: startPos, direction: 3, score: totalScore },
    { pos: startPos, direction: 0, score: totalScore },
  ];

  while (queue.length) {
    const {
      pos: [row, col],
      direction,
      score,
    } = queue.shift()!;

    const stateKey = `${row},${col}|${direction}`;

    if (
      !distances.has(stateKey) ||
      distances.get(stateKey)! > score ||
      score < 0
    ) {
      continue;
    }

    uniqueTiles.add(`${row},${col}`);

    const vector = REVERSE_DIRECTIONS[direction];
    const [newRow, newCol] = [row + vector[0], col + vector[1]];
    if (matrix[newRow] && matrix[newRow][newCol] !== '#') {
      queue.push({
        pos: [newRow, newCol],
        direction,
        score: score - 1,
      });
    }

    for (const turn of [-1, 1]) {
      const newDirection = (direction + turn + 4) % 4;
      queue.push({
        pos: [row, col],
        direction: newDirection,
        score: score - 1000,
      });
    }
  }

  const copy = matrix.map((row) => [...row]);
  for (const tile of uniqueTiles.values()) {
    const [row, col] = tile.split(',').map(Number);
    copy[row][col] = 'O';
  }

  return uniqueTiles.size;
}

function findEnd(matrix: string[][]): [number, number] {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      const char = matrix[row][col];
      if (char === 'E') return [row, col];
    }
  }

  return [-1, -1];
}

function getDistanceMap(
  input: FormattedInput,
  maxScore: number
): Map<string, number> {
  const matrix = input;
  const startPos = findStart(matrix);

  const queue = new MinPriorityQueue<QueueItem>(getScore);
  const distances = new Map<string, number>();

  queue.enqueue({
    pos: startPos,
    direction: 0,
    score: 0,
  });

  while (!queue.isEmpty()) {
    const {
      pos: [row, col],
      direction,
      score,
    } = queue.dequeue()!;

    if (score > maxScore) continue;

    const stateKey = `${row},${col}|${direction}`;
    if (distances.has(stateKey) && distances.get(stateKey)! <= score) continue;
    distances.set(stateKey, score);

    const char = matrix[row][col];

    if (char === 'E') {
      continue;
    }

    const vector = DIRECTIONS[direction];
    const [newRow, newCol] = [row + vector[0], col + vector[1]];
    if (matrix[newRow] && matrix[newRow][newCol] !== '#') {
      queue.enqueue({
        pos: [newRow, newCol],
        direction,
        score: score + 1,
      });
    }

    for (const turn of [-1, 1]) {
      const newDirection = (direction + turn + 4) % 4;
      queue.enqueue({
        pos: [row, col],
        direction: newDirection,
        score: score + 1000,
      });
    }
  }

  return distances;
}
