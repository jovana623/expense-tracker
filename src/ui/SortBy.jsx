import { useSearchParams } from "react-router-dom";

/* eslint-disable react/prop-types */
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <select
      onChange={handleChange}
      className="border border-stone-200 focus:outline-green-500 rounded-md h-8"
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
