import { FormattedInput } from './parseInput';

export default function main(input: FormattedInput): number {
  let total = 0;
  const sets = new Set<string>();

  for (const [node, connections] of input) {
    if (node[0] !== 't') continue;

    for (let i = 0; i < connections.length - 1; i++) {
      for (let j = i + 1; j < connections.length; j++) {
        const a = connections[i];
        const b = connections[j];
        const selection = [node, a, b].sort().join(',');

        if(sets.has(selection)) continue;
        sets.add(selection)

        if (input.get(a)?.includes(b)) {
          total++;
        }
      }
    }
  }

  return total;
}
