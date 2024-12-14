import { FormattedInput, Robot } from './parseInput';

export default function main(input: FormattedInput): number {
  const { robots, gridSize } = input;
  const { width, height } = gridSize;

  const quadrants = [0, 0, 0, 0];
  for (const robot of robots) {
    const { position, velocity } = robot;
    const [x, y] = position;
    const [xVel, yVel] = velocity;

    let newX = (x + xVel * 100) % width;
    if (newX < 0) newX = width + newX;

    let newY = (y + yVel * 100) % height;
    if (newY < 0) newY = height + newY;

    const newPosition: [number, number] = [newX, newY];
    const quadrant = getQuadrant(newPosition, width, height);
    if (quadrant === -1) continue;

    quadrants[quadrant] = quadrants[quadrant] + 1;
  }

  return quadrants.reduce((acc, curr) => (curr !== 0 ? acc * curr : acc));
}

function getQuadrant(
  position: [number, number],
  width: number,
  height: number
) {
  const [x, y] = position;
  const midX = Math.floor(width / 2);
  const midY = Math.floor(height / 2);
  if (x === midX || y === midY) return -1;

  const left = midX > x;
  const top = midY > y;

  if (left && top) return 0;
  if (top) return 1;
  if (left) return 2;
  return 3;
}
