import { getMonthName } from "./helpers";

export function summarizeAmountsByCategory(data) {
  const summary = {};

  data.forEach((entry) => {
    const CategoryId = entry.CategoryId;
    const amount = entry.Amount;

    if (!summary[CategoryId]) {
      summary[CategoryId] = amount;
    } else {
      summary[CategoryId] += amount;
    }
  });

  const result = Object.keys(summary).map((CategoryId) => ({
    CategoryId: CategoryId,
    amount: summary[CategoryId],
  }));

  return result;
}

export function summarizeAmountsByType(data) {
  const summary = {};

  data.forEach((entry) => {
    const typeName = entry.Type.Name;
    const amount = entry.Amount;
    const color = entry.Type.Color;

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

export function calculateTotalAmountSaved(savings) {
  // Use reduce to sum up the amounts
  const totalAmountSaved = savings.reduce((total, saving) => {
    return total + saving.Amount;
  }, 0);

  return totalAmountSaved;
}
