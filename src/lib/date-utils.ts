import { parse } from "date-fns";

export function parseDateToTimestamp(dateStr: string): number {
  if (dateStr.toLowerCase().includes("present")) {
    return Date.now();
  }

  const formats = ["MMM yyyy", "MMMM yyyy"];

  for (const format of formats) {
    try {
      const date = parse(dateStr.trim(), format, new Date());
      if (!isNaN(date.getTime())) {
        return date.getTime();
      }
    } catch {
    }
  }

  const yearMatch = dateStr.match(/\d{4}/);
  if (yearMatch) {
    return new Date(parseInt(yearMatch[0]), 0).getTime();
  }

  return 0;
}

export function getProjectSortDate(dateString: string): number {
  const parts = dateString.split(" - ");
  const startDate = parts[0]?.trim();
  return parseDateToTimestamp(startDate);
}
