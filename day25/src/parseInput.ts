import fs from 'fs';

export type FormattedInput = { locks: string[][]; keys: string[][] };

function parseInput(input: string): FormattedInput {
  const { locks, keys } = input.split('\n\n').reduce(
    (acc, curr) => {
      curr[0] === '#'
        ? acc.locks.push(curr.split('\n'))
        : acc.keys.push(curr.split('\n'));
      return acc;
    },
    { locks: [], keys: [] } as FormattedInput
  );

  return { locks, keys };
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
