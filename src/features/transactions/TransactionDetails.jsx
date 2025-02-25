import { formatDate } from "../../helpers/dateFunctions";

/* eslint-disable react/prop-types */
function TransactionDetails({ item, currency }) {
  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-xl font-semibold text-gray-800">
          Transaction Details
        </h2>
      </div>

      <div className="mt-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Name:</span>
            <span className="text-gray-800">{item.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Date:</span>
            <span className="text-gray-800">{formatDate(item.date)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Amount:</span>
            <span className="text-gray-800">
              {item.amount}
              {currency}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Type:</span>
            <span className="font-semibold px-2 py-1 rounded-md">
              {item.type.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Category:</span>
            <span className="font-semibold px-2 py-1 rounded-md">
              {item.type.category.name}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-gray-600">Description:</span>
            <p className="text-gray-800">{item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionDetails;
