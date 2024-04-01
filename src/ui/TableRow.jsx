import { formatDate } from "../helpers/dateFunctions";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSolidPencil } from "react-icons/bi";
import Modal from "./Modal";
import CreateTransactionForm from "../features/header/CreateTransactionForm";

/* eslint-disable react/prop-types */
function TableRow({ transaction, arrow }) {
  const { Name, Amount, Type, Date } = transaction;

  return (
    <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr_1.2fr_0.3fr] gap-3 mt-2 items-center py-2">
      <div className="text-green-500 w-5 h-5 justify-center">{arrow}</div>
      <div>{Name}</div>
      <div>{Amount}</div>
      <div>{Type["Name"]}</div>
      <div className="justify-self-center">{formatDate(Date)}</div>
      <div className="flex">
        <BsThreeDotsVertical />
        <Modal>
          <Modal.OpenButton opens="update">
            <button>
              <BiSolidPencil />
            </button>
          </Modal.OpenButton>
          <Modal.Window name="update">
            <CreateTransactionForm transactionToUpdate={transaction} />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

export default TableRow;
