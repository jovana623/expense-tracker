import { useSearchParams } from "react-router-dom";
import SortBy from "./SortBy";

function SortByTable() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSortChange(value) {
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  }

  return (
    <SortBy
      options={[
        { value: "date-desc", label: "Sort by date (new first)" },
        { value: "date-asc", label: "Sort by date (old first)" },
        { value: "amount-desc", label: "Sort by amount (high to low)" },
        { value: "amount-asc", label: "Sort by amount (low to high)" },
        { value: "name", label: "Sort by name" },
      ]}
      onChange={handleSortChange}
    />
  );
}

export default SortByTable;
