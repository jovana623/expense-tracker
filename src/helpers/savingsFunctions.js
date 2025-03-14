export function prepareData(saving, payments) {
  const chartData = [];
  const goalAmount = parseFloat(saving.goal);
  const startedAt = new Date(saving.started_at);
  const targetDate = new Date(saving.target_date);
  const today = new Date();
  const endDate = targetDate > today ? targetDate : today;

  const adjustedPayments = payments.map((payment) => ({
    date: new Date(payment.date).getTime(),
    amount: parseFloat(payment.amount),
  }));

  adjustedPayments.sort((a, b) => a.date - b.date);

  let totalAmount = 0;

  chartData.push({
    date: startedAt.toLocaleDateString(),
    total: totalAmount,
    goal: goalAmount,
  });

  adjustedPayments.forEach((payment) => {
    totalAmount += payment.amount;
    chartData.push({
      date: new Date(payment.date).toLocaleDateString(),
      total: totalAmount,
      goal: goalAmount,
    });
  });

  chartData.push({
    date: endDate.toLocaleDateString(),
    total: totalAmount,
    goal: goalAmount,
  });

  return { chartData, endDate: endDate.toLocaleDateString() };
}
