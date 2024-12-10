import { FormattedInput } from './parseInput';

export default function main(input: FormattedInput): number {
  const [leftList, rightList] = input;
  rightList.sort((a, b) => a - b);

  const calculated: Map<number, number> = new Map();

  let total = 0;
  for (const num of leftList) {
    if (calculated.get(num) != null) {
      total += calculated.get(num)!;
      continue;
    }

    let score = 0;
    let index = rightList.findIndex((n) => n === num);
    while (rightList[index] === num) {
      score += num;
      index++;
    }

    calculated.set(num, score);
    total += score;
  }

  return total;
}
