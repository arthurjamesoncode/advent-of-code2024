import { test, input, FormattedInput } from './parseInput';
import part1 from './part1';
import part2 from './part2';

function getResult(func: Function, input: FormattedInput, expected: number) {
  const result = func(input);
  return [result, result === expected];
}

function getOutputString() : string {
  const parts = [part1, part2];
  const tests = [test, `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`] //for some reason they changed the test between parts for this one
  const testCases = [161, 170068701, 48, 78683433];
  let testIndex = 0;

  let i = 1;
  let output = []; //an array is used to avoid using backslashes outside of the bash script used to generate this
  for (const func of parts) {
    output.push(`Part ${i}-`);

    let [result, correct] = getResult(func, tests[i-1], testCases[testIndex]);
    testIndex++;

    output.push(`TEST: ${result}, ${correct ? 'CORRECT' : 'WRONG'}`);
    if (!correct) break;

    [result, correct] = getResult(func, input, testCases[testIndex]);
    testIndex++;
    
    output.push(`INPUT: ${result}, ${correct ? 'CORRECT' : 'WRONG'}`);
    if (!correct) break;
    i++
  }

  return `
  ${output[0] || ''}
  ${output[1] || ''}
  ${output[2] || ''}
  
  ${output[3] || ''}
  ${output[4] || ''}
  ${output[5] || ''}
  `
}

console.log(getOutputString());
