import { FormattedInput } from './parseInput';
import { DIRECTIONS } from './part1';

const SIDES: Record<string, string> = {
  '-1,0': 'top',
  '1,0': 'bottom',
  '0,-1': 'left',
  '0,1': 'right',
};

export default function main(input: FormattedInput): number {
  const visited = new Set<string>();

  let total = 0;
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      const pos = `${row},${col}`;
      if (visited.has(pos)) continue;

      const { area, sides } = calculateRegion([row, col], input, visited);
      total += area * sides;
    }
  }
  return total;
}

function calculateRegion(
  pos: [number, number],
  matrix: string[][],
  visited: Set<string>
) {
  const [row, col] = pos;
  const plot = matrix[row][col];
  const stack: [number, number][] = [[row, col]];

  const edges: Record<string, [number, number][]> = {
    top: [],
    bottom: [],
    left: [],
    right: [],
  };

  let area = 1;
  while (stack.length) {
    const [row, col] = stack.pop()!;
    const pos = `${row},${col}`;
    visited.add(pos);

    let localPerimeter = 4;
    for (const direction of DIRECTIONS) {
      const newRow = row + direction[0];
      const newCol = col + direction[1];
      const newPos = `${newRow},${newCol}`;

      if (!matrix[newRow] || matrix[newRow][newCol] !== plot) {
        const side = SIDES[direction.join(',')];
        edges[side].push([row, col]);
        continue;
      }

      if (visited.has(newPos)) {
        localPerimeter -= 1;
        continue;
      }

      visited.add(newPos);

      area += 1;

      localPerimeter--; //separate lines to make the algorithm more obvious
      stack.push([newRow, newCol]);
    }
  }
  let sides = 0;
  let orientation = 0;
  for (let [edge, plots] of Object.entries(edges)) {
    const horizontal = orientation < 2;
    plots = plots.sort((pos1, pos2) => {
      const [row1, col1] = pos1;
      const [row2, col2] = pos2;
      if (horizontal && row1 === row2) {
        return col1 - col2;
      }

      if (horizontal || col1 === col2) {
        return row1 - row2;
      }

      return col1 - col2;
    });

    let [lastA, lastB] = [-1, -1];
    let localSides = 0;
    for (const plot of plots) {
      const [row, col] = plot;
      const [currentA, currentB] = horizontal ? [row, col] : [col, row];

      if (currentA !== lastA || currentB - lastB !== 1) {
        localSides++
      } 

      [lastA, lastB] = [currentA, currentB];
    }
    sides += localSides;
    orientation++;
  }

  return { area, sides };
}
