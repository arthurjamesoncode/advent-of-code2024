import { tests, input, FormattedInput } from './parseInput';
import part1 from './part1';
import part2 from './part2';

function getResult(func: Function, input: FormattedInput, expected: string | number) {
  const result = func(input);
  return [result, result === expected];
}

function getOutputString(): string {
  const parts = [part1, part2];
  const testCases = [
    ['5,7,3,0'],
    [117440],
  ];
  const answers = ['3,6,3,7,0,7,0,3,0', 136904920099226];
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
