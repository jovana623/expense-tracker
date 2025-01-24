import Spinner from "./Spinner";
import { FiArrowUpRight } from "react-icons/fi";
import { FiArrowDownLeft } from "react-icons/fi";
import Modal from "./Modal";
import Menu from "./Menu";
import { BiSolidPencil } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import CreateTransactionForm from "../features/transactions/CreateTransactionForm";
import ConfirmDelete from "./ConfirmDelete";
import { useDeleteTransaction } from "../features/transactions/useDeleteTransaction";
import { formatDate } from "../helpers/dateFunctions";

/* eslint-disable react/prop-types */
function Table({ data, isLoading }) {
  const { deleteTransaction } = useDeleteTransaction();
  if (isLoading) return <Spinner />;
  const isTransactionsPath = location.pathname === "/transactions";
  const isReportPage = location.pathname.includes("/report");
  const category = "Income";

  if (data) {
    console.log("Data", data);
  } else console.log("No data");

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
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-50 border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {category === "Income" ? (
                  <FiArrowDownLeft />
                ) : (
                  <FiArrowUpRight />
                )}
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {shortName(item.name)}
              </th>
              <th className="px-6 py-4">
                {item.amount.toLocaleString()}
                &euro;
              </th>
              {isTransactionsPath || isReportPage ? (
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {item.type.name}
                </th>
              ) : (
                <div></div>
              )}

              {isTransactionsPath || isReportPage ? (
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {shortDescription(item.description)}
                </th>
              ) : (
                <div></div>
              )}
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {formatDate(item.date)}
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {location.pathname === "/budget" || isReportPage ? (
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
                      </Menu.List>

                      <Modal.Window name="update">
                        <CreateTransactionForm transactionToUpdate={item} />
                      </Modal.Window>

                      <Modal.Window name="delete">
                        {category === "Income" ? (
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
                    </Menu>
                  </Modal>
                )}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
