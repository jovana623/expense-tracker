export function calculateAverageBalance(balances) {
  if (balances.length === 0) return 0;
  const totalBalance = balances.reduce((sum, item) => sum + item.balance, 0);
  const averageBalance = totalBalance / balances.length;
  return averageBalance;
}

export function calculatePercentageDifference(balance, average) {
  if (average === 0 && balance === 0) return 0;
  if (average === 0) return 100;
  if (balance === 0) return -100;
  return ((balance - average) / average) * 100;
}

export function calculateBestBalance(balance) {
  if (balance.length === 0) return { date: "", balance: 0 };
  const bestBalance = balance.reduce(
    (best, current) => (current.balance > best.balance ? current : best),
    balance[0]
  );

  return bestBalance;
}

export function calculateWorstBalance(balance) {
  if (balance.length === 0) return { date: "", balance: 0 };
  const worstBalance = balance.reduce(
    (worst, current) => (current.balance < worst.balance ? current : worst),
    balance[0]
  );

  return worstBalance;
}
