import {
  endOfMonth,
  endOfYear,
  isWithinInterval,
  parseISO,
  startOfMonth,
  startOfYear,
} from "date-fns";

export function getTransactionsThisMonth(transactions) {
  const currentDate = new Date();
  const startOfCurrentMonth = startOfMonth(currentDate);
  const endOfCurrentMonth = endOfMonth(currentDate);

  return transactions.filter((transaction) => {
    const transactionDate = parseISO(transaction.date);
    return isWithinInterval(transactionDate, {
      start: startOfCurrentMonth,
      end: endOfCurrentMonth,
    });
  });
}

export function getTransactionsThisYear(transactions) {
  const currentDate = new Date();
  const startOfCurrentYear = startOfYear(currentDate);
  const endOfCurrentYear = endOfYear(currentDate);

  return transactions.filter((transaction) => {
    const transactionDate = parseISO(transaction.date);
    return isWithinInterval(transactionDate, {
      start: startOfCurrentYear,
      end: endOfCurrentYear,
    });
  });
}
