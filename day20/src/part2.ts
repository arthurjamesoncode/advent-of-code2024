import { FormattedInput } from './parseInput';
import { getDistanceMap } from './part1';

const ORIENTATIONS = [
  [1, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
];

export default function main(input: FormattedInput): number {
  const distances = getDistanceMap(input);
  const path = getPath(distances);

  const cheats = new Set<string>();

  let total = 0;
  for (const tile of path) {
    const key1 = tile;
    const distance1 = distances.get(key1)!;
    const pos = key1.split(',').map(Number) as [number, number];
    const [row, col] = pos;

    for (let dRow = 0; dRow <= 20; dRow++) {
      for (let dCol = 0; dCol <= 20 - dRow; dCol++) {
        if (dRow === 0 && dCol === 0) continue;

        for (const orientation of ORIENTATIONS) {
          const newPos = [
            row + dRow * orientation[0],
            col + dCol * orientation[1],
          ];
          const key2 = newPos.join(',');

          if (cheats.has(key1 + ',' + key2)) continue;
          cheats.add(key1 + ',' + key2);

          const distance2 = distances.get(key2);
          const newDistance = distance1 + dRow + dCol;

          if (distance2 === undefined || newDistance > distance2) continue;

          const diff = distance2 - newDistance;

          if (diff >= 100) total++;
        }
      }
    }
  }

  return total;
}

function getPath(distances: Map<string, number>) {
  const path: string[] = [];
  for (const entry of distances.keys()) {
    path.push(entry);
  }
  return path;
}
