import fs from 'fs';

export type FormattedInput = { matrix: string[][]; moves: string };

function parseInput(input: string): FormattedInput {
  const [warehouse, instructions] = input.split('\n\n');
  const matrix = warehouse.split('\n').map((row) => row.split(''));
  const moves = instructions.split('\n').join('');
  
  return { matrix, moves };
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
