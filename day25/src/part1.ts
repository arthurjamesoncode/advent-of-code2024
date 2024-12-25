import { FormattedInput } from './parseInput';

export default function main(input: FormattedInput): number {
  const { locks, keys } = input;
  const lockHeights = locks.map(getHeights);
  const keyHeights = keys.map(getHeights);

  let total = 0;
  for (const lock of lockHeights) {
    for (const key of keyHeights) {
      if (lock.length !== key.length) continue;

      let valid = true;
      for (let i = 0; i < lock.length; i++) {
        if (lock[i] + key[i] > 7) {
          valid = false;
          break;
        }
      }

      if (valid) total++;
    }
  }
  return total;
}

function getHeights(lockORkey: string[]) {
  let lock = false;
  if (lockORkey[0][0] === '#') {
    lock = true;
  }

  const colHeights: number[] = [];
  for (let col = 0; col < lockORkey[0].length; col++) {
    let row = 0;
    while (lockORkey[lock ? row : lockORkey.length - row - 1][col] !== '.') {
      row++;
    }
    colHeights.push(row);
  }
  return colHeights;
}
