export function calculatePercentage(current, previous) {
  if (!previous || previous === 0) return current > 0 ? 100 : 0;
  const diff = current - previous;
  return (diff / Math.abs(previous)) * 100;
}
