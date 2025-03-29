import { formatMonthYear } from "./dateFunctions";

export function initializeDailySummary(daysInMonth) {
  return Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    income: 0,
    expenses: 0,
  }));
}

export function transactionsForMonth(transactions, dailySummary, month, year) {
  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const transactionMonth = date.getMonth() + 1;
    const transactionYear = date.getFullYear();

    if (transactionMonth === month && transactionYear === year) {
      const day = date.getDate();
      const category = transaction.type?.category?.name;

      const daySummary = dailySummary.find((d) => d.day === day);

      if (category === "Income") {
        daySummary.income += parseFloat(transaction.amount);
      } else daySummary.expenses -= parseFloat(transaction.amount);
    }
  });
  return dailySummary;
}

export function groupTransactionsByMonth(transactions) {
  return transactions.reduce((summary, transaction) => {
    const monthYear = formatMonthYear(transaction.date);
    const category = transaction?.type?.category?.name;
    const amount = parseFloat(transaction.amount);

    if (!summary[monthYear]) {
      summary[monthYear] = { income: 0, expenses: 0 };
    }
    if (!isNaN(amount))
      updateMonthlySummary(summary[monthYear], category, transaction.amount);
    return summary;
  }, {});
}

function updateMonthlySummary(summary, category, amount) {
  if (category === "Income") summary.income += parseFloat(amount);
  else if (category === "Expense") summary.expenses -= parseFloat(amount);
}

export function sortMonthlySummary(monthlySummary) {
  return Object.entries(monthlySummary)
    .map(([monthYear, summary]) => ({
      monthYear,
      income: summary.income,
      expenses: summary.expenses,
    }))
    .sort((a, b) => {
      return new Date("1 " + a.monthYear) - new Date("1 " + b.monthYear);
    });
}
