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
import { test, input } from './parseInput';
import part1 from './part1';
import part2 from './part2';

const output = \`
Part 1-
TEST: \${part1(test)}
INPUT: \${part1(input)}

Part 2-
TEST: \${part2(test)}
INPUT: \${part2(input)}
\`;

console.log(output);
END
echo "$OUTPUT_CONTENT" > "day$x/src/output.ts"

mkdir "day$x/dist"
echo "dist" > "day$x/.gitignore"

mkdir "day$x/inputs"
touch "day$x/inputs/test.txt"
touch "day$x/inputs/input.txt"