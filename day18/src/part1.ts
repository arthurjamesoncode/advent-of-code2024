import { FormattedInput } from './parseInput';
import { MinPriorityQueue } from '@datastructures-js/priority-queue';

const DIRECTIONS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

type QueueItem = {
  pos: [number, number];
  distance: number;
};

export default function main(input: FormattedInput): number {
  const corrupted: Set<string> = new Set();
  const bytesToFall = input.length === 25 ? 12 : 1024;

  for (let i = 0; i < bytesToFall; i++) {
    corrupted.add(input[i].join(','));
  }

  const [width, height] = input.length === 25 ? [6, 6] : [70, 70];

  const minQueue = new MinPriorityQueue<QueueItem>((item) => item.distance);
  minQueue.enqueue({ pos: [0, 0], distance: 0 });

  const visited = new Set<string>();

  while (!minQueue.isEmpty()) {
    const { pos, distance } = minQueue.dequeue();
    const [x, y] = pos;

    if(x === width && y === height) return distance;

    if (visited.has(pos.join(','))) continue;
    visited.add(pos.join(','));

    for (const direction of DIRECTIONS) {
      const newPos: [number, number] = [x + direction[0], y + direction[1]];
      const [newX, newY] = newPos;

      if (newX < 0 || newX > width) continue;
      if (newY < 0 || newY > height) continue;

      if (corrupted.has(newPos.join(','))) continue;

      minQueue.enqueue({ pos: newPos, distance: distance + 1 });
    }
  }

  return -1;
}
