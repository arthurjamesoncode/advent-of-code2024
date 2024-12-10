import fs from 'fs';

const rawTest = fs.readFileSync('./inputs/test.txt', 'utf-8');
const rawInput = fs.readFileSync('./inputs/input.txt', 'utf-8');

export type FormattedInput = [number[], number[]];

function parseInput(input: string): FormattedInput {
  const lines = input.split('\n');
  const leftList: number[] = [];
  const rightList: number[] = [];

  for (const line of lines) {
    const [leftNum, rightNum] = line.split('   ').map(Number);
    leftList.push(leftNum);
    rightList.push(rightNum);
  }

  return [leftList, rightList];
}

export const test = parseInput(rawTest);
export const input = parseInput(rawInput);
