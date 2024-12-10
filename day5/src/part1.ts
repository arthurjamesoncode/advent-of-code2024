import { FormattedInput } from './parseInput';

export default function main(input: FormattedInput): number {
  const { rules, updates } = input;
  const beforeMap = generateBeforeMap(rules);

  let total = 0;
  for (const update of updates) {
    const valid = isUpdateValid(update, beforeMap);
    if (!valid) continue;

    const mid = Math.floor(update.length / 2)
    total += update[mid]
  }

  return total;
}

export function generateBeforeMap(
  rules: [number, number][]
): Map<number, Set<number>> {
  const map = new Map<number, Set<number>>();

  for (const [before, after] of rules) {
    map.get(after)
      ? map.get(after)!.add(before)
      : map.set(after, new Set([before]));
  }

  return map;
}

export function isUpdateValid(
  update: number[],
  beforeMap: Map<number, Set<number>>
): boolean {
  for (let i = 0; i < update.length - 1; i++) {
    for (let j = i; j < update.length; j++) {
      const page1 = update[i];
      const page2 = update[j];

      const beforeRules = beforeMap.get(page1);
      if (!beforeRules) continue;

      if (beforeRules.has(page2)) return false;
    }
  }

  return true;
}
