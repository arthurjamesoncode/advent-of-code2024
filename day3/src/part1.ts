import { FormattedInput } from './parseInput';

const DIGITS = '0123456789';

export default function main(input: FormattedInput): number {
  let total = 0;

  let index = 0;
  while (index < input.length) {
    if (input.substring(index, index + 4) === 'mul(') {
      index = index + 4;
      const [newIndex, valid, nums] = validateExpression(index, input);
      index = newIndex;

      if (valid) {
        let res = Number(nums[0]) * Number(nums[1]);
        total += res;
      }

      continue;
    }

    index++;
  }

  return total;
}

export function validateExpression(
  index: number,
  input: string
): [number, boolean, string[]] {
  let valid = true;
  let done = false;
  const nums = ['', ''];
  let currNum = 0;

  while (valid && !done) {
    if (DIGITS.includes(input[index])) {
      nums[currNum] += input[index];
    } else if (input[index] === ',' && nums[0].length > 0 && currNum === 0) {
      currNum = 1;
    } else if (input[index] === ')' && nums[1].length > 0 && currNum === 1) {
      done = true;
    } else {
      valid = false;
    }

    index++;
  }

  return [index, valid, nums];
}
