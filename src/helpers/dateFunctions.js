/*Returns date in format 10 Jan 2025*/
export function formatDate(date) {
  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString("en-GB", options);
}

export function formatMonthYear(date) {
  const options = { month: "short", year: "numeric" };
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString("en-GB", options);
}

export function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

//Days left
export function calculateDaysLeft(startDate, endDateStr) {
  const [year, month, day] = endDateStr.split("-").map(Number);
  const endDate = new Date(year, month - 1, day);

  const startMillis = startDate.getTime();
  const endMillis = endDate.getTime();

  const difference = endMillis - startMillis;

  let daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));

  if (Object.is(daysLeft, -0)) {
    daysLeft = 0;
  }

  return daysLeft;
}

export function getCurrentMonthAndYear() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  return `${year}-${month}`;
}
