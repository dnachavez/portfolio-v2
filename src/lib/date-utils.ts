import { parse } from "date-fns";

/**
 * Parses a date string and returns a timestamp for sorting
 * Handles formats like "Jan 2024", "January 2024", "2024", and "Present"
 */
export function parseDateToTimestamp(dateStr: string): number {
  // If it's "Present", return current date
  if (dateStr.toLowerCase().includes("present")) {
    return Date.now();
  }

  // Try to parse "Month Year" format (e.g., "Jan 2024" or "January 2024")
  const formats = ["MMM yyyy", "MMMM yyyy"];

  for (const format of formats) {
    try {
      const date = parse(dateStr.trim(), format, new Date());
      if (!isNaN(date.getTime())) {
        return date.getTime();
      }
    } catch {
      // Continue to next format
    }
  }

  // If only year is present, use January of that year
  const yearMatch = dateStr.match(/\d{4}/);
  if (yearMatch) {
    return new Date(parseInt(yearMatch[0]), 0).getTime();
  }

  return 0;
}

/**
 * Extracts the start date from a date range string and returns its timestamp
 * Used for sorting projects by most recent start date
 * For "Present" projects, uses the start date to determine recency
 */
export function getProjectSortDate(dateString: string): number {
  const parts = dateString.split(" - ");

  // Always use start date for sorting
  const startDate = parts[0]?.trim();
  return parseDateToTimestamp(startDate);
}
