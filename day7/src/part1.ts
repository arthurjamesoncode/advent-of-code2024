import { FormattedInput } from './parseInput';

export default function main(input: FormattedInput): number {
  let total = 0;

  for (const equation of input) {
    const { testValue, numbers } = equation;

    if (lineIsValid(testValue, numbers, 0, numbers[0])) total += testValue;
  }
  
  return total;
}

function lineIsValid(
  testValue: number,
  numbers: number[],
  index: number,
  total: number
): boolean {
  if (index === numbers.length - 1) return total === testValue;

  const add = lineIsValid(
    testValue,
    numbers,
    index + 1,
    total + numbers[index + 1]
  );
  if (add) return true;

  const mul = lineIsValid(
    testValue,
    numbers,
    index + 1,
    total * numbers[index + 1]
  );
  return mul;
}
