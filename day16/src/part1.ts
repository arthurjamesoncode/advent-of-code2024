import { FormattedInput } from './parseInput';

const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

export default function main(input: FormattedInput): number {
  const matrix = input;
  const startPos = findStart(matrix);

  const visited = new Set<string>();
  const queue: {
    pos: [number, number];
    direction: number;
    score: number;
  }[] = [
    {
      pos: startPos,
      direction: 0,
      score: 0,
    },
  ];

  let lowest = Number.MAX_SAFE_INTEGER;

  while (queue.length) {
    queue.sort((a, b) => a.score - b.score);

    const {
      pos: [row, col],
      direction,
      score,
    } = queue.shift()!;

    const current = `${row},${col}:${direction}`;
    if (visited.has(current)) continue;
    visited.add(current);

    if (score > lowest) continue;

    const char = matrix[row][col];
    if (char === 'E') {
      return score;
    }

    const vector = DIRECTIONS[direction];
    const [newRow, newCol] = [row + vector[0], col + vector[1]];

    if (matrix[newRow] && matrix[newRow][newCol] !== '#') {
      queue.push({
        pos: [newRow, newCol],
        direction,
        score: score + 1,
      });
    }

    queue.push({
      pos: [row, col],
      direction: (direction + 1) % 4,
      score: score + 1000,
    });

    queue.push({
      pos: [row, col],
      direction: (direction + 3) % 4,
      score: score + 1000,
    });
  }

  return lowest;
}

function findStart(matrix: string[][]): [number, number] {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      const char = matrix[row][col];
      if (char === 'S') return [row, col];
    }
  }

  return [-1, -1];
}
