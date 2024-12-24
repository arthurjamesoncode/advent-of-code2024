import { FormattedInput } from './parseInput';

export default function main(input: FormattedInput): string {
  //I did this one by tracing the logic of the program, based on the logic of chained full adders
  //whenever i got undefined I would look at my output and swap them in input, adding the swapped results to swapped
  //I think next year I am going to have separate tests and inputs for parts 1 and 2 in my general template
  const { gates } = input;
  const entries = Object.entries(gates);

  if (entries.length < 50) return '';

  const xXORy: [[string, string, string], string][] = [];
  const xANDy: [[string, string, string], string][] = [];

  const resByGate: Record<string, string> = {};

  for (const [result, [left, operator, right]] of entries) {
    if (
      (left[0] === 'x' && right[0] === 'y') ||
      (right[0] === 'x' && left[0] === 'y')
    ) {
      if (operator === 'AND') {
        xANDy.push([[left, operator, right], result]);
      } else if (operator === 'XOR') {
        xXORy.push([[left, operator, right], result]);
      }
    }

    resByGate[`${left} ${operator} ${right}`] = result;
  }

  xXORy.sort(
    (a, b) => Number(a[0][0].substring(1)) - Number(b[0][0].substring(1))
  );
  xANDy.sort(
    (a, b) => Number(a[0][0].substring(1)) - Number(b[0][0].substring(1))
  );

  const carries = [xANDy[0][1]];
  for (let i = 1; i < xANDy.length; i++) {
    console.log(`c${i - 1} = ${carries[i - 1]}`);
    console.log(`x${i} ^ y${i} = ${xXORy[i][1]}`);
    console.log(`x${i} & y${i} = ${xANDy[i][1]}`);

    let z = `${carries[i - 1]} XOR ${xXORy[i][1]}`;
    if (resByGate[z] === undefined) {
      z = `${xXORy[i][1]} XOR ${carries[i - 1]}`;
    }

    console.log(`${z} = ${resByGate[z]}`);

    let and = `${carries[i - 1]} AND ${xXORy[i][1]}`;
    if (resByGate[and] === undefined) {
      and = `${xXORy[i][1]} AND ${carries[i - 1]}`;
    }

    console.log(`${and} = ${resByGate[and]}`);

    let c = `${resByGate[and]} OR ${xANDy[i][1]}`;
    if (resByGate[c] === undefined) {
      c = `${xANDy[i][1]} OR ${resByGate[and]}`;
    }

    console.log(`c${i} = ${c}`);
    console.log(' ');

    if (resByGate[c] === undefined) break;
    carries.push(resByGate[c]);
  }

  console.log(carries.map((carry, index) => '' + index + ':' + carry));
  console.log('');
  const swapped = [
    'cbd',
    'rqf',
    'z06',
    'jmq',
    'z13',
    'gmh',
    'z38',
    'qrh',
  ].sort();

  return swapped.join(',');
}
