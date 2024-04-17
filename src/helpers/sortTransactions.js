import { getMonthName } from "./helpers";

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

export function monthySummary(transactions) {
  const monthlyData = {};

  transactions.forEach((transaction, index) => {
    if (!transaction.date) {
      console.error(`Transaction at index ${index} has no date property`);
      return;
    }

    const [year, month] = transaction.date.split("-");
    const monthYear = `${getMonthName(Number(month) - 1)} ${year}`;

    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = { month: monthYear, income: 0, expenses: 0 };
    }

    if (transaction.Type.category === "income") {
      monthlyData[monthYear].income += transaction.amount;
    } else if (
      transaction.Type.category === "expense" ||
      transaction.Type.category === "savings"
    ) {
      monthlyData[monthYear].expenses += transaction.amount;
    }
  });

  const data = Object.values(monthlyData);
  return data;
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

export function getCurrentMonthData(data) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

  const dailySummary = [];

  for (let day = 1; day <= daysInMonth; day++) {
    let income = 0;
    let expenses = 0;

    const transactionsForDay = data.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getFullYear() === currentYear &&
        transactionDate.getMonth() + 1 === currentMonth &&
        transactionDate.getDate() === day
      );
    });

    transactionsForDay.forEach((transaction) => {
      if (transaction.Type.category === "income") {
        income += transaction.amount;
      } else if (
        transaction.Type.category === "expense" ||
        transaction.Type.category === "savings"
      ) {
        expenses += transaction.amount;
      }
    });

    dailySummary.push({ day: day, income: income, expenses: expenses });
  }

  return dailySummary;
}
