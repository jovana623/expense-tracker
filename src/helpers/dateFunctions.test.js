import { describe, expect, it } from "vitest";
import {
  calculateDaysLeft,
  formatDate,
  formatMonthYear,
  getDaysInMonth,
  getTimeAgo,
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

describe("getTimeAgo", () => {
  const currentTime = new Date("2025-04-17T12:00:00Z").toISOString();

  it("return minutes ago if difference is less than 60 minutes", () => {
    const createdAt = new Date("2025-04-17T11:45:00Z").toISOString();
    const result = getTimeAgo(createdAt, currentTime);
    expect(result).toBe("15 minutes ago");
  });

  it("should correctly return when is exactly 1 minute", () => {
    const createdAt = new Date("2025-04-17T11:59:00Z").toISOString();
    const result = getTimeAgo(createdAt, currentTime);
    expect(result).toBe("1 minute ago");
  });

  it("should return hours ago if difference is less than 24 hours", () => {
    const createdAt = new Date("2025-04-17T08:00:00Z").toISOString();
    const result = getTimeAgo(createdAt, currentTime);
    expect(result).toBe("4 hours ago");
  });

  it("should correctly return when difference is exactly 1 hour", () => {
    const createdAt = new Date("2025-04-17T11:00:00Z").toISOString();
    const result = getTimeAgo(createdAt, currentTime);
    expect(result).toBe("1 hour ago");
  });

  it("should return days when difference is less than a week", () => {
    const createdAt = new Date("2025-04-15T12:00:00Z").toISOString();
    const result = getTimeAgo(createdAt, currentTime);
    expect(result).toBe("2 days ago");
  });

  it("should correctly return when difference is exactly 1 hour", () => {
    const createdAt = new Date("2025-04-16T12:00:00Z").toISOString();
    const result = getTimeAgo(createdAt, currentTime);
    expect(result).toBe("1 day ago");
  });

  it("should return date in format DD/MM/YYYY if difference is bigger than a week", () => {
    const createdAt = new Date("2025-04-01T10:00:00Z").toISOString();
    const result = getTimeAgo(createdAt, currentTime);
    expect(result).toBe("01/04/2025");
  });
});
