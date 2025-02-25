import { getCurrencyEntity } from "../../helpers/currencyFunctions";
import { formatDate } from "../../helpers/dateFunctions";
import CardSkeleton from "../../ui/CardSkeleton";

/* eslint-disable react/prop-types */
function BalanceCard({
  title,
  date,
  balance,
  color,
  percentage,
  isLoading,
  currency,
}) {
  return (
    <div
      className={`p-6 rounded-lg border-t-4 text-center shadow-md border-${color} h-full flex flex-col`}
    >
      {isLoading ? (
        <CardSkeleton size={3} />
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">{title}</p>
            {percentage && (
              <p className="text-xs text-gray-500">{formatDate(date)}</p>
            )}
          </div>

          <div className="flex-grow">
            <p className="text-2xl font-bold text-gray-800">
              {balance.toLocaleString()}
              {getCurrencyEntity(currency)}
            </p>
          </div>
          {percentage && (
            <div className="mt-4">
              <p className="text-xs text-gray-500">Difference from Average</p>
              <p className="text-sm font-semibold text-gray-600 mt-1">
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
