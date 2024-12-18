import fs from 'fs';

export type Registers = { A: bigint; B: bigint; C: bigint };

export type FormattedInput = {
  registers: Registers;
  instructions: number[];
};

function parseInput(input: string): FormattedInput {
  const [memory, program] = input.split('\n\n');

  const registers = memory.split('\n').reduce((acc, line) => {
    const [key, value] = line.substring(9).split(': ');

    return { ...acc, [key]: BigInt(value) };
  }, {} as { A: bigint; B: bigint; C: bigint });

  const instructions = program.substring(9).split(',').map(Number);
  return { registers, instructions };
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
