import { FormattedInput } from './parseInput';

export default function main(input: FormattedInput): number {
  let total = 0
  for(const report of input) {
    const safe = isReportSafe(report);
    
    if(safe) total++
  }
  return total;
}

function isReportSafe(report: number[]): boolean {
  let increasing = false;
  for (let i = 0; i < report.length - 1; i++) {
    const diff = report[i] - report[i + 1];
    if (diff === 0 || Math.abs(diff) > 3) return false;

    if (i === 0 && diff > 0) {
      increasing = true;
      continue;
    }

    if (diff > 0 !== increasing) return false;
  }
  return true;
}
