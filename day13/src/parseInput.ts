import fs from 'fs';

export type FormattedInput = {
  a: [number, number];
  b: [number, number];
  prize: [number, number];
}[];

function parseInput(input: string): FormattedInput {
  const machines = input.split('\n\n').map((machine) => {
    const [lineA, lineB, prizeLine] = machine.split('\n');
    const a = lineA
      .substring(10)
      .split(', ')
      .map((direction) => direction.substring(2))
      .map(Number) as [number, number];
    const b = lineB
      .substring(10)
      .split(', ')
      .map((direction) => direction.substring(2))
      .map(Number) as [number, number];
    const prize = prizeLine
      .substring(7)
      .split(', ')
      .map((direction) => direction.substring(2))
      .map(Number) as [number, number];

    return { a, b, prize };
  });
  return machines;
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
