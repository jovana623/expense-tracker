/*Sums transactions by month, in form monthYear,income,expenses */
export function sortByMonth(transactions) {
  if (!Array.isArray(transactions)) {
    throw new Error("Invalid input,expected array of transactions");
  }
  const monthlySummary = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const monthYear = date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
    const category = transaction.type.category.name;

    if (!monthlySummary[monthYear]) {
      monthlySummary[monthYear] = { income: 0, expenses: 0 };
    }

    if (category === "Income") {
      monthlySummary[monthYear].income += parseFloat(transaction.amount);
    } else if (category === "Expense") {
      monthlySummary[monthYear].expenses -= parseFloat(transaction.amount);
    }
  });

  const sortedSummary = Object.entries(monthlySummary)
    .map(([monthYear, { income, expenses }]) => ({
      monthYear,
      income,
      expenses,
    }))
    .sort((a, b) => {
      const dateA = new Date(a.monthYear);
      const dateB = new Date(b.monthYear);
      return dateA - dateB;
    });

  return sortedSummary;
}

/*Sums transactions for current month, in form day,income,expenses*/
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

/*Sums transactions for one month in form day,income,expenses,
second argument is month in form yyyy-mm*/
export function OneMonth(transactions, month) {
  const [year, monthIndex] = month.split("-").map(Number);
  const daysInMonth = new Date(year, monthIndex, 0).getDate();

  const dailySummary = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    income: 0,
    expenses: 0,
  }));

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const transactionMonth = date.getMonth() + 1;
    const transactionYear = date.getFullYear();

    if (transactionMonth === monthIndex && transactionYear === year) {
      const day = date.getDate();
      const category = transaction.type?.category?.name;
      const daySummary = dailySummary.find((d) => d.day === day);

      if (category === "Income") {
        daySummary.income += parseFloat(transaction.amount);
      } else if (category === "Expense") {
        daySummary.expenses -= parseFloat(transaction.amount);
      }
    }
  });
  return dailySummary;
}

/*Sum amount of given transactions*/
export function summary(transactions = []) {
  let total = 0;

  transactions.forEach((transaction) => {
    total += parseFloat(transaction.amount);
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

/*calculate balance by day for a single month*/
export function calculateDailyBalance(data) {
  return data.map((item) => ({
    day: item.day,
    balance: item.income - item.expenses,
  }));
}

/*calculate balance by month*/
export function calculateBalance(data) {
  return data.map((item) => ({
    monthYear: item.monthYear,
    balance: item.income - item.expenses,
  }));
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

export function monthySummary() {
  return [];
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
