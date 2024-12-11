import { FormattedInput } from './parseInput';

export default function main(input: FormattedInput): Number {
  let stones = input;
  for (let i = 0; i < 25; i++) {
    const newStones: number[] = [];
    for (const num of stones) {
      if (num === 0) {
        newStones.push(1);
        continue;
      }

      const str = `${num}`;
      if (str.length % 2 === 0) {
        const stone1 = Number(str.substring(0, str.length / 2));
        const stone2 = Number(str.substring(str.length / 2));
        newStones.push(stone1, stone2);
        continue;
      }

      newStones.push(num * 2024);
    }

    stones = newStones;
  }

  return stones.length;
}
