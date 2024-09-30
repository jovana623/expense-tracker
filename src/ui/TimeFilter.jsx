import Filter from "./Filter";

function TimeFilter() {
  return (
    <Filter
      field="time"
      options={[
        {
          value: "month",
          label: "Month",
        },
        {
          value: "year",
          label: "Year",
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
