import { FormattedInput } from './parseInput';

export default function main(input: FormattedInput): number {
  const antennaPositions = getAntennaPositions(input);

  const antinodes = new Set<string>();

  for (const positions of Object.values(antennaPositions)) {
    for (let i = 0; i < positions.length - 1; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const [row1, col1] = positions[i];
        const [row2, col2] = positions[j];

        const [rowDiff, colDiff] = [row1 - row2, col1 - col2];

        const node1 = [row1 + rowDiff, col1 + colDiff];
        const node2 = [row2 - rowDiff, col2 - colDiff];

        if (input[node1[0]] && input[node1[0]][node1[1]]) {
          antinodes.add(node1.join(','));
        }

        if (input[node2[0]] && input[node2[0]][node2[1]]) {
          antinodes.add(node2.join(','));
        }
      }
    }
  }

  return antinodes.size;
}

function getAntennaPositions(matrix: string[][]) {
  const map: Record<string, [[number, number]]> = {};
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      const frequency = matrix[row][col];
      if (frequency !== '.') {
        map[frequency]
          ? map[frequency].push([row, col])
          : (map[frequency] = [[row, col]]);
      }
    }
  }

  return map;
}
