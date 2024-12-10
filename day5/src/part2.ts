import { FormattedInput } from './parseInput';
import { isUpdateValid, generateBeforeMap } from './part1';

export default function main(input: FormattedInput): number {
  const { rules, updates } = input;
  const beforeMap = generateBeforeMap(rules);

  const incorrectUpdates = updates.filter(
    (update) => !isUpdateValid(update, beforeMap)
  );

  let total = 0;

  for (const update of incorrectUpdates) {
    const correctUpdate = reorderUpdate(update, beforeMap);

    const mid = Math.floor(update.length / 2);
    total += correctUpdate[mid];
  }

  return total;
}

function reorderUpdate(update: number[], beforeMap: Map<number, Set<number>>) {
  const updatePages = new Set(update);
  const added = new Set<number>();
  const newUpdate: number[] = [];

  for (const page of update) {
    if(!added.has(page)) {
      insertPage(page, added, updatePages, newUpdate, beforeMap);
    }
  }

  return newUpdate;
}

function insertPage(
  page: number,
  added: Set<number>,
  updatePages: Set<number>,
  newUpdate: number[],
  beforeMap: Map<number, Set<number>>
) {
  const prevPages = beforeMap.get(page) || new Set();
  for (const prev of prevPages) {
    if (added.has(prev)) continue;
    if (!updatePages.has(prev)) continue;

    insertPage(prev, added, updatePages, newUpdate, beforeMap);
  }

  added.add(page);
  newUpdate.push(page);
}
