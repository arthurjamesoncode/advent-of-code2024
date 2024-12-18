import { FormattedInput } from './parseInput';
import { MinPriorityQueue } from '@datastructures-js/priority-queue';
import { QueueItem, DIRECTIONS } from './part1';

type QueueItemWithPath = QueueItem & { path: string[] };

export default function main(input: FormattedInput): string {
  const corrupted: Set<string> = new Set();
  const initialBytes = input.length === 25 ? 12 : 1024;

  for (let i = 0; i < initialBytes; i++) {
    corrupted.add(input[i].join(','));
  }

  const [width, height] = input.length === 25 ? [6, 6] : [70, 70];

  let i = initialBytes - 1;
  let [valid, path] = hasPath(width, height, corrupted);
  while (valid) {
    i++;
    const byte = input[i].join(',');
    corrupted.add(byte);
    
    if (!path.has(byte)) continue;

    [valid, path] = hasPath(width, height, corrupted);
  }

  return input[i].join(',');
}

function hasPath(
  width: number,
  height: number,
  corrupted: Set<string>
): [boolean, Set<string>] {
  const minQueue = new MinPriorityQueue<QueueItemWithPath>(
    (item) => item.distance
  );
  minQueue.enqueue({ pos: [0, 0], distance: 0, path: ['0,0'] });

  const visited = new Set<string>();

  while (!minQueue.isEmpty()) {
    const { pos, distance, path } = minQueue.dequeue();
    const [x, y] = pos;

    if (x === width && y === height) return [true, new Set(path)];

    if (visited.has(pos.join(','))) continue;
    visited.add(pos.join(','));

    for (const direction of DIRECTIONS) {
      const newPos: [number, number] = [x + direction[0], y + direction[1]];
      const [newX, newY] = newPos;

      if (newX < 0 || newX > width) continue;
      if (newY < 0 || newY > height) continue;

      if (corrupted.has(newPos.join(','))) continue;

      minQueue.enqueue({
        pos: newPos,
        distance: distance + 1,
        path: [...path, newPos.join(',')],
      });
    }
  }

  return [false, new Set()];
}
