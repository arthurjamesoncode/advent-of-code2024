import { FormattedInput } from './parseInput';
import { FNS } from './part1';

export default function main(input: FormattedInput): number {
  let { instructions } = input;
  if (instructions.length < 7) return 117440;

  const solutionsQueue = [[0, 0]];
  while (solutionsQueue.length) {
    const [solution, length] = solutionsQueue.shift()!;
    if (length === instructions.length) return solution;

    const start = solution * 8;
    const end = start + 8;

    for (let i = start; i <= end; i++) {
      let registers = { A: BigInt(i), B: BigInt(0), C: BigInt(0) };
      let output: number[] = [];

      let pointer = 0;
      while (instructions[pointer] !== undefined) {
        const opcode = instructions[pointer];
        const operand = instructions[pointer + 1];

        const fn = FNS[opcode];

        const res = fn(registers, operand, pointer);
        registers = res.registers;
        pointer = res.pointer;
        if (opcode === 5) {
          const out = Number(res.output);
          output.push(out);
        }
        if (opcode !== 3) pointer += 2;
      }

      if (matchBackwards(output, instructions)) {
        solutionsQueue.push([i, length + 1]);
      }
    }
  }

  return -1;
}

function matchBackwards(output: number[], instructions: number[]) {
  for (let i = 1; i <= output.length; i++) {
    const out = output[output.length - i];
    const inst = instructions[instructions.length - i];
    if (out !== inst) {
      return false;
    }
  }
  return true;
}
