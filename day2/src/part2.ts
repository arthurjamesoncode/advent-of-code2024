import { FormattedInput } from './parseInput';
import { isReportSafe } from './part1';

export default function main(input: FormattedInput): Number {
  let total = 0
  for(const report of input) {
    let safe = isReportSafe(report);

    for (let i = 0; i < report.length; i++) {
      const reportCopy = [];
      for (let j = 0; j < report.length; j++) {
        if (i !== j) reportCopy.push(report[j]);
      }
  
      safe = isReportSafe(reportCopy);
      if (safe) {
        total++;
        break;
      }
    }
  }
  return total;
}
