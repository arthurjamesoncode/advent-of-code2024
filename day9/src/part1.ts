import { FormattedInput } from './parseInput';

export default function main(input: FormattedInput): number {
  const files = getFiles(input);
  
  let index = 0;
  let checksum = 0;
  for(const file of files){
    if(file.id === -1) {
      for (let i = 0; i < file.length; i++) {
        while (files[files.length - 1].id === -1) {
          files.pop();
        }
  
        const lastFile = files[files.length - 1];
  
        lastFile.length -= 1
        if(!lastFile.length) files.pop()
  
        checksum += index * lastFile.id
        index++
      }

      continue
    }

    for(let i = 0; i < file.length; i++) {
      checksum += index * file.id
      index++
    }
  }

  return checksum;
}

function getFiles(diskMap: string) {
  const files = [];

  let freeSpace = false;
  let id = 0;
  let index = 0;

  for (const char of diskMap) {
    const num = Number(char);

    if (!freeSpace) {
      files.push({ id, start: index, length: num });
      id++;
    } else {
      files.push({ id: -1, start: index, length: num });
    }

    index += num;
    freeSpace = !freeSpace;
  }

  return files;
}
