import fs from 'fs';

export type FormattedInput = Map<string, string[]>;

function parseInput(input: string): FormattedInput {
  const connections = input.split('\n');
  const adj = connections.reduce((acc, curr) => {
    const [a, b] = curr.split('-');
    const aList = acc.get(a);
    const bList = acc.get(b);

    if (aList) aList.push(b);
    else acc.set(a, [b]);

    if (bList) bList.push(a);
    else acc.set(b, [a]);
    return acc;
  }, new Map<string, string[]>());

  return adj;
}

function getRawTests(numOfTests: number) {
  const rawTests = [];
  for (let i = 1; i <= numOfTests; i++) {
    rawTests.push(fs.readFileSync('./inputs/test' + i + '.txt', 'utf-8'));
  }
  return rawTests;
}

const rawTests = getRawTests(1);
const rawInput = fs.readFileSync('./inputs/input.txt', 'utf-8');

export const tests = rawTests.map(parseInput);
export const input = parseInput(rawInput);
