import { FormattedInput } from './parseInput';

type File = {id: number, start: number, length: number}

export default function main(input: FormattedInput): number {
  const { files, spaces } = getFilesAndSpaces(input);

  const { fileArray: reorderedFiles, spaceArray: reorderedSpaces } =
    reorderFiles(files, spaces);

  const reordered = mergeFilesAndSpaces(reorderedFiles, reorderedSpaces);
  let checkSum = 0;
  let index = 0;
  
  for (const file of reordered) {
    if (file.id === -1) {
      for (let i = 0; i < file.length; i++) {
        index++;
      }

      continue;
    }

    for (let i = 0; i < file.length; i++) {
      checkSum += file.id * index;
      index++;
    }
  }

  return checkSum;
}

function getFilesAndSpaces(diskMap: string) {
  const files = [];
  const spaces = [];

  let freeSpace = false;
  let id = 0;
  let index = 0;

  for (let i = 0; i < diskMap.length; i++) {
    const num = Number(diskMap[i]);

    if (!freeSpace) {
      files.push({ id, start: index, length: num });
      id++;
    } else {
      spaces.push({ id: -1, start: index, length: num });
    }

    index += num;
    freeSpace = !freeSpace;
  }

  return { files, spaces };
}

function reorderFiles(files: File[], spaces: File[]) {
  for (let i = files.length - 1; i >= 0; i--) {
    const file = files[i];

    for (const space of spaces) {
      if (space.start >= file.start) continue;

      if (space.length >= file.length) {
        spaces.push({ id: -1, start: file.start, length: file.length });
        file.start = space.start;
        space.length = space.length - file.length;
        space.start = space.start + file.length;
        break;
      }
    }
  }

  files.sort((a, b) => a.start - b.start);
  spaces.sort((a, b) => a.start - b.start);

  return {
    fileArray: files,
    spaceArray: spaces,
  };
}

function mergeFilesAndSpaces(files: File[], spaces: File[]) {
  const res = [];
  while (files.length && spaces.length) {
    if (files[0].start < spaces[0].start) res.push(files.shift()!);
    else res.push(spaces.shift()!);
  }

  return res;
}
