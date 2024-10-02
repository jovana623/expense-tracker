import Table from "../../ui/Table";
import AddTransaction from "../transactions/AddTransaction";

/* eslint-disable react/prop-types */
function DateDetails({ data, date }) {
  console.log(date);
  return (
    <div className="flex flex-col items-center gap-3">
      <Table data={data} />
      <AddTransaction />
    </div>
  );
}

export default DateDetails;
