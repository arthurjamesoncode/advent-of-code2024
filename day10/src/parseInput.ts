import fs from 'fs';

const rawTest = fs.readFileSync('./inputs/test.txt', 'utf-8');
const rawInput = fs.readFileSync('./inputs/input.txt', 'utf-8');

export type FormattedInput = number[][];

function parseInput(input: string): FormattedInput {
  const matrix = input.split('\n').map((row) => row.split('').map(Number));

  return matrix
}

export const test = parseInput(rawTest);
export const input = parseInput(rawInput);
