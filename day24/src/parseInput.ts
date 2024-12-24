import fs from 'fs';

export type FormattedInput = {
  values: Record<string, number>;
  gates: Record<string, [string, string, string]>;
};

function parseInput(input: string): FormattedInput {
  const [inputs, logic] = input.split('\n\n');

  const values: Record<string, number> = inputs
    .split('\n')
    .reduce((acc, curr) => {
      const [key, value] = curr.split(': ');

      return {
        ...acc,
        [key]: Number(value),
      };
    }, {});

  const gates: Record<string, [string, string, string]> = logic
    .split('\n')
    .reduce((acc, curr) => {
      const [gate, result] = curr.split(' -> ');
      const [a, operator, b] = gate.split(' ');

      return { ...acc, [result]: [a, operator, b] };
    }, {});

  return { values, gates };
}

function getRawTests(numOfTests: number) {
  const rawTests = [];
  for (let i = 1; i <= numOfTests; i++) {
    rawTests.push(fs.readFileSync('./inputs/test' + i + '.txt', 'utf-8'));
  }
  return rawTests;
}

const rawTests = getRawTests(2);
const rawInput = fs.readFileSync('./inputs/input.txt', 'utf-8');

export const tests = rawTests.map(parseInput);
export const input = parseInput(rawInput);
