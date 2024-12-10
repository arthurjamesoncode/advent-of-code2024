import { FormattedInput } from './parseInput';
import { getAntennaPositions } from './part1';

export default function main(input: FormattedInput): number {
  const antennaPositions = getAntennaPositions(input);

  const antinodes = new Set<string>();

  for (const positions of Object.values(antennaPositions)) {
    for (let i = 0; i < positions.length - 1; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const [row1, col1] = positions[i];
        const [row2, col2] = positions[j];

        const [rowDiff, colDiff] = [row1 - row2, col1 - col2];

        let newRow = row1;
        let newCol = col1;

        while (input[newRow] && input[newRow][newCol]) {
          antinodes.add(`${newRow},${newCol}`);

          newRow = newRow + rowDiff;
          newCol = newCol + colDiff;
        }

        newRow = row1 - rowDiff;
        newCol = col1 - colDiff;

        while (input[newRow] && input[newRow][newCol]) {
          antinodes.add(`${newRow},${newCol}`);

          newRow = newRow - rowDiff;
          newCol = newCol - colDiff;
        }
      }
    }
  }

  return antinodes.size;
}


