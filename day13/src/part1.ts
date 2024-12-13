import { FormattedInput } from './parseInput';
import { Machine } from './parseInput';

type Progress = {
  x: number;
  y: number;
  tokens: number;
  aPresses: number;
  bPresses: number;
};

export default function main(input: FormattedInput): number {
  let total = 0;

  for (const machine of input) {
    const tokens = findMinTokens(machine);
    if (tokens !== -1) total += tokens;
  }
  return total;
}

function findMinTokens(machine: Machine): number {
  for (let a = 1; a <= 100; a++) {
    for (let b = 0; b <= 100; b++) {
      if (
        machine.prize[0] === a * machine.a[0] + b * machine.b[0] &&
        machine.prize[1] === a * machine.a[1] + b * machine.b[1]
      ) {
        return 3 * a + b
      }
    }
  }
  return -1
}
