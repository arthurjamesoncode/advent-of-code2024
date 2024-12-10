import fs from 'fs';

const rawTest = fs.readFileSync('./inputs/test.txt', 'utf-8')
const rawInput = fs.readFileSync('./inputs/input.txt', 'utf-8');

export type FormattedInput = string //string is placeholder

function parseInput(input: string): FormattedInput {
  return input
}

export const test = parseInput(rawTest)
export const input = parseInput(rawInput)
