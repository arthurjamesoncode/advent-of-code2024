import fs from 'fs';

export type Robot = { position: [number, number]; velocity: [number, number] };

export type FormattedInput = {
  robots: Robot[];
  gridSize: { width: number; height: number };
};

function parseInput(input: string): FormattedInput {
  const robots = input.split('\n').map((robot) => {
    const [position, velocity] = robot
      .split(' ')
      .map(
        (vector) =>
          vector.substring(2).split(',').map(Number) as [number, number]
      );

    return { position, velocity };
  });
  const gridSize = { width: 0, height: 0 };
  if (robots.length === 12) {
    gridSize.width = 11;
    gridSize.height = 7;
  } else {
    gridSize.width = 101;
    gridSize.height = 103;
  }

  return { robots, gridSize };
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
