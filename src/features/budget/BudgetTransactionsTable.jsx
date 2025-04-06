import { getCurrencyEntity } from "../../helpers/currencyFunctions";
import { useTransactions } from "../transactions/useTransactions";
import { formatDate } from "../../helpers/dateFunctions";
import TableSkeleton from "../../ui/TableSkeleton";

/* eslint-disable react/prop-types */
function BudgetTransactionTable({ type, period }) {
  let time = period === "Monthly" ? "month" : "year";
  const currency = localStorage.getItem("currency");
  const formattedCurrency = getCurrencyEntity(currency);

  const { transactions, isLoading } = useTransactions(
    time,
    null,
    null,
    null,
    null,
    null,
    type
  );

  console.log(transactions);

  return (
    <div className="relative overflow-x-auto my-4 px-3">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-800 dark:text-lightBg">
          <tr>
            <th scope="col" className="px-6 py-3 rounded-s-lg">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3 rounded-e-lg">
              Date
            </th>
          </tr>
        </thead>
        {isLoading ? (
          <tbody>
            <tr>
              <td colSpan="3">
                <TableSkeleton rows={3} columns={3} />
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="">
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="bg-white dark:bg-gray-700 dark:border-stone-600 dark:text-lightBg"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-lightBg"
                >
                  {transaction.name}
                </th>
                <td className="px-6 py-4">
                  {transaction.amount.toLocaleString()}
                  {formattedCurrency}
                </td>
                <td className="px-6 py-4">{formatDate(transaction.date)}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default BudgetTransactionTable;
