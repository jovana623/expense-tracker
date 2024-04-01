import { formatDate } from "../helpers/dateFunctions";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSolidPencil } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "./Modal";
import CreateTransactionForm from "../features/transactions/CreateTransactionForm";
import ConfirmDelete from "./ConfirmDelete";
import { useDeleteTransaction } from "../features/transactions/useDeleteTransaction";
import Spinner from "./Spinner";

/* eslint-disable react/prop-types */
function TableRow({ transaction, arrow }) {
  const { id: transactionId, Name, Amount, Type, Date } = transaction;

  const { deleteTransaction, isDeleting } = useDeleteTransaction();

  if (isDeleting) return <Spinner />;

  return (
    <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr_1.2fr_0.3fr] gap-3 mt-2 items-center py-2">
      <div className="text-green-500 w-5 h-5 justify-center">{arrow}</div>
      <div>{Name}</div>
      <div>{Amount}</div>
      <div>{Type["Name"]}</div>
      <div className="justify-self-center">{formatDate(Date)}</div>
      <div className="flex items-center gap-2">
        <button>
          <BsThreeDotsVertical />
        </button>
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
        <Modal>
          <Modal.OpenButton opens="delete">
            <button>
              <AiOutlineDelete />
            </button>
          </Modal.OpenButton>
          <Modal.Window name="delete">
            <ConfirmDelete
              nameModal="transaction"
              onConfirm={() => deleteTransaction(transactionId)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

export default TableRow;
