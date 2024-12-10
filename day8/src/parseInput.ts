import fs from 'fs';

const rawTest = fs.readFileSync('./inputs/test.txt', 'utf-8')
const rawInput = fs.readFileSync('./inputs/input.txt', 'utf-8');

export type FormattedInput = string[][]

function parseInput(input: string): FormattedInput {
  const matrix = input.split('\n').map(line => line.split(''))
  
  return matrix;
}

export const test = parseInput(rawTest)
export const input = parseInput(rawInput)
