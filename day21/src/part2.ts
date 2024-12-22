import { FormattedInput } from './parseInput';
import {
  dPad,
  dPositions,
  findAllMinPaths,
  numPad,
  numPositions,
} from './part1';

export default function main(input: FormattedInput): number {
  const findPathLength = memoFindPathLengths();
  
  let total = 0;
  for (const code of input) {
    const length = findPathLength(code, 25, numPad, numPositions);
    total += Number(code.substring(0, 3)) * length;
  }

  return total;
}

function memoFindPathLengths() {
  const cache = new Map<string, number>();

  return function findPathLength(
    string: string,
    robot: number,
    keypad: string[][],
    positions: Record<string, [number, number]>
  ) {
    const key = `${string},${robot}`;
    let res = cache.get(key);
    if (res !== undefined) return res;

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

    cache.set(key, length);
    return length;
  };
}
