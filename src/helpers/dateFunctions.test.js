import { describe, expect, it } from "vitest";
import { calculateDaysLeft, getDaysInMonth } from "./dateFunctions";

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
