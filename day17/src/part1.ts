import { FormattedInput, Registers } from './parseInput';

export const FNS = [adv, bxl, bst, jnz, bxc, out, bdv, cdv]

export default function main(input: FormattedInput): string {
  let { registers, instructions } = input;

  const output: string[] = [];

  let pointer = 0;
  while (instructions[pointer] !== undefined) {
    const opcode = instructions[pointer];
    const operand = instructions[pointer + 1];

    const fn = FNS[opcode];

    const res = fn(registers, operand, pointer);
    registers = res.registers;
    pointer = res.pointer;

    if (opcode === 5) output.push(res.output);
    if (opcode !== 3) pointer += 2;
  }

  return output.join(',');
}

function comboOperandValue(operand: number, registers: Record<string, number>) {
  if (operand <= 3) return operand;

  if (operand === 4) return registers.A;
  if (operand === 5) return registers.B;
  if (operand === 6) return registers.C;

  throw new Error('Invalid Operand');
}

//opcode 0
function adv(registers: Registers, operand: number, pointer: number) {
  const numerator = registers.A;
  const denominator = 2 ** comboOperandValue(operand, registers);

  registers.A = Math.floor(numerator / denominator);
  return { registers, pointer, output: '' };
}

//opcode 1
function bxl(registers: Registers, operand: number, pointer: number) {
  const res = registers.B ^ operand;
  registers.B = res;
  return { registers, pointer, output: '' };
}

//opcode 2
function bst(registers: Registers, operand: number, pointer: number) {
  const res = comboOperandValue(operand, registers) % 8;
  registers.B = res;
  return { registers, pointer, output: '' };
}

//opcode 3
function jnz(registers: Registers, operand: number, pointer: number) {
  if (registers.A === 0) {
    return { registers, pointer: pointer + 2, output: '' };
  }

  return { registers, pointer: operand, output: '' };
}

//opcode 4
function bxc(registers: Registers, _: number, pointer: number) {
  const res = registers.B ^ registers.C;
  registers.B = res;
  return { registers, pointer, output: '' };
}

//opcode 5
function out(registers: Registers, operand: number, pointer: number) {
  const res = comboOperandValue(operand, registers) % 8;
  return { registers, pointer, output: '' + res };
}

//opcode 6
function bdv(registers: Registers, operand: number, pointer: number) {
  const numerator = registers.A;
  const denominator = 2 ** comboOperandValue(operand, registers);

  registers.B = Math.floor(numerator / denominator);
  return { registers, pointer, output: '' };
}

//opcode 7
function cdv(registers: Registers, operand: number, pointer: number) {
  const numerator = registers.A;
  const denominator = 2 ** comboOperandValue(operand, registers);

  registers.C = Math.floor(numerator / denominator);
  return { registers, pointer, output: '' };
}
