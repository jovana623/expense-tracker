import Table from "../../ui/Table";

/* eslint-disable react/prop-types */
function DateDetails({ data, currency }) {
  return (
    <div className="flex flex-col items-center gap-3 mt-3">
      <Table data={data} currency={currency} />
    </div>
  );
}

export default DateDetails;
