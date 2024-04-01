export function formatDate(date) {
  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString("en-GB", options);
}
