import SortBy from "./SortBy";

function SortByTable() {
  return (
    <SortBy
      options={[
        { value: "name", label: "Sort by name" },
        { value: "amount-desc", label: "Sort by amount (high to low)" },
        { value: "amount-asc", label: "Sort by amount (low to high)" },
        { value: "date-desc", label: "Sort by amount (new first)" },
        { value: "date-asc", label: "Sort by amount (old first)" },
      ]}
    />
  );
}

export default SortByTable;
