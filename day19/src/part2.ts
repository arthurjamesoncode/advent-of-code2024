import { FormattedInput } from './parseInput';

export default function main(input: FormattedInput): number {
  const { designs, towels } = input;

  const checked = new Map<string, number>();
  let total = 0;
  for (const design of designs) {
    const add = countDesigns(design, 0, towels, checked);
    total += add;
  }

  return total;
}

function countDesigns(
  design: string,
  index: number,
  towels: string[],
  checked: Map<string, number>
) {
  if (index === design.length) {
    return 1;
  }

  const substring = design.substring(index);
  if (checked.has(substring)) return checked.get(substring)!;

  let total = 0;
  for (const towel of towels) {
    const match = design.substring(index, index + towel.length) === towel;

    if (match) {
      const num = countDesigns(design, index + towel.length, towels, checked);
      total += num
    }
  }

  checked.set(substring, total);
  return total;
}
