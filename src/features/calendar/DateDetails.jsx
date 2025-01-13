import { useContext } from "react";
import AddForm from "../../ui/AddForm";
import Table from "../../ui/Table";
import CreateTransactionForm from "../transactions/CreateTransactionForm";
import { ModalContext } from "../../ui/Modal";

/* eslint-disable react/prop-types */
function DateDetails({ data, date }) {
  console.log(date);
  const { close } = useContext(ModalContext);
  return (
    <div className="flex flex-col items-center gap-3">
      <Table data={data} />
      <AddForm title="transaction">
        <CreateTransactionForm />
      </AddForm> 
    </div>
  );
}

export default DateDetails;
