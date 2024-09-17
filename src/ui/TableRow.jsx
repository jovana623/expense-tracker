import { formatDate } from "../helpers/dateFunctions";

import { BiSolidPencil } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { FiArrowUpRight } from "react-icons/fi";
import { FiArrowDownLeft } from "react-icons/fi";

import Modal from "./Modal";
import ConfirmDelete from "./ConfirmDelete";
import Spinner from "./Spinner";
import Menu from "./Menu";
import CreateTransactionForm from "../features/transactions/CreateTransactionForm";

import { useLocation } from "react-router-dom";
import { useDeleteTransaction } from "../features/transactions/useDeleteTransaction";

/* eslint-disable react/prop-types */
function TableRow({ transaction }) {
  const {
    id: transactionId,
    name,
    amount,
    type,
    date,
    description,
  } = transaction;
  const { deleteTransaction, isLoading } = useDeleteTransaction();
  const location = useLocation();
  const isTransactionsPath = location.pathname === "/transactions";
  const category = type.category.name;

  if (isLoading) return <Spinner />;

  return (
    <div
      className={`grid  ${
        isTransactionsPath
          ? "grid-cols-[0.5fr_1.5fr_1fr_1fr_2fr_1.2fr_0.3fr]"
          : "grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr_0.3fr]"
      } gap-3 items-center bg-lightBg h-14 mx-2 border-t-[1px] border-gray-200`}
    >
      <div
        className={` w-5 h-5 justify-self-center text-xl ${
          category === "Income" ? "text-green-500" : "text-red-500"
        }`}
      >
        {category === "Income" ? <FiArrowDownLeft /> : <FiArrowUpRight />}
      </div>
      <div>{name}</div>
      <div className="justufy-self-center">{amount.toLocaleString()}&euro;</div>
      <div>{type.name}</div>
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
              {category === "Income" ? (
                <ConfirmDelete
                  nameModal="income"
                  onConfirm={() => deleteTransaction(transactionId)}
                />
              ) : category === "savings" ? (
                "Delete saving payment in savings"
              ) : (
                <ConfirmDelete
                  nameModal="expense"
                  onConfirm={() => deleteTransaction(transactionId)}
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
