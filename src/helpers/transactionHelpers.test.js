import { beforeEach, describe, expect, it } from "vitest";
import {
  groupTransactionsByMonth,
  sortMonthlySummary,
  transactionsForMonth,
} from "./transactionHelpers";

describe("transactionsForMonth", () => {
  let dailySummary;
  beforeEach(() => {
    dailySummary = [
      { day: 10, income: 0, expenses: 0 },
      { day: 15, income: 0, expenses: 0 },
    ];
  });
  it("should correctly summarize transactions for given month and year", () => {
    const transactions = [
      {
        date: "2025-03-10",
        amount: "100",
        type: { category: { name: "Income" } },
      },
      {
        date: "2025-03-10",
        amount: "50",
        type: { category: { name: "Expense" } },
      },
      {
        date: "2025-03-15",
        amount: "200",
        type: { category: { name: "Income" } },
      },
    ];

    const result = transactionsForMonth(transactions, dailySummary, 3, 2025);
    expect(result).toEqual([
      { day: 10, income: 100, expenses: -50 },
      { day: 15, income: 200, expenses: 0 },
    ]);
  });
  it("should ignore transaction outside given month and year", () => {
    const transactions = [
      {
        date: "2025-02-10",
        amount: "100",
        type: { category: { name: "Income" } },
      },
      {
        date: "2025-04-15",
        amount: "200",
        type: { category: { name: "Expense" } },
      },
    ];

    const result = transactionsForMonth(transactions, dailySummary, 3, 2025);

    expect(result).toEqual([
      { day: 10, income: 0, expenses: 0 },
      { day: 15, income: 0, expenses: 0 },
    ]);
  });
});

describe("groupTransactionsByMonth", () => {
  it("should correctly group transactions by month", () => {
    const transactions = [
      {
        date: "2025-01-10",
        amount: "100",
        type: { category: { name: "Income" } },
      },
      {
        date: "2025-01-20",
        amount: "50",
        type: { category: { name: "Expense" } },
      },
      {
        date: "2025-02-05",
        amount: "200",
        type: { category: { name: "Income" } },
      },
    ];
    const result = groupTransactionsByMonth(transactions);
    expect(result).toEqual({
      "Jan 2025": { income: 100, expenses: -50 },
      "Feb 2025": { income: 200, expenses: 0 },
    });
  });

  it("should handle when no transactions is passed", () => {
    const result = groupTransactionsByMonth([]);
    expect(result).toEqual({});
  });

  it("should handle invalid amount values", () => {
    const transactions = [
      {
        date: "2025-01-10",
        amount: "abc",
        type: { category: { name: "Income" } },
      },
      {
        date: "2025-01-20",
        amount: null,
        type: { category: { name: "Expense" } },
      },
    ];
    const result = groupTransactionsByMonth(transactions);
    expect(result).toEqual({ "Jan 2025": { income: 0, expenses: 0 } });
  });
});

describe("sortMonthlySummary", () => {
  it("should sort months in correct order", () => {
    const monthlySummary = {
      "March 2025": { income: 500, expenses: 200 },
      "January 2025": { income: 100, expenses: 50 },
      "February 2025": { income: 300, expenses: 100 },
    };
    const result = sortMonthlySummary(monthlySummary);
    expect(result).toEqual([
      { monthYear: "January 2025", income: 100, expenses: 50 },
      { monthYear: "February 2025", income: 300, expenses: 100 },
      { monthYear: "March 2025", income: 500, expenses: 200 },
    ]);
  });

  it("should return empty array if input is empty", () => {
    const result = sortMonthlySummary([]);
    expect(result).toEqual([]);
  });

  it("should handle when input has only one month", () => {
    const monthlySummary = {
      "April 2025": { income: 400, expenses: 150 },
    };
    const result = sortMonthlySummary(monthlySummary);
    expect(result).toEqual([
      { monthYear: "April 2025", income: 400, expenses: 150 },
    ]);
  });
});
