import Filter from "./Filter";

function TimeFilter() {
  return (
    <Filter
      field="time"
      options={[
        {
          value: "month",
          label: "This month",
        },
        {
          value: "year",
          label: "This year",
        },
        {
          value: "all",
          label: "All",
        },
      ]}
    />
  );
}

export default TimeFilter;
