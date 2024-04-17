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
