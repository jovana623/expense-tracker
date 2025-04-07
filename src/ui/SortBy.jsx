import { useSearchParams } from "react-router-dom";

/* eslint-disable react/prop-types */
function SortBy({ options, onChange }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
    if (onChange) onChange(e.target.value);
  }

  return (
    <select
      onChange={handleChange}
      className="px-3 py-2 rounded-md shadow-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:border-stone-600 dark:text-gray-200"
    >
      {options.map((item) => (
        <option value={item.value} key={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}

export default SortBy;
