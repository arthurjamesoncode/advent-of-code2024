#!/bin/bash

x=1
while [ -d "day$x" ]
do
  x=$(( $x + 1 ))
done

mkdir "day$x"

read -r -d '' TSCONFIG_CONTENT << END
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "./src",
    "strict": true,
    "sourceMap": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts"]
}
END
echo "$TSCONFIG_CONTENT" > "day$x/tsconfig.json"

read -r -d '' PACKAGE_CONTENT << END
{
  "scripts": {
    "output": "tsc && node dist/output.js"
  }
}
END
echo ${PACKAGE_CONTENT} > "day$x/package.json"

mkdir "day$x/src"
read -r -d '' PARSE_INPUT_CONTENT << END
import fs from 'fs';

export type FormattedInput = string; //placeholder type

function parseInput(input: string): FormattedInput {
  return input;
}

function getRawTests(numOfTests: number) {
  const rawTests = [];
  for (let i = 1; i <= numOfTests; i++) {
    rawTests.push(fs.readFileSync('./inputs/test' + i + '.txt', 'utf-8'));
  }
  return rawTests
}

const rawTests = getRawTests(1)
const rawInput = fs.readFileSync('./inputs/input.txt', 'utf-8');


export const tests = rawTests.map(parseInput);
export const input = parseInput(rawInput);
END
echo "$PARSE_INPUT_CONTENT" > "day$x/src/parseInput.ts"

read -r -d '' PART_CONTENT << END
import { FormattedInput } from './parseInput';

export default function main(input: FormattedInput): FormattedInput {
  return input;
}
END

echo "$PART_CONTENT" > "day$x/src/part1.ts"
echo "$PART_CONTENT" > "day$x/src/part2.ts"

read -r -d '' OUTPUT_CONTENT << END
import { tests, input, FormattedInput } from './parseInput';
import part1 from './part1';
import part2 from './part2';

function getResult(func: Function, input: FormattedInput, expected: number) {
  const result = func(input);
  return [result, result === expected];
}

function getOutputString(): string {
  const parts = [part1, part2];
  const testCases = [
    [NaN],
    [NaN],
  ];
  const answers = [NaN, NaN];
  let testIndex = 0;

  let i = 0;
  let output = '';
  for (const func of parts) {
    output += 'Part ' + (i + 1) + '-\n';

    let stop = false;
    tests.forEach((test, index) => {
      let [result, correct] = getResult(func, test, testCases[i][index]);

      testIndex++;
      output +=
        'TEST ' +
        (index + 1) +
        ': ' +
        result +
        ', ' +
        (correct ? 'CORRECT' : 'WRONG') +
        '\n';
      if (!correct) stop = true;
    });
    if (stop) break;

    let [result, correct] = getResult(func, input, answers[i]);

    output +=
      'INPUT: ' + result + ', ' + (correct ? 'CORRECT' : 'WRONG') + '\n';
    if (!correct) break;
    i++;

    output += '\n';
  }

  return output;
}

console.log(getOutputString());
END
echo "$OUTPUT_CONTENT" > "day$x/src/output.ts"

mkdir "day$x/dist"
echo "dist" > "day$x/.gitignore"

mkdir "day$x/inputs"
touch "day$x/inputs/test1.txt"
touch "day$x/inputs/input.txt"