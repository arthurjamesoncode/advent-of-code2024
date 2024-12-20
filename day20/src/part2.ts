import { FormattedInput } from './parseInput';
import { DIRECTIONS, findCell, getDistanceMap } from './part1';
import { MinPriorityQueue } from '@datastructures-js/priority-queue';

export default function main(input: FormattedInput): number {
  const distances = getDistanceMap(input);
  let cheats = new Map<number, number>(); //seconds saved -> count

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
    const distance = distances.get(key);
    if (distance === undefined) {
      throw new Error('Incorrect Distance Map');
    }

    cheats = startCheat(pos, distance, distances, cheats, input);

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
    if (key < 100) continue;

    total += value;
  }

  return total;
}

function startCheat(
  pos: [number, number],
  distance: number,
  distances: Map<string, number>,
  cheats: Map<number, number>,
  matrix: string[][]
) {
  const maxDistance = distance + 20;
  const visited = new Set('');

  const queue = new MinPriorityQueue<[[number, number], number]>(
    (item) => item[1]
  );

  queue.enqueue([pos, distance]);
  while (!queue.isEmpty()) {
    const [pos, distance] = queue.dequeue();
    if (distance > maxDistance) continue;

    const key = pos.join(',');
    if (visited.has(key)) continue;
    visited.add(key);

    const [row, col] = pos;
    for (const direction of DIRECTIONS) {
      const [dRow, dCol] = direction;
      const newPos: [number, number] = [row + dRow, col + dCol];

      const [newRow, newCol] = newPos;
      if (matrix[newRow] && matrix[newRow][newCol]) {
        queue.enqueue([newPos, distance + 1]);
      }
    }

    if (matrix[row][col] === '#') continue;

    const current = distances.get(key);
    if (current && current > distance) {
      const numCheats = cheats.get(current - distance);
      numCheats
        ? cheats.set(current - distance, numCheats + 1)
        : cheats.set(current - distance, 1);
    }
  }

  return cheats;
}
