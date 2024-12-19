import fs from 'fs';

export type FormattedInput = { designs: string[]; towels: string[] }; //placeholder type

function parseInput(input: string): FormattedInput {
  const [towels, designs] = input
    .split('\n\n')
    .map((section, i) => (i === 0 ? section.split(', ') : section.split('\n')));
  return { designs, towels };
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
