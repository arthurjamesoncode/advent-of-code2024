import fs from 'fs';

const rawTest = fs.readFileSync('./inputs/test.txt', 'utf-8');
const rawInput = fs.readFileSync('./inputs/input.txt', 'utf-8');

export type FormattedInput = { testValue: number; numbers: number[] }[]; //string is placeholder

function parseInput(input: string): FormattedInput {
  const equations = input.split('\n').map((line) => {
    let [testValue, numbers] = line.split(': ');
    return {
      testValue: Number(testValue),
      numbers: numbers.split(' ').map(Number),
    };
  });

  return equations;
}

export const test = parseInput(rawTest);
export const input = parseInput(rawInput);
