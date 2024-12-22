import { FormattedInput } from './parseInput';

export default function main(input: FormattedInput): number {
  let total = 0;
  for (const num of input) {
    const secret = nthSecretNumber(num, 2000);
    total += secret;
  }

  return total;
}

export function nextSecretNumber(num: number): number {
  num ^= num * 64;
  num >>>= 0;
  num %= 16777216;
  num ^= Math.floor(num / 32);
  num >>>= 0;
  num %= 16777216;
  num ^= num * 2048;
  num >>>= 0;
  num %= 16777216;
  return num;
}

function nthSecretNumber(initial: number, n: number): number {
  let res = initial;
  for (let i = 0; i < n; i++) {
    res = nextSecretNumber(res);
  }
  return res;
}
