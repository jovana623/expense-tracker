import { FiArrowUpRight } from "react-icons/fi";
import { FiArrowDownLeft } from "react-icons/fi";
import { TbListDetails } from "react-icons/tb";
import { BiSolidPencil } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useDeleteTransaction } from "../features/transactions/useDeleteTransaction";
import { formatDate } from "../helpers/dateFunctions";
import { getCurrencyEntity } from "../helpers/currencyFunctions";

import Modal from "./Modal";
import Menu from "./Menu";
import CreateTransactionForm from "../features/transactions/CreateTransactionForm";
import ConfirmDelete from "./ConfirmDelete";
import TransactionDetails from "../features/transactions/TransactionDetails";
import TableSkeleton from "./TableSkeleton";

/* eslint-disable react/prop-types */
function Table({ data, isLoading, currency }) {
  const { deleteTransaction } = useDeleteTransaction();

  const isTransactionsPath = location.pathname === "/transactions";
  const isReportPage = location.pathname.includes("/report");
  const isCalendarPath = location.pathname === "/calendar";
  const formattedCurrency = getCurrencyEntity(currency);

  function shortDescription(desc) {
    const words = desc.split(" ");
    return words.length > 5 ? `${words.slice(0, 5).join(" ")}...` : desc;
  }

  function shortName(name) {
    const words = name.split(" ");
    return words.length > 3 ? `${words.slice(0, 5).join(" ")}...` : name;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right dark:bg-gray-700 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:border-stone-600 dark:text-lightBg">
          <tr>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            {isTransactionsPath || isReportPage ? (
              <th scope="col" className="px-6 py-3">
                Type
              </th>
            ) : (
              <div></div>
            )}

            {isTransactionsPath || isReportPage ? (
              <th scope="col" className="px-6 py-3">
                Description
              </th>
            ) : (
              <div></div>
            )}

            <th scope="col" className="px-6 py-3">
              Date
            </th>
          </tr>
        </thead>
        {isLoading ? (
          <tbody>
            <tr>
              <td colSpan="6">
                <TableSkeleton rows={5} />
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-50 border-b dark:even:bg-gray-700 dark:odd:bg-gray-700 dark:border-stone-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {item.type.category.name === "Income" ? (
                    <div className="text-green-500">
                      <FiArrowDownLeft />
                    </div>
                  ) : (
                    <div className="text-red-500">
                      <FiArrowUpRight />
                    </div>
                  )}
                </th>

                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-lightBg"
                >
                  {shortName(item.name)}
                </th>
                <th className="px-6 py-4 dark:text-white">
                  {item.amount.toLocaleString()}
                  {formattedCurrency}
                </th>
                {isTransactionsPath || isReportPage ? (
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-300"
                  >
                    {item.type.name}
                  </th>
                ) : (
                  <div></div>
                )}

                {isTransactionsPath || isReportPage ? (
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-300"
                  >
                    {shortDescription(item.description)}
                  </th>
                ) : (
                  <div></div>
                )}
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-lightBg"
                >
                  {formatDate(item.date)}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {isReportPage || isCalendarPath ? (
                    <div></div>
                  ) : (
                    <Modal>
                      <Menu>
                        <Menu.Toggle id={item.id} />
                        <Menu.List id={item.id}>
                          {item.type.name === "Savings" ? (
                            <button
                              title="Can't update saving in transaction table"
                              disabled="True"
                              className="flex items-center justify-center gap-2 px-2 py-1 border-b border-stone-200 text-stone-500"
                            >
                              <BiSolidPencil /> Update
                            </button>
                          ) : (
                            <Modal.OpenButton opens="update">
                              <Menu.Button icon={<BiSolidPencil />}>
                                Update
                              </Menu.Button>
                            </Modal.OpenButton>
                          )}
                          {item.type.name === "Savings" ? (
                            <button
                              title="Can't delete saving in transaction table"
                              disabled="True"
                              className="flex items-center justify-center gap-2 px-2 py-1 border-b border-stone-200 text-stone-500"
                            >
                              <AiOutlineDelete /> Delete
                            </button>
                          ) : (
                            <Modal.OpenButton opens="delete">
                              <Menu.Button icon={<AiOutlineDelete />}>
                                Delete
                              </Menu.Button>
                            </Modal.OpenButton>
                          )}
                          <Modal.OpenButton opens="details">
                            <Menu.Button icon={<TbListDetails />}>
                              Details
                            </Menu.Button>
                          </Modal.OpenButton>
                        </Menu.List>

                        <Modal.Window name="update">
                          <CreateTransactionForm transactionToUpdate={item} />
                        </Modal.Window>

                        <Modal.Window name="delete">
                          {item.type.category.name === "Income" ? (
                            <ConfirmDelete
                              nameModal="income"
                              onConfirm={() => deleteTransaction(item.id)}
                            />
                          ) : (
                            <ConfirmDelete
                              nameModal="expense"
                              onConfirm={() => deleteTransaction(item.id)}
                            />
                          )}
                        </Modal.Window>
                        <Modal.Window name="details">
                          <TransactionDetails
                            item={item}
                            currency={formattedCurrency}
                          />
                        </Modal.Window>
                      </Menu>
                    </Modal>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default Table;
