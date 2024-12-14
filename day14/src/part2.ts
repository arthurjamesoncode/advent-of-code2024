import { createCanvas } from 'canvas';
import fs from 'fs';
import { FormattedInput, Robot } from './parseInput';

export default function main(input: FormattedInput): number {
  const { robots, gridSize } = input;
  if (robots.length === 12) return 0;

  const { width, height } = gridSize;
  const emptyGrid = getEmptyGrid(width, height);

  const answerFound = false;
  if (answerFound) return 8179; //placed answer here after finding it manually
  //He just had to fuck up my nice standardized file formats by making me look for a christmas tree

  for (let second = 1; second < 10000; second++) {
    for (const robot of robots) {
      robot.position = moveRobot(robot, width, height);
    }

    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    const grid = getRobotGrid(robots, emptyGrid);

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const num = grid[row][col];
        const color = `rgb(0, ${num > 0 ? 255 : 0}, 0')`;
        context.fillStyle = color;
        context.fillRect(col, row, 1, 1);
      }
    }
    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync(`./output/${second}seconds.jpeg`, buffer);
  }

  return 0
}

function getEmptyGrid(width: number, height: number): number[][] {
  let grid: number[][] = [];
  for (let row = 0; row < height; row++) {
    grid.push([]);
    for (let col = 0; col < width; col++) {
      grid[row].push(0);
    }
  }
  return grid;
}

function getRobotGrid(robots: Robot[], emptyGrid: number[][]): number[][] {
  const grid = emptyGrid.map((row) => [...row]);
  for (const robot of robots) {
    const { position } = robot;
    const [col, row] = position;

    grid[row][col] = grid[row][col] + 1;
  }

  return grid;
}

function moveRobot(
  robot: Robot,
  width: number,
  height: number
): [number, number] {
  const { position, velocity } = robot;
  const [x, y] = position;
  const [xVel, yVel] = velocity;

  let newX = (x + xVel) % width;
  if (newX < 0) newX = width + newX;

  let newY = (y + yVel) % height;
  if (newY < 0) newY = height + newY;

  return [newX, newY];
}
