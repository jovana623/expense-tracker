import { formatDate } from "../helpers/dateFunctions";
import { BiSolidPencil } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "./Modal";
import ConfirmDelete from "./ConfirmDelete";
import Spinner from "./Spinner";
import Menu from "./Menu";
import { useDeleteIncome } from "../features/income/useDeleteIncome";
import { useDeleteExpense } from "../features/expenses/useDeleteExpense";
import CreateTransactionForm from "./CreateTransactionForm";
import { FiArrowUpRight } from "react-icons/fi";
import { FiArrowDownLeft } from "react-icons/fi";
import { useLocation } from "react-router-dom";

/* eslint-disable react/prop-types */
function TableRow({ transaction }) {
  const {
    id: transactionId,
    name,
    amount,
    Type,
    date,
    description,
  } = transaction;
  const { deleteIncome, isLoading: isDeletingIncome } = useDeleteIncome();
  const { deleteExpense, isLoading: isDeletingExpense } = useDeleteExpense();
  const location = useLocation();
  const isTransactionsPath = location.pathname === "/transactions";

  if (isDeletingIncome || isDeletingExpense) return <Spinner />;

  return (
    <div
      className={`grid  ${
        isTransactionsPath
          ? "grid-cols-[0.5fr_1.5fr_1fr_1fr_2fr_1.2fr_0.3fr]"
          : "grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr_0.3fr]"
      } gap-3 my-2 items-center bg-lightBg shadow rounded-md h-14 mx-2 hover:shadow-md hover:cursor-pointer`}
    >
      <div
        className={` w-5 h-5 justify-self-center text-xl ${
          Type.category === "income" ? "text-green-500" : "text-red-500"
        }`}
      >
        {Type.category === "income" ? <FiArrowDownLeft /> : <FiArrowUpRight />}
      </div>
      <div>{name}</div>
      <div className="justufy-self-center">{amount.toLocaleString()}&euro;</div>
      <div>{Type["name"]}</div>
      {isTransactionsPath ? (
        <div className="justify-self-center">{description}</div>
      ) : (
        ""
      )}
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
              {Type.category === "income" ? (
                <ConfirmDelete
                  nameModal="income"
                  onConfirm={() => deleteIncome(transactionId)}
                />
              ) : transaction.Type.category === "savings" ? (
                "Delete saving payment in savings"
              ) : (
                <ConfirmDelete
                  nameModal="expense"
                  onConfirm={() => deleteExpense(transactionId)}
                />
              )}
            </Modal.Window>
          </Menu>
        </Modal>
      </div>
    </div>
  );
}

export default TableRow;
