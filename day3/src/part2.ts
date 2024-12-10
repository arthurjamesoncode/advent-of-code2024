import { FormattedInput } from './parseInput';

import { validateExpression } from './part1';

export default function main(input: FormattedInput): number {
  let total = 0;
  let enabled = true;

  let index = 0;
  while (index < input.length) {
    if (enabled && input.substring(index, index + 7) === "don't()") {
      enabled = false;
      index += 7;
    } else if (!enabled && input.substring(index, index + 4) === 'do()') {
      enabled = true;
      index += 4;
    }

    if (enabled && input.substring(index, index + 4) === 'mul(') {
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
