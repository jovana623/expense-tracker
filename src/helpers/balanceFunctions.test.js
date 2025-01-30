import { describe, expect, it } from "vitest";
import {
  calculateAverageBalance,
  calculateBestBalance,
  calculatePercentageDifference,
  calculateWorstBalance,
} from "./balanceFunctions";

describe("calculateAverageBalance", () => {
  it("should calculate correct average for a set of balances", () => {
    const balances = [
      { date: "2023-08", balance: 1000.0 },
      { date: "2023-09", balance: 1200.0 },
      { date: "2023-10", balance: 1100.0 },
    ];
    const result = calculateAverageBalance(balances);
    expect(result).toBe(1100.0);
  });

  it("should return 0 for an empty array", () => {
    const balances = [];
    const result = calculateAverageBalance(balances);
    expect(result).toBe(0);
  });

  it("should return balance itself when there is only one balance", () => {
    const balances = [{ date: "2023-08", balance: 1000.0 }];
    const result = calculateAverageBalance(balances);
    expect(result).toBe(1000.0);
  });
});

describe("calculatePercentageDiff", () => {
  it("should calculate accurate difference", () => {
    const balance = 1200;
    const average = 1000;
    const result = calculatePercentageDifference(balance, average);
    expect(result).toBe(20);
  });

  it("should return 0 when balance and average are same", () => {
    const balance = 1000;
    const average = 1000;
    const result = calculatePercentageDifference(balance, average);
    expect(result).toBe(0);
  });

  it("should return 100 when average is 0", () => {
    const balance = 1000;
    const average = 0;
    const result = calculatePercentageDifference(balance, average);
    expect(result).toBe(100);
  });

  it("should return -100 when balance is 0", () => {
    const balance = 0;
    const average = 1000;
    const result = calculatePercentageDifference(balance, average);
    expect(result).toBe(-100);
  });

  it("should return 0 when both balance and average are 0", () => {
    const balance = 0;
    const average = 0;
    const result = calculatePercentageDifference(balance, average);
    expect(result).toBe(0);
  });
});

describe("calculateBestBalance", () => {
  it("should return correct best balance", () => {
    const balances = [
      { date: "2023-08", balance: 1000 },
      { date: "2023-09", balance: 1200 },
      { date: "2023-10", balance: 900 },
      { date: "2023-11", balance: 1500 },
    ];
    const result = calculateBestBalance(balances);
    expect(result).toEqual({ date: "2023-11", balance: 1500 });
  });

  it("should return first when there is only one balance", () => {
    const balances = [{ date: "2023-08", balance: 1000 }];
    const result = calculateBestBalance(balances);
    expect(result).toEqual({ date: "2023-08", balance: 1000 });
  });

  it("should return first best balance when there are multiple same best balances", () => {
    const balances = [
      { date: "2023-08", balance: 1000 },
      { date: "2023-09", balance: 1000 },
      { date: "2023-10", balance: 1000 },
    ];

    const result = calculateBestBalance(balances);
    expect(result).toEqual({ date: "2023-08", balance: 1000 });
  });

  it("should return 0 for balance and no date, when there is no balances", () => {
    const balances = [];
    const result = calculateBestBalance(balances);
    expect(result).toEqual({ date: "", balance: 0 });
  });
});

describe("calculateWorstBalance", () => {
  it("should return correct worst balance", () => {
    const balances = [
      { date: "2023-08", balance: 1000 },
      { date: "2023-09", balance: 1200 },
      { date: "2023-10", balance: 900 },
      { date: "2023-11", balance: 1500 },
    ];
    const result = calculateWorstBalance(balances);
    expect(result).toEqual({ date: "2023-10", balance: 900 });
  });

  it("should return first when there is only one balance", () => {
    const balances = [{ date: "2023-08", balance: 1000 }];
    const result = calculateWorstBalance(balances);
    expect(result).toEqual({ date: "2023-08", balance: 1000 });
  });

  it("should return first best balance when there are multiple same best balances", () => {
    const balances = [
      { date: "2023-08", balance: 1000 },
      { date: "2023-09", balance: 1000 },
      { date: "2023-10", balance: 1000 },
    ];
    const result = calculateWorstBalance(balances);
    expect(result).toEqual({ date: "2023-08", balance: 1000 });
  });

  it("should return 0 for balance and no date, when there is no balances", () => {
    const balances = [];
    const result = calculateWorstBalance(balances);
    expect(result).toEqual({ date: "", balance: 0 });
  });
});
