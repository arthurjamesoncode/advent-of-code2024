import { FormattedInput } from './parseInput';

export default function main(input: FormattedInput): string {
  let biggest = 0;
  let password = '';

  const allNodes = new Set(input.keys());
  const allSets = getAllSets(new Set(), allNodes, new Set(), input);
  
  for(const set of allSets.values()) {
    if(set.length <= biggest) continue;
    biggest = set.length;
    password = set.sort().join(',')
  } 
  return password;
}

function getAllSets(
  current: Set<string>,
  potential: Set<string>,
  considered: Set<string>,
  adj: Map<string, string[]>,
  allSets: Set<string[]> = new Set()
) {
  if (potential.size === 0 && considered.size === 0) {
    allSets.add([...current]);
    return allSets;
  }

  for (const node of [...potential]) {
    const neighbors = new Set(adj.get(node) || []);
    allSets = getAllSets(
      new Set([...current, node]),
      new Set([...potential].filter((n) => neighbors.has(n))),
      new Set([...considered].filter((n) => neighbors.has(n))),
      adj,
      allSets
    );

    potential.delete(node);
    considered.add(node);
  }

  return allSets;
}
