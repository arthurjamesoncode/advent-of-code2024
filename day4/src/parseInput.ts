import fs from 'fs';

const rawTest = fs.readFileSync('./inputs/test.txt', 'utf-8')
const rawInput = fs.readFileSync('./inputs/input.txt', 'utf-8');

export type FormattedInput = string[][]

function parseInput(input: string): FormattedInput {
  return input.split('\n').map(line => line.split(''))
}

export const test = parseInput(rawTest)
export const input = parseInput(rawInput)
