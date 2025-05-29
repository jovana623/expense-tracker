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

  // Original shortName function from your code
  function shortName(name) {
    const words = name.split(" ");
    return words.length > 3 ? `${words.slice(0, 5).join(" ")}...` : name;
  }

  // Define base cell classes for tbody to maintain consistent background
  const tbodyCellBaseClasses = "odd:bg-white even:bg-gray-50 dark:bg-gray-700"; // Handles original tr colors

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        {" "}
        {/* Removed dark:bg-gray-700 from table, cells will handle it */}
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:border-stone-600 dark:text-lightBg">
          <tr>
            <th
              scope="col"
              // Responsive width for 1st column, responsive left offset for 2nd
              className="px-6 py-3 sticky left-0 z-20 bg-gray-50 dark:bg-gray-700 w-12 sm:w-16"
            ></th>
            <th
              scope="col"
              className="px-6 py-3 sticky left-12 sm:left-16 z-20 bg-gray-50 dark:bg-gray-700"
            >
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            {isTransactionsPath || isReportPage ? (
              <th scope="col" className="px-6 py-3">
                Type
              </th>
            ) : null}
            {isTransactionsPath || isReportPage ? (
              <th scope="col" className="px-6 py-3">
                Description
              </th>
            ) : null}

            <th scope="col" className="px-6 py-3">
              Date
            </th>
            {/* Actions column header - present if actions are in body */}
            {!isReportPage &&
              !isCalendarPath && ( // Simplified condition: show if not report/calendar
                <th scope="col" className="px-6 py-3">
                  {/* Actions (can be empty) */}
                </th>
              )}
          </tr>
        </thead>
        {isLoading ? (
          <tbody>
            <tr>
              {/* Adjust colspan dynamically based on visible columns in header */}
              <td
                colSpan={
                  3 + // Icon, Name, Amount
                  (isTransactionsPath || isReportPage ? 2 : 0) + // Type & Description
                  1 + // Date
                  (!isReportPage && !isCalendarPath ? 1 : 0) // Actions
                }
              >
                <TableSkeleton rows={5} />
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {data.map(
              (
                item // Removed index as key if item.id is unique and available
              ) => (
                <tr
                  key={item.id || item.name} // Prefer item.id if available and unique
                  className="border-b dark:border-stone-600" // Base row styles
                >
                  {/* Sticky Icon Column */}
                  <th
                    scope="row"
                    className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap sticky left-0 z-10 w-12 sm:w-16 ${tbodyCellBaseClasses}`}
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

                  {/* Sticky Name Column */}
                  <th
                    scope="row"
                    className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-lightBg sticky left-12 sm:left-16 z-10 ${tbodyCellBaseClasses}`}
                  >
                    {shortName(item.name)}
                  </th>

                  {/* Other data cells */}
                  <td
                    className={`px-6 py-4 dark:text-white ${tbodyCellBaseClasses}`}
                  >
                    {item.amount.toLocaleString()}
                    {formattedCurrency}
                  </td>
                  {isTransactionsPath || isReportPage ? (
                    <td
                      className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-300 ${tbodyCellBaseClasses}`}
                    >
                      {item.type.name}
                    </td>
                  ) : null}

                  {isTransactionsPath || isReportPage ? (
                    <td
                      className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-300 ${tbodyCellBaseClasses}`}
                    >
                      {shortDescription(item.description)}
                    </td>
                  ) : null}
                  <td
                    className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-lightBg ${tbodyCellBaseClasses}`}
                  >
                    {formatDate(item.date)}
                  </td>
                  <td
                    className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap ${tbodyCellBaseClasses}`}
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
                                disabled={true}
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
                                disabled={true}
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
                  </td>
                </tr>
              )
            )}
          </tbody>
        )}
      </table>
    </div>
  );
}
export default Table;
