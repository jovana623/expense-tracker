import { getCurrencyEntity } from "../helpers/currencyFunctions";

/* eslint-disable react/prop-types */
function Legend({ data, currency }) {
  return (
    <div>
      <ul>
        {data.map((entry, index) => (
          <li
            key={`legend-${index}`}
            className="py-2 border-b border-stone-200 flex gap-2 items-center dark:border-stone-600"
          >
            <div
              className="h-2 w-4 rounded-md"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-stone-400"> {data[index].typeName} </span>{" "}
            <span className="text-stone-900 font-semibold ml-auto dark:text-lightBg">
              {data[index].amount.toLocaleString()}
              {getCurrencyEntity(currency)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Legend;
