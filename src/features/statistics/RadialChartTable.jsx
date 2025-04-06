import { getCurrencyEntity } from "../../helpers/currencyFunctions";

/* eslint-disable react/prop-types */
function RadialChartTable({ data, currency }) {
  const formattedCurrency = getCurrencyEntity(currency);
  return (
    <ul className="flex gap-4 flex-col px-3 overflow-y-scroll h-[fit-container] max-h-[240px]">
      {data.map((entry, index) => (
        <li
          key={index}
          className="grid grid-cols-[0.5fr_2fr_3fr_1fr] border-b border-stone-200 py-1 items-center gap-3 text-sm w-[90%] mx-auto dark:border-stone-600"
        >
          <div
            className="h-2 w-4 rounded"
            style={{ backgroundColor: data[index].fill }}
          ></div>

          <p>{data[index].name}</p>
          <p
            className="font-semibold justify-self-center dark:text-lightBg
          "
          >
            {data[index].amount.toLocaleString()}
            {formattedCurrency}/ {data[index].goal.toLocaleString()}
            {formattedCurrency}
          </p>
          <p className="text-stone-500 dark:text-gray-200">
            {data[index].percentage}%
          </p>
        </li>
      ))}
    </ul>
  );
}

export default RadialChartTable;
