import { describe, it, expect } from "vitest";
import {
  OneMonth,
  sortByMonth,
  summarizeAmountsByType,
  summary,
  calculateDailyBalance,
  calculateBalance,
} from "./sortTransactions";

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

describe("summarizeAmountsByType", () => {
  it("should return empty array when no transaction is provided", () => {
    const result = summarizeAmountsByType([]);
    expect(result).toEqual([]);
  });

  it("should return summary with one transaction type", () => {
    const transactions = [
      {
        id: 1,
        name: "Salary",
        date: "2024-11-03",
        amount: "1821.54",
        type: {
          id: 1,
          name: "Salary",
          color: "#16a34a",
        },
        description: "November salary",
      },
    ];
    const result = summarizeAmountsByType(transactions);
    expect(result).toEqual([
      { typeName: "Salary", amount: 1821.54, color: "#16a34a" },
    ]);
  });

  it("should summarize multiple transaction of the same type", () => {
    const transactions = [
      {
        id: 1,
        name: "Salary",
        date: "2024-11-03",
        amount: "1821.54",
        type: {
          id: 1,
          name: "Salary",
          color: "#16a34a",
        },
        description: "November salary",
      },
      {
        id: 2,
        name: "Salary",
        date: "2024-10-01",
        amount: "1820.13",
        type: {
          id: 1,
          name: "Salary",
          color: "#16a34a",
        },
        description: "October salary",
      },
    ];
    const result = summarizeAmountsByType(transactions);
    expect(result).toEqual([
      { typeName: "Salary", amount: 3641.67, color: "#16a34a" },
    ]);
  });

  it("should summarize multiple transaction types", () => {
    const transactions = [
      {
        id: 1,
        name: "Salary",
        date: "2024-11-03",
        amount: "1821.54",
        type: {
          id: 1,
          name: "Salary",
          color: "#16a34a",
        },
        description: "November salary",
      },
      {
        id: 2,
        name: "Consulting",
        date: "2024-09-11",
        amount: "250.00",
        type: {
          id: 6,
          name: "Consulting fees",
          color: "#0f766e",
        },
        description: "Consulting fees",
      },
    ];
    const result = summarizeAmountsByType(transactions);
    expect(result).toEqual([
      { typeName: "Salary", amount: 1821.54, color: "#16a34a" },
      { typeName: "Consulting fees", amount: 250.0, color: "#0f766e" },
    ]);
  });
});

describe("calculateDailyBalance", () => {
  it("should calculate balance correctly for each day", () => {
    const transactions = [
      { day: 1, income: 100, expenses: 50 },
      { day: 2, income: 200, expenses: 100 },
    ];
    const result = calculateDailyBalance(transactions);
    expect(result).toEqual([
      { day: 1, balance: 50 },
      { day: 2, balance: 100 },
    ]);
  });
  it("should handle days with 0 income or expense", () => {
    const transactions = [
      { day: 1, income: 0, expenses: 50 },
      { day: 2, income: 200, expenses: 0 },
    ];
    const result = calculateDailyBalance(transactions);
    expect(result).toEqual([
      { day: 1, balance: -50 },
      { day: 2, balance: 200 },
    ]);
  });
  it("should handle no data", () => {
    const transactions = [];
    const result = calculateDailyBalance(transactions);
    expect(result).toEqual([]);
  });
});

describe("calculateBalance", () => {
  it("should calculate balance correctly for each month", () => {
    const transactions = [
      { monthYear: "May 2024", income: 4570, expenses: -2804.75 },
      { monthYear: "June 2024", income: 2460.26, expenses: -1494.31 },
    ];
    const result = calculateBalance(transactions);
    expect(result).toEqual([
      { monthYear: "May 2024", balance: 7374.75 },
      { monthYear: "June 2024", balance: 3954.57 },
    ]);
  });

  it("should handle no data", () => {
    const transactions = [];
    const result = calculateBalance(transactions);
    expect(result).toEqual([]);
  });

  it("should handle months with 0 income or expense", () => {
    const transactions = [
      { monthYear: "December 2024", income: -100, expenses: -200 },
      { monthYear: "January 2025", income: -300, expenses: -400 },
    ];
    const result = calculateBalance(transactions);
    expect(result).toEqual([
      { monthYear: "December 2024", balance: 100 },
      { monthYear: "January 2025", balance: 100 },
    ]);
  });
});
