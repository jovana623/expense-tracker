import { describe, it, expect } from "vitest";
import {
  sortByMonth,
  summarizeAmountsByType,
  summary,
  goalSummary,
  sortMonthData,
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
    ];
    const result = sortByMonth(transactions);
    expect(result).toEqual([
      { monthYear: "Jan 2024", income: 1000, expenses: -200 },
      { monthYear: "Feb 2024", income: 500, expenses: 0 },
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
    ];
    const result = sortByMonth(transactions);
    expect(result).toEqual([
      { monthYear: "Jan 2024", income: 300, expenses: -150 },
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
      { monthYear: "Jan 2024", income: 300, expenses: 0 },
      { monthYear: "Feb 2024", income: 0, expenses: -150 },
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
      { monthYear: "Jan 2024", income: 0, expenses: -150 },
    ]);
  });

  it("should throw error for undefined transactions", () => {
    expect(() => sortByMonth(undefined)).toThrow(
      "Invalid input,expected array of transactions"
    );
  });
});

describe("sortMonthData", () => {
  it("should return correct summary for month", () => {
    const transactions = [
      {
        date: "2025-03-15",
        amount: "200",
        type: { category: { name: "Income" } },
      },
    ];

    const result = sortMonthData(transactions, "2025-03");
    expect(result[14].income).toBe(200);
  });

  it("should handle empty transactions array", () => {
    const result = sortMonthData([], "2025-03");
    expect(result.every((day) => day.income === 0 && day.expenses === 0)).toBe(
      true
    );
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

describe("goalSummary", () => {
  it("should return 0 when there is no savings", () => {
    expect(goalSummary([])).toBe(0);
  });

  it("should correctly sum up the goal amounts", () => {
    const savings = [
      { id: 1, goal: "2100.00" },
      { id: 2, goal: "5000.00" },
      { id: 3, goal: "11000.00" },
      { id: 4, goal: "1250.00" },
    ];
    const result = goalSummary(savings);
    expect(result).toBe(19350);
  });
});
