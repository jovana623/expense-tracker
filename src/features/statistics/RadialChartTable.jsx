import { getCurrencyEntity } from "../../helpers/currencyFunctions";

/* eslint-disable react/prop-types */
function RadialChartTable({ data, currency }) {
  const formattedCurrency = getCurrencyEntity(currency);

  return (
    <ul className="flex flex-col gap-1.5 px-2 sm:px-3 overflow-y-auto max-h-[240px] h-fit">
      {data.map((entry, index) => (
        <li
          key={index}
          className="grid grid-cols-[auto_1fr_minmax(0,_1.5fr)_minmax(0,_0.5fr)] items-center gap-x-2 sm:gap-x-3 text-sm w-full border-b border-gray-200 dark:border-gray-700 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150"
        >
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: entry.fill }}
          ></div>

          <p className="truncate text-gray-700 dark:text-gray-300">
            {entry.name}
          </p>

          <div className="justify-self-center text-center">
            <p className="font-semibold text-gray-800 dark:text-lightBg">
              {entry.amount.toLocaleString()} {formattedCurrency}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight pt-0.5">
              {entry.goal.toLocaleString()} {formattedCurrency}
            </p>
          </div>

          <p className="text-right text-gray-600 dark:text-gray-400">
            {entry.percentage}%
          </p>
        </li>
      ))}
      {data.length === 0 && (
        <li className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
          No savings yet.
        </li>
      )}
    </ul>
  );
}

export default RadialChartTable;
