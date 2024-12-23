import { FormattedInput } from './parseInput';
import { nextSecretNumber } from './part1';

export default function main(input: FormattedInput): number {
  let total = 0;
  let sequenceTotals = new Map<string, number>(); //sequence -> total
  for (const num of input) {
    sequenceTotals = getSequencesOf4(num, 2000, sequenceTotals);
  }

  // console.log(sequenceTotals);

  let highest: number = 0;
  for (const [_, total] of sequenceTotals) {
    if (total > highest) highest = total;
  }

  return highest;
}

function getSequencesOf4(num: number, n: number, totals: Map<string, number>) {
  const sequences = new Set<string>();

  let last = num;
  let curr = nextSecretNumber(num);
  let diff = (curr % 10) - (last % 10);
  const queue = [diff];

  for (let i = 1; i < n; i++) {
    last = curr;
    curr = nextSecretNumber(curr);
    diff = (curr % 10) - (last % 10);
    queue.push(diff);

    if (queue.length === 4) {
      const key = queue.join(',');
      queue.shift();

      if (sequences.has(key)) continue;
      sequences.add(key);

      const bananas = curr % 10;
      const currTotal = totals.get(key);
      currTotal
        ? totals.set(key, currTotal + bananas)
        : totals.set(key, bananas);
    }
  }

  return totals;
}
