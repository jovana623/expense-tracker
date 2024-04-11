import { getMonthName } from "./helpers";

export function summarizeAmountsByCategory(transactions) {
  const incomeTransactions = transactions.filter(
    (transaction) => transaction.Categories.Name === "Income"
  );
  const expensesTransactions = transactions.filter(
    (transaction) => transaction.Categories.Name === "Expenses"
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

export function summarizeAmountsByType(data) {
  const summary = {};

  data.forEach((entry) => {
    const typeName = entry.Type.name;
    const amount = entry.amount;
    const color = entry.Type.color;

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

//summary of income and expenses for every month
export function monthySummary(transactions) {
  const monthlyData = {};

  transactions.forEach((transaction) => {
    const [year, month] = transaction.Date.split("-"); // Splitting date correctly
    const monthYear = `${getMonthName(Number(month) - 1)} ${year}`;

    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = { month: monthYear, income: 0, expenses: 0 };
    }

    // Check transaction type based on the "Name" field
    if (transaction.CategoryId === 1) {
      monthlyData[monthYear].income += transaction.Amount;
    } else if (transaction.CategoryId === 2) {
      monthlyData[monthYear].expenses += transaction.Amount;
    }
  });

  const data = Object.values(monthlyData);
  return data;
}

export function calculateTotalAmount(savings) {
  // Use reduce to sum up the amounts
  const totalAmountSaved = savings.reduce((total, saving) => {
    return total + saving.amount;
  }, 0);

  return totalAmountSaved;
}

export function calculateTotalAmountSavings(savings) {
  // Use reduce to sum up the amounts
  const totalAmountSaved = savings.reduce((total, saving) => {
    return total + saving.Amount;
  }, 0);

  return totalAmountSaved;
}
