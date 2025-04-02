import { describe, expect, it } from "vitest";
import {
  calculateDaysLeft,
  formatDate,
  formatMonthYear,
  getDaysInMonth,
} from "./dateFunctions";

describe("formatDate", () => {
  it("should return date in correct format", () => {
    const date = new Date(2025, 0, 15);
    const result = formatDate(date);
    expect(result).toBe("15 Jan 2025");
  });

  it("should handle date passed as string", () => {
    expect(formatDate("2025-02-20")).toBe("20 Feb 2025");
  });

  it("should handle timestamp input", () => {
    const timestamp = new Date(2025, 5, 10).getTime();
    expect(formatDate(timestamp)).toBe("10 Jun 2025");
  });
});

describe("formatMonthYear", () => {
  it("should return date in correct format", () => {
    const date = new Date(2025, 0, 15);
    const result = formatMonthYear(date);
    expect(result).toBe("Jan 2025");
  });

  it("should handle date passed as string", () => {
    expect(formatMonthYear("2025-02-20")).toBe("Feb 2025");
  });

  it("should handle timestamp input", () => {
    const timestamp = new Date(2025, 5, 10).getTime();
    expect(formatMonthYear(timestamp)).toBe("Jun 2025");
  });
});

describe("calculateDaysLeft", () => {
  it("should calculate days correctly", () => {
    const startDate = new Date("2024-07-01");
    const endDateStr = "2024-07-03";
    const result = calculateDaysLeft(startDate, endDateStr);
    expect(result).toBe(2);
  });

  it("should return 0 if start date is equal end date", () => {
    const startDate = new Date("2024-07-03");
    const endDateStr = "2024-07-03";
    const result = calculateDaysLeft(startDate, endDateStr);
    expect(result).toBe(0);
  });

  it("should return negative number if end date is before start date", () => {
    const startDate = new Date("2024-07-05");
    const endDateStr = "2024-07-03";

    const result = calculateDaysLeft(startDate, endDateStr);
    expect(result).toBe(-2);
  });

  it("should handle leep year correctly", () => {
    const startDate = new Date("2024-02-28");
    const endDateStr = "2024-03-01";
    const result = calculateDaysLeft(startDate, endDateStr);
    expect(result).toBe(2);
  });
});

describe("getDaysInMonth", () => {
  it("should return correct number of days", () => {
    expect(getDaysInMonth(2024, 0)).toBe(31);
  });
});
