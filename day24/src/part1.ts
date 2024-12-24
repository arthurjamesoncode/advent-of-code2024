import { FormattedInput } from './parseInput';

export default function main(input: FormattedInput): number {
  let { values, gates } = input;
  values = { ...values };
  const entries = Object.entries(gates);
  // if(entries.length > 50) return 46362252142374; //temporary

  const zWires = [];
  for (const [result, gate] of entries) {
    if (result[0] === 'z') zWires.push(result);

    if (values[result] !== undefined) continue;
    resolve(result, gate, values, gates);
  }

  zWires.sort((a, b) => Number(b.substring(1)) - Number(a.substring(1)));

  let res = '';
  for (const wire of zWires) {
    res += values[wire];
  }

  return parseInt(res, 2);
}

function resolve(
  result: string,
  gate: [string, string, string],
  values: Record<string, number>,
  gates: Record<string, [string, string, string]>
): number {
  if (values[result] !== undefined) {
    return values[result];
  }
  const [left, operator, right] = gate;

  const a = resolve(left, gates[left], values, gates);
  const b = resolve(right, gates[right], values, gates);

  let res = 0;
  if (operator === 'AND') {
    res = a & b;
  } else if (operator === 'OR') {
    res = a | b;
  } else {
    res = a ^ b;
  }

  values[result] = res;
  return res;
}
