import { FormattedInput } from './parseInput';
import { Machine } from './parseInput';

export default function main(input: FormattedInput): number {
  let total = 0;
  for (const machine of input) {
    machine.prize[0] = machine.prize[0] + 10000000000000;
    machine.prize[1] = machine.prize[1] + 10000000000000;

    const tokens = calcMinTokens(machine);
    if (tokens !== -1) total += tokens;
  }
  return total;
}

function calcMinTokens(machine: Machine) {
  const [minA, maxA] =
    machine.a[0] < machine.a[1]
      ? [machine.a[0], machine.a[1]]
      : [machine.a[1], machine.a[0]];

  const lcm = LCM(minA, maxA);
  const mul0 = lcm / machine.a[0];
  const mul1 = lcm / machine.a[1];

  const newTotal = machine.prize[0] * mul0 - machine.prize[1] * mul1;
  const newB = machine.b[0] * mul0 - machine.b[1] * mul1;

  const b = newTotal / newB;
  if (b % 1 !== 0) return -1;

  const a = (machine.prize[0] - machine.b[0] * b) / machine.a[0];
  if (a % 1 !== 0) return -1;

  return 3 * a + b;
}

function LCM(a: number, b: number): number {
  return (a * b) / GCD(a, b);
}

function GCD(a: number, b: number): number {
  return !b ? a : GCD(b, a % b);
}
