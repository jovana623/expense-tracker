import { describe, it, expect } from "vitest";
import { calculatePercentage } from "./statistics";

describe("calculatePercentage", () => {
  it("should calculate correct percenage", () => {
    expect(calculatePercentage(200, 100)).toBe(100);
    expect(calculatePercentage(150, 100)).toBe(50);
  });

  it("should calculate correct negative percentage", () => {
    expect(calculatePercentage(50, 100)).toBe(-50);
    expect(calculatePercentage(0, 100)).toBe(-100);
  });

  it("should return 0 if previous value is 0, and current is also 0", () => {
    expect(calculatePercentage(0, 0)).toBe(0);
  });

  it("should return 100 if previous value is 0 and current is greater than 0", () => {
    expect(calculatePercentage(50, 0)).toBe(100);
  });

  it("should return 0 if both values are same", () => {
    expect(calculatePercentage(50, 50)).toBe(0);
  });

  it("should handle negative values", () => {
    expect(calculatePercentage(-50, -100)).toBe(50);
    expect(calculatePercentage(-100, -50)).toBe(-100);
  });
});
