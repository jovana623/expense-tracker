/*calculate percentage difference between current 
and last month*/
export function calculateMonthlyPercentageChange(monthlyTransactions) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const currentMonthSummary = monthlyTransactions.find(
    (item) =>
      item.date__year === currentYear && item.date__month === currentMonth
  );

  let lastMonthSummary;

  if (currentMonth === 1) {
    lastMonthSummary = monthlyTransactions.find(
      (item) => item.date__year === currentYear - 1 && item.date__month === 12
    );
  } else {
    lastMonthSummary = monthlyTransactions.find(
      (item) =>
        item.date__year === currentYear && item.date__month === currentMonth - 1
    );
  }

  const currentTotal = currentMonthSummary ? currentMonthSummary.total : 0;
  const lastTotal = lastMonthSummary ? lastMonthSummary.total : 0;

  if (lastTotal === 0) {
    return currentTotal > 0 ? 100 : 0;
  }

  const diff = currentTotal - lastTotal;
  const percentageDiff = (diff / lastTotal) * 100;

  return percentageDiff.toFixed(2);
}

/*calculate percentage difference between current 
and last year*/
export function calculateYearlyPercentageChange(yearlyTransactions) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const currentYearSummary = yearlyTransactions.find(
    (item) => item.date__year === currentYear
  );
  const lastYearSummary = yearlyTransactions.find(
    (item) => item.date__year === currentYear - 1
  );

  const currentTotal = currentYearSummary ? currentYearSummary.total : 0;
  const lastTotal = lastYearSummary ? lastYearSummary.total : 0;

  if (lastTotal === 0) {
    return currentTotal > 0 ? 100 : 0;
  }

  const diff = currentTotal - lastTotal;
  const percentageDiff = (diff / lastTotal) * 100;

  return percentageDiff.toFixed(2);
}

/*calculate percentage difference between current  q
month and same month last year*/
export function calculateTwoMonthsPercentageChange(monthlyTransactions, date) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [year, month] = date.split("-").map(Number);

  const currentMonthSummary = monthlyTransactions.find(
    (item) =>
      item.date__year === currentYear && item.date__month === currentMonth
  );

  const lastMonthSummary = monthlyTransactions.find(
    (item) => item.date__year === year && item.date__month === month
  );

  const currentTotal = currentMonthSummary ? currentMonthSummary.total : 0;
  const lastTotal = lastMonthSummary ? lastMonthSummary.total : 0;

  if (lastTotal === 0) {
    return currentTotal > 0 ? -100 : 0;
  }

  const diff = lastTotal - currentTotal;
  const percentageDiff = (diff / lastTotal) * 100;

  return percentageDiff.toFixed(2);
}

export function calculateAverage(list) {
  if (list.length === 0) return 0;

  const totalAmount = list.reduce((acc, cur) => acc + cur.amount, 0);
  const averageAmount = totalAmount / list.length;

  return parseFloat(averageAmount.toFixed(2));
}

export function sortByAmount(list) {
  const sortedList = list.sort((a, b) => b.amount - a.amount);
  return sortedList;
}

export function getTransactionsByMonth(transactions, selectedMonth) {
  const [year, month] = selectedMonth.split("-").map(Number);

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionYear = new Date(transaction.date).getFullYear();
    const transactionMonth = new Date(transaction.date).getMonth() + 1;

    return transactionYear === year && transactionMonth === month;
  });

  return filteredTransactions;
}

export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
