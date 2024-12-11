import { FormattedInput } from './parseInput';

export default function main(input: FormattedInput): number {
  let stones = new Map<number, number>();

  for (const num of input) {
    const frequency = stones.get(num);
    if (frequency !== undefined) {
      stones.set(num, frequency + 1);
      continue;
    }

    stones.set(num, 1);
  }

  for (let i = 0; i < 75; i++) {
    const newStones = new Map<number, number>();

    for (const [num, numFrequency] of stones) {
      if (num === 0) {
        const frequency = newStones.get(1);
        if (frequency !== undefined) {
          newStones.set(1, frequency + numFrequency);
          continue;
        }

        newStones.set(1, numFrequency)
        continue
      }

      const str = `${num}`;
      if (str.length % 2 === 0) {
        const stone1 = Number(str.substring(0, str.length / 2));
        const stone2 = Number(str.substring(str.length / 2));

        const frequency1 = newStones.get(stone1);
        if (frequency1 !== undefined) {
          newStones.set(stone1, frequency1 + numFrequency);
        } else {
          newStones.set(stone1, numFrequency);
        }

        const frequency2 = newStones.get(stone2);
        if (frequency2 !== undefined) {
          newStones.set(stone2, frequency2 + numFrequency);
        } else {
          newStones.set(stone2, numFrequency);
        }

        continue;
      }

      const frequency = newStones.get(num * 2024);
      if (frequency !== undefined) {
        newStones.set(num * 2024, frequency + numFrequency);
      } else {
        newStones.set(num * 2024, numFrequency);
      }
    }

    stones = newStones;
  }

  let total = 0;
  for (const [_, frequency] of stones) {
    total += frequency;
  }

  return total;
}
