import { FormattedInput } from './parseInput';
import { getDistanceMap } from './part1';

export default function main(input: FormattedInput): number {
  const distances = getDistanceMap(input);
  const path = getPath(distances);

  const cheats = new Map<number, number>();

  let total = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const key1 = path[i];
    const distance1 = distances.get(key1)!;
    const pos1 = key1.split(',').map(Number) as [number, number];

    for (let j = i; j < path.length; j++) {
      const key2 = path[j];
      const distance2 = distances.get(key2)!;
      const pos2 = key2.split(',').map(Number) as [number, number];

      const manhattanDistance = getManhattanDistance(pos1, pos2);
      if (manhattanDistance > 20) continue;

      if (distance1 + manhattanDistance >= distance2) continue;

      const diff = distance2 - (distance1 + manhattanDistance);
      const numCheats = cheats.get(diff);
      numCheats ? cheats.set(diff, numCheats + 1) : cheats.set(diff, 1);

      if (diff >= 100) total++;
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

function getManhattanDistance(pos1: [number, number], pos2: [number, number]) {
  return Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1]);
}
