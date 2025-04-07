import { useSearchParams } from "react-router-dom";

function MonthFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const month = searchParams.get("month") || "";

  function handleMonthChange(value) {
    searchParams.set("month", value);
    searchParams.delete("time");
    setSearchParams(searchParams);
  }

  return (
    <div>
      <input
        type="month"
        onChange={(e) => handleMonthChange(e.target.value)}
        value={month}
        role="textbox"
        className="sm:px-3 sm:py-2 px-1 py-1 rounded-md shadow-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:border-stone-600 dark:text-gray-200"
      />
    </div>
  );
}

export default MonthFilter;
