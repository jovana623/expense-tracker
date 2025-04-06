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
        className="text-stone-500 bg-lightBg px-2 py-1 shadow rounded-md focus:outline-green-500 dark:bg-gray-700 dark:text-lightBg dark:focus:outline-green-500"
      />
    </div>
  );
}

export default MonthFilter;
