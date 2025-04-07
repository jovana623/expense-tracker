import { getCurrencyEntity } from "../../helpers/currencyFunctions";
import { formatDate } from "../../helpers/dateFunctions";
import CardSkeleton from "../../ui/CardSkeleton";

/* eslint-disable react/prop-types */
function BalanceCard({
  title,
  date,
  balance,
  color = "blue-500",
  percentage,
  isLoading,
  currency,
}) {
  const borderColorClass = `border-${color}`;

  return (
    <div
      className={`p-4 md:p-5 rounded-lg shadow-md border-l-4 ${borderColorClass} h-full flex flex-col bg-lightBg dark:bg-gray-700`}
    >
      {isLoading ? (
        <CardSkeleton size={3} />
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {title}
              </p>
            </div>
            {date && (
              <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {formatDate(date)}
              </p>
            )}
          </div>

          <div className="my-auto text-center py-3">
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 truncate">
              {balance.toLocaleString()}
              <span className="text-xl ml-1 opacity-90">
                {getCurrencyEntity(currency)}
              </span>
            </p>
          </div>

          {percentage !== undefined && percentage !== null && (
            <div className="mt-auto pt-2 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Difference from Average
              </p>
              <p
                className={`text-lg font-semibold ${
                  percentage >= 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {percentage >= 0 ? "+" : ""}
                {percentage}%
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BalanceCard;
