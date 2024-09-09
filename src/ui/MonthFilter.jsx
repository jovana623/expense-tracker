import { useSearchParams } from "react-router-dom";

function MonthFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleMonthChange(value) {
    searchParams.set("month", value);
    setSearchParams(searchParams);
  }

  return (
    <div>
      <input
        type="month"
        onChange={(e) => handleMonthChange(e.target.value)}
        className="text-stone-500 bg-lightBg px-2 py-1 shadow rounded-md focus:outline-green-500"
      ></input>
    </div>
  );
}

export default MonthFilter;
