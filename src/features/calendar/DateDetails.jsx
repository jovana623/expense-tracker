import Table from "../../ui/Table";

/* eslint-disable react/prop-types */
function DateDetails({ data, date }) {
  console.log(date);
  return (
    <div className="flex flex-col items-center gap-3 w-20%">
      <Table data={data} />
    </div>
  );
}

export default DateDetails;
