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

export function getTimeAgo(createdAt, currentTime) {
  const createdDate = new Date(createdAt);
  const now = new Date(currentTime);

  const diff = now - createdDate;
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (diffDays > 7) {
    const day = createdDate.getDate().toString().padStart(2, "0");
    const month = (createdDate.getMonth() + 1).toString().padStart(2, "0");
    const year = createdDate.getFullYear();
    return `${day}/${month}/${year}`;
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  } else {
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  }
}
