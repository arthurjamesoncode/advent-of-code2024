import { FormattedInput } from './parseInput';

export default function main(input: FormattedInput): number {
  const { designs, towels } = input;

  const checked = new Map<string, boolean>();
  let total = 0;
  for (const design of designs) {
    if (designIsPossible(design, 0, towels, checked)) {
      total++;
    }
  }

  return total;
}

function designIsPossible(
  design: string,
  index: number,
  towels: string[],
  checked: Map<string, boolean>
) {
  if (index === design.length) {
    return true;
  }

  const substring = design.substring(index);
  if (checked.has(substring)) return checked.get(substring);

  for (const towel of towels) {
    const match = design.substring(index, index + towel.length) === towel;
    if (
      match &&
      designIsPossible(design, index + towel.length, towels, checked)
    ) {
      checked.set(substring, true);
      return true;
    }
  }

  checked.set(substring, false);
  return false;
}
