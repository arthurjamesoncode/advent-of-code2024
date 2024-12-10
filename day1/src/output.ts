import { test, input } from './parseInput';
import part1 from './part1';
import part2 from './part2';

const output = `
Part 1-
TEST: ${part1(test)}
INPUT: ${part1(input)}

Part 2-
TEST: ${part2(test)}
INPUT: ${part2(input)}
`;

console.log(output);
