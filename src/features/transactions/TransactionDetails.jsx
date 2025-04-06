import { formatDate } from "../../helpers/dateFunctions";

/* eslint-disable react/prop-types */
function TransactionDetails({ item, currency }) {
  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3 ">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-lightBg">
          Transaction Details
        </h2>
      </div>

      <div className="mt-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              Name:
            </span>
            <span className="text-gray-800 dark:text-gray-200">
              {item.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              Date:
            </span>
            <span className="text-gray-800 dark:text-gray-200">
              {formatDate(item.date)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              Amount:
            </span>
            <span className="text-gray-800 dark:text-gray-200">
              {item.amount}
              {currency}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              Type:
            </span>
            <span className="font-semibold px-2 py-1 rounded-md dark:text-gray-200">
              {item.type.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              Category:
            </span>
            <span className="font-semibold px-2 py-1 rounded-md dark:text-gray-200">
              {item.type.category.name}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              Description:
            </span>
            <p className="text-gray-800 dark:text-gray-200">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionDetails;
