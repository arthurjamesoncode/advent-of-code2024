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

const rawTest = fs.readFileSync('./inputs/test.txt', 'utf-8')
const rawInput = fs.readFileSync('./inputs/input.txt', 'utf-8');

export type FormattedInput = string //string is placeholder

function parseInput(input: string): FormattedInput {
  return input
}

export const test = parseInput(rawTest)
export const input = parseInput(rawInput)
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

read -d '' OUTPUT_CONTENT << END
import { test, input, FormattedInput } from './parseInput';
import part1 from './part1';
import part2 from './part2';

function getResult(func: Function, input: FormattedInput, expected: number) {
  const result = func(input);
  return [result, result === expected];
}

function getOutputString() : string {
  const parts = [part1, part2];
  const testCases = [0, 0, 0, 0];
  let testIndex = 0;

  let i = 1;
  let output = []; //an array is used to avoid using backslashes outside of the bash script used to generate this
  for (const func of parts) {
    output.push(\`Part \${i}-\`);

    let [result, correct] = getResult(func, test, testCases[testIndex]);
    testIndex++;

    output.push(\`TEST: \${result}, \${correct ? 'CORRECT' : 'WRONG'}\`);
    if (!correct) break;

    [result, correct] = getResult(func, input, testCases[testIndex]);
    testIndex++;
    
    output.push(\`INPUT: \${result}, \${correct ? 'CORRECT' : 'WRONG'}\`);
    if (!correct) break;
    i++
  }

  return \`
  \${output[0] || ''}
  \${output[1] || ''}
  \${output[2] || ''}
  
  \${output[3] || ''}
  \${output[4] || ''}
  \${output[5] || ''}
  \`
}

console.log(getOutputString());
END
echo "$OUTPUT_CONTENT" > "day$x/src/output.ts"

mkdir "day$x/dist"
echo "dist" > "day$x/.gitignore"

mkdir "day$x/inputs"
touch "day$x/inputs/test.txt"
touch "day$x/inputs/input.txt"