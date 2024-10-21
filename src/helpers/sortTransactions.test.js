import { describe, it, expect } from "vitest";
import { OneMonth, sortByMonth, summary } from "./sortTransactions";

describe("sortByMonth", () => {
  it("should return empty array for no transactions", () => {
    const transactions = [];
    const result = sortByMonth(transactions);
    expect(result).toEqual([]);
  });

  it("should summarize income and expense category correctly", () => {
    const transactions = [
      {
        date: "2024-01-15",
        type: { category: { name: "Income" } },
        amount: "1000",
      },
      {
        date: "2024-01-20",
        type: { category: { name: "Expense" } },
        amount: "200",
      },
      {
        date: "2024-02-05",
        type: { category: { name: "Income" } },
        amount: "500",
      },
      {
        date: "2024-02-10",
        type: { category: { name: "Expense" } },
        amount: "100",
      },
    ];
    const result = sortByMonth(transactions);
    expect(result).toEqual([
      { monthYear: "January 2024", income: 1000, expenses: -200 },
      { monthYear: "February 2024", income: 500, expenses: -100 },
    ]);
  });

  it("should handle transactions in the same month", () => {
    const transactions = [
      {
        date: "2024-01-05",
        type: { category: { name: "Income" } },
        amount: "300",
      },
      {
        date: "2024-01-10",
        type: { category: { name: "Expense" } },
        amount: "150",
      },
      {
        date: "2024-01-20",
        type: { category: { name: "Income" } },
        amount: "200",
      },
    ];
    const result = sortByMonth(transactions);
    expect(result).toEqual([
      { monthYear: "January 2024", income: 500, expenses: -150 },
    ]);
  });

  it("should handle transactions from different months", () => {
    const transactions = [
      {
        date: "2024-01-05",
        type: { category: { name: "Income" } },
        amount: "300",
      },
      {
        date: "2024-02-10",
        type: { category: { name: "Expense" } },
        amount: "150",
      },
    ];
    const result = sortByMonth(transactions);
    expect(result).toEqual([
      { monthYear: "January 2024", income: 300, expenses: 0 },
      { monthYear: "February 2024", income: 0, expenses: -150 },
    ]);
  });

  it("should ignore categories that are not income or expense", () => {
    const transactions = [
      {
        date: "2024-01-05",
        type: { category: { name: "Other" } },
        amount: "300",
      },
      {
        date: "2024-01-10",
        type: { category: { name: "Expense" } },
        amount: "150",
      },
    ];
    const result = sortByMonth(transactions);
    expect(result).toEqual([
      { monthYear: "January 2024", income: 0, expenses: -150 },
    ]);
  });

  it("should throw error for undefined transactions", () => {
    expect(() => sortByMonth(undefined)).toThrow(
      "Invalid input,expected array of transactions"
    );
  });
});

describe("OneMonth", () => {
  it("should return a array with correct number of days in and all values set to 0 when no transactions are given", () => {
    const result = OneMonth([], "2024-06");
    expect(result).toHaveLength(30);
    result.forEach((daySummary) => {
      expect(daySummary.income).toBe(0);
      expect(daySummary.expenses).toBe(0);
    });
  });

  it("should sum income and transactions for one month", () => {
    const transactions = [
      {
        date: "2024-08-05",
        amount: "100",
        type: { category: { name: "Income" } },
      },
      {
        date: "2024-08-05",
        amount: "50",
        type: { category: { name: "Expense" } },
      },
      {
        date: "2024-08-10",
        amount: "200",
        type: { category: { name: "Income" } },
      },
    ];
    const result = OneMonth(transactions, "2024-08");
    expect(result[4].income).toEqual(100);
    expect(result[4].expenses).toEqual(-50);

    expect(result[9].income).toEqual(200);
    expect(result[9].expenses).toEqual(0);
  });

  it("should ignore transactions from different months", () => {
    const transactions = [
      {
        date: "2024-07-05",
        amount: "100",
        type: { category: { name: "Income" } },
      },
      {
        date: "2024-08-10",
        amount: "150",
        type: { category: { name: "Income" } },
      },
    ];
    const result = OneMonth(transactions, "2024-08");
    expect(result[9].income).toBe(150);
    expect(result[4].income).toBe(0);
  });
});

describe("summary", () => {
  it("should return 0 when no transactions is provided", () => {
    const transactions = [];
    const result = summary(transactions);
    expect(result).toBe(0);
  });

  it("should correctly sum transactions amount", () => {
    const transactions = [
      { id: 1, amount: "100.00", date: "2024-07-10", saving: 2 },
      { id: 2, amount: "200.00", date: "2024-08-15", saving: 3 },
      { id: 3, amount: "50.00", date: "2024-09-10", saving: 4 },
    ];
    const result = summary(transactions);
    expect(result).toBe(350.0);
  });
});
