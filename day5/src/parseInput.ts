import fs from 'fs';

const rawTest = fs.readFileSync('./inputs/test.txt', 'utf-8');
const rawInput = fs.readFileSync('./inputs/input.txt', 'utf-8');

export type FormattedInput = { rules: [number, number][]; updates: number[][] };

function parseInput(input: string): FormattedInput {
  const [rawRules, rawUpdates] = input.split('\n\n');
  const rules = rawRules
    .split('\n')
    .map((rule) => rule.split('|').map(Number) as [number, number]);
  const updates = rawUpdates
    .split('\n')
    .map((update) => update.split(',').map(Number));

  return { rules, updates };
}

export const test = parseInput(rawTest);
export const input = parseInput(rawInput);
