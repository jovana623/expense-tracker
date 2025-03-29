import { describe, it, expect } from "vitest";
import { calculateEndDate, prepareData } from "./savingsFunctions";

describe("prepareData", () => {
  it("should only return start and end date when there is no payments", () => {
    const saving = {
      goal: "5000",
      started_at: "2024-01-01",
      target_date: "2025-05-15",
    };
    const payments = [];
    const today = new Date("2025-03-28");
    const { chartData, endDate } = prepareData(saving, payments, today);
    expect(chartData).toEqual([
      { date: "1 Jan 2024", total: 0, goal: 5000 },
      { date: "15 May 2025", total: 0, goal: 5000 },
    ]);
    expect(endDate).toBe("15 May 2025");
  });

  it("should process when there is only one payment", () => {
    const saving = {
      goal: "5000",
      started_at: "2024-01-01",
      target_date: "2025-05-15",
    };
    const payments = [{ date: "2024-06-15", amount: "1000" }];
    const today = new Date("2025-03-28");
    const { chartData } = prepareData(saving, payments, today);
    expect(chartData).toEqual([
      { date: "1 Jan 2024", total: 0, goal: 5000 },
      { date: "15 Jun 2024", total: 1000, goal: 5000 },
      { date: "15 May 2025", total: 1000, goal: 5000 },
    ]);
  });
});

describe("calculateEndDate", () => {
  it("return target date if it is in the future", () => {
    const targetDate = new Date("2025-12-31");
    const today = new Date("2025-01-01");

    const result = calculateEndDate(targetDate, today);
    expect(result).toEqual(targetDate);
  });

  it("return today if target date is in past", () => {
    const targetDate = new Date("2024-01-01");
    const today = new Date("2025-01-01");

    const result = calculateEndDate(targetDate, today);
    expect(result).toEqual(today);
  });
});
