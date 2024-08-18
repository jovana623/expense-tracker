import { getMonthName } from "./helpers";

export function sortByMonth(transactions) {
  const monthlySummary = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const month = date.toLocaleString("default", { month: "long" });
    const category = transaction.type.category;

    if (!monthlySummary[month]) {
      monthlySummary[month] = { income: 0, expenses: 0 };
    }

    if (category === "Income") {
      monthlySummary[month].income += parseFloat(transaction.amount);
    } else {
      monthlySummary[month].expenses -= parseFloat(transaction.amount);
    }
  });
  return Object.entries(monthlySummary).map(
    ([month, { income, expenses }]) => ({
      month,
      income,
      expenses,
    })
  );
}

export function getCurrentMonthData(transactions) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const dailySummary = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    income: 0,
    expenses: 0,
  }));

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const transactionMonth = date.getMonth();
    const transactionYear = date.getFullYear();

    if (transactionMonth === currentMonth && transactionYear === currentYear) {
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
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthlyData = {};

  let minYear = Infinity;
  let maxYear = -Infinity;
  let minMonth = 12;
  let maxMonth = 1;

  transactions.forEach((transaction, index) => {
    if (!transaction.date) {
      console.error(`Transaction at index ${index} has no date property`);
      return;
    }

    const [year, month] = transaction.date.split("-");
    const monthYear = `${year}-${month}`;

    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = {
        month: `${getMonthName(Number(month) - 1)} ${year}`,
        income: 0,
        expenses: 0,
      };
    }

    if (transaction.Type.category === "income") {
      monthlyData[monthYear].income += transaction.amount;
    } else if (
      transaction.Type.category === "expense" ||
      transaction.Type.category === "savings"
    ) {
      monthlyData[monthYear].expenses += transaction.amount;
    }

    const numericYear = Number(year);
    const numericMonth = Number(month);
    if (
      numericYear < minYear ||
      (numericYear === minYear && numericMonth < minMonth)
    ) {
      minYear = numericYear;
      minMonth = numericMonth;
    }
    if (
      numericYear > maxYear ||
      (numericYear === maxYear && numericMonth > maxMonth)
    ) {
      maxYear = numericYear;
      maxMonth = numericMonth;
    }
  });

  for (let year = minYear; year <= maxYear; year++) {
    for (let month = 1; month <= 12; month++) {
      const monthYear = `${year}-${month.toString().padStart(2, "0")}`;
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = {
          month: `${getMonthName(month - 1)} ${year}`,
          income: 0,
          expenses: 0,
        };
      }
    }
  }

  const sortedData = Object.values(monthlyData).sort((a, b) => {
    const [yearA, monthA] = a.month.split(" ");
    const [yearB, monthB] = b.month.split(" ");

    if (yearA !== yearB) {
      return Number(yearA) - Number(yearB);
    } else {
      return monthNames.indexOf(monthA) - monthNames.indexOf(monthB);
    }
  });

  return sortedData;
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

export function calculateBalance(data) {
  return data.map((item) => ({
    month: item.month,
    balance: item.income - item.expenses,
  }));
}

export function calculateDailyBalance(data) {
  return data.map((item) => ({
    day: item.day,
    balance: item.income - item.expenses,
  }));
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
