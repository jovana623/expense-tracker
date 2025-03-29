import { getDaysInMonth } from "./dateFunctions";
import {
  groupTransactionsByMonth,
  initializeDailySummary,
  sortMonthlySummary,
  transactionsForMonth,
} from "./transactionHelpers";

/*Sums transactions by month, in form monthYear,income,expenses */
export function sortByMonth(transactions) {
  if (!Array.isArray(transactions)) {
    throw new Error("Invalid input,expected array of transactions");
  }

  const monthlySummary = groupTransactionsByMonth(transactions);
  return sortMonthlySummary(monthlySummary);
}

/*Sums transactions for selected month, in form day,income,expenses*/
export function sortMonthData(transactions, date) {
  const [year, month] = date.split("-");

  const numericYear = parseInt(year, 10); 
  const numericMonth = parseInt(month, 10);

  const daysInMonth = getDaysInMonth(numericYear, numericMonth);

  const dailySummary = initializeDailySummary(daysInMonth);

  return transactionsForMonth(
    transactions,
    dailySummary,
    numericMonth,
    numericYear
  );
}

/*Sum amount of given transactions*/
export function summary(transactions = []) {
  let total = 0;

  transactions.forEach((transaction) => {
    total += parseFloat(transaction.amount);
  });

  return total;
}

export function goalSummary(savings = []) {
  let total = 0;
  savings.forEach((saving) => {
    total += parseFloat(saving.goal);
  });
  return total;
}

/*Sum transactions by type, returns amount, color and typeName*/
export function summarizeAmountsByType(transactions) {
  const summary = {};

  if (!transactions || transactions.length === 0) {
    return [];
  }

  transactions.forEach((transaction) => {
    const typeName = transaction.type.name;
    const amount = parseFloat(transaction.amount);
    const color = transaction.type.color;

    if (!summary[typeName]) {
      summary[typeName] = { amount, color };
    } else {
      summary[typeName].amount += amount;
    }
  });

  const result = Object.keys(summary).map((typeName) => ({
    typeName,
    amount: summary[typeName].amount,
    color: summary[typeName].color,
  }));

  return result;
}

export function summarizeAmountsByCategory(transactions) {
  const incomeTransactions = transactions.filter(
    (transaction) => transaction.Type.name === "income"
  );
  const expensesTransactions = transactions.filter(
    (transaction) => transaction.Type.name === "expenses"
  );

  const totalIncome = incomeTransactions.reduce(
    (acc, transaction) => acc + transaction.Amount,
    0
  );
  const totalExpenses = expensesTransactions.reduce(
    (acc, transaction) => acc + transaction.Amount,
    0
  );
  return [
    { category: "Income", amount: totalIncome },
    { category: "Expenses", amount: totalExpenses },
  ];
}

export function calculateTotalAmount(savings) {
  const totalAmountSaved = savings.reduce((total, saving) => {
    return total + saving.amount;
  }, 0);

  return totalAmountSaved;
}

export function calculateTotalAmountSavings(savings) {
  const totalAmountSaved = savings.reduce((total, saving) => {
    return total + saving.Amount;
  }, 0);

  return totalAmountSaved;
}

export function findLargestIncomeAndExpense(data) {
  let biggestIncome = { amount: 0 };
  let biggestExpense = { amount: 0 };

  data.forEach((item) => {
    if (item.Type.category === "income" && item.amount > biggestIncome.amount) {
      biggestIncome = item;
    } else if (
      item.Type.category === "expense" &&
      item.amount > biggestExpense.amount
    ) {
      biggestExpense = item;
    }
  });

  return { biggestIncome, biggestExpense };
}
