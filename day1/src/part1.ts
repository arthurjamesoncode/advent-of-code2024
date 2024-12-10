import { FormattedInput } from './parseInput';

export default function main(input: FormattedInput): number {
  const [leftList, rightList] = input;
  leftList.sort((a, b) => a - b);
  rightList.sort((a, b) => a - b);

  let total = 0;
  for(let i = 0; i < leftList.length; i++) {
    total += Math.abs(leftList[i] - rightList[i])
  }

  return total;
}
