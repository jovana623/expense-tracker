import { describe, it, expect } from "vitest";
import {
  calculateMonthlyPercentageChange,
  calculateTwoMonthsPercentageChange,
  calculateYearlyPercentageChange,
} from "./statistics";

describe("calculateMonthlyPercentageChange", () => {
  it("should return 100 when previous month total is 0 and current month total is greater than 0", () => {
    const transaction = [
      { date__year: 2024, date__month: 9, total: 0 },
      { date__year: 2024, date__month: 10, total: 200 },
    ];
    const result = calculateMonthlyPercentageChange(transaction);
    expect(result).toBe("100.00");
  });

  it("should return 0 when previous and current month total is 0", () => {
    const transactions = [
      { date__year: 2024, date__month: 9, total: 0 },
      { date__year: 2024, date__month: 10, total: 0 },
    ];
    const result = calculateMonthlyPercentageChange(transactions);
    expect(result).toBe(0);
  });

  it("should correctly calculate percentage increase", () => {
    const transactions = [
      { date__year: 2024, date__month: 9, total: 100 },
      { date__year: 2024, date__month: 10, total: 150 },
    ];
    const result = calculateMonthlyPercentageChange(transactions);
    expect(result).toBe("50.00");
  });

  it("should correctly calculate percentage decrease", () => {
    const transactions = [
      { date__year: 2024, date__month: 9, total: 200 },
      { date__year: 2024, date__month: 10, total: 100 },
    ];
    const result = calculateMonthlyPercentageChange(transactions);
    expect(result).toBe("-50.00");
  });
});

describe("calculateYearlyPercentageChange", () => {
  it("should return 100 when last year's total is 0 and this year's total is greater than 0", () => {
    const yearlyTransactions = [
      { date__year: 2023, total: 0 },
      { date__year: 2024, total: 1000 },
    ];
    const result = calculateYearlyPercentageChange(yearlyTransactions);
    expect(result).toBe(100.0);
  });

  it("should return 0 when both last year's total and current year's total are 0", () => {
    const yearlyTransactions = [
      { date__year: 2023, total: 0 },
      { date__year: 2024, total: 0 },
    ];
    const result = calculateYearlyPercentageChange(yearlyTransactions);
    expect(result).toBe(0);
  });

  it("should correctly calculate percentage increase", () => {
    const yearlyTransactions = [
      { date__year: 2023, total: 1000 },
      { date__year: 2024, total: 1500 },
    ];
    const result = calculateYearlyPercentageChange(yearlyTransactions);
    expect(result).toBe("50.00");
  });

  it("should correctly calculate percentage increase", () => {
    const yearlyTransactions = [
      { date__year: 2023, total: 2000 },
      { date__year: 2024, total: 1000 },
    ];
    const result = calculateYearlyPercentageChange(yearlyTransactions);
    expect(result).toBe("-50.00");
  });

  it("should return 0 when no data for last year is available and current year has no transactions", () => {
    const yearlyTransactions = [{ date__year: 2024, total: 0 }];
    const result = calculateYearlyPercentageChange(yearlyTransactions);
    expect(result).toBe(0);
  });

  it("should return 100 when last year's data is missing but current year has transactions", () => {
    const yearlyTransactions = [{ date__year: 2024, total: 1000 }];
    const result = calculateYearlyPercentageChange(yearlyTransactions);
    expect(result).toBe(100.0);
  });
});

describe("calculateTwoMonthsPercentageChange", () => {
  it("should return 0 when are no transactions provided", () => {
    const transactions = [];
    const result = calculateTwoMonthsPercentageChange(transactions, "2024-07");
    expect(result).toBe(0);
  });
});
