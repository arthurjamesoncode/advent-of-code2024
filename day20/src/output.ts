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
    [0],
    [0],
  ];
  const answers = [1452, 999556];
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