import { formatDate } from "../helpers/dateFunctions";
import { BiSolidPencil } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "./Modal";
import CreateTransactionForm from "../features/transactions/CreateTransactionForm";
import ConfirmDelete from "./ConfirmDelete";
import { useDeleteTransaction } from "../features/transactions/useDeleteTransaction";
import Spinner from "./Spinner";
import Menu from "./Menu";

/* eslint-disable react/prop-types */
function TableRow({ transaction, arrow }) {
  const { id: transactionId, name, amount, Type, date } = transaction;

  const { deleteTransaction, isDeleting } = useDeleteTransaction();

  if (isDeleting) return <Spinner />;

  return (
    <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr_1.2fr_0.3fr] gap-3 mt-2 items-center py-2">
      <div className="text-green-500 w-5 h-5 justify-center">{arrow}</div>
      <div>{name}</div>
      <div>{amount}</div>
      <div>{Type["name"]}</div>
      <div className="justify-self-center">{formatDate(date)}</div>
      <div>
        <Modal>
          <Menu>
            <Menu.Toggle id={transactionId} />
            <Menu.List id={transactionId}>
              <Modal.OpenButton opens="update">
                <Menu.Button icon={<BiSolidPencil />}>Update</Menu.Button>
              </Modal.OpenButton>

              <Modal.OpenButton opens="delete">
                <Menu.Button icon={<AiOutlineDelete />}>Delete</Menu.Button>
              </Modal.OpenButton>
            </Menu.List>

            <Modal.Window name="update">
              <CreateTransactionForm transactionToUpdate={transaction} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                nameModal="transaction"
                onConfirm={() => deleteTransaction(transactionId)}
              />
            </Modal.Window>
          </Menu>
        </Modal>
      </div>
    </div>
  );
}

export default TableRow;
