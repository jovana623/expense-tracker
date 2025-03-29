import { formatDate } from "./dateFunctions";

export function prepareData(saving, payments, today) {
  const goalAmount = parseFloat(saving.goal);
  const startedAt = new Date(saving.started_at);
  const targetDate = new Date(saving.target_date);
  const endDate = calculateEndDate(targetDate, today);

  const adjustedPayments = preparePayments(payments);
  const chartData = generateChartData(
    startedAt,
    goalAmount,
    adjustedPayments,
    endDate
  );

  return { chartData, endDate: formatDate(endDate) };
}

export function preparePayments(payments) {
  return payments
    .map((payment) => ({
      date: new Date(payment.date).getTime(),
      amount: parseFloat(payment.amount),
    }))
    .sort((a, b) => a.date - b.date);
}

export function generateChartData(startedAt, goalAmount, payments, endDate) {
  const chartData = [];
  let totalAmount = 0;

  chartData.push({
    date: formatDate(startedAt),
    total: totalAmount,
    goal: goalAmount,
  });

  payments.forEach((payment) => {
    totalAmount += payment.amount;
    chartData.push({
      date: formatDate(payment.date),
      total: totalAmount,
      goal: goalAmount,
    });
  });

  chartData.push({
    date: formatDate(endDate),
    total: totalAmount,
    goal: goalAmount,
  });

  return chartData;
}

export function calculateEndDate(targetDate, today) {
  return targetDate > today ? targetDate : today;
}
