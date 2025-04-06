import { getCurrencyEntity } from "../../helpers/currencyFunctions";

/* eslint-disable react/prop-types */
function ReportCard({ title, subtitle = "", amount, unit }) {
  return (
    <div
      className={`bg-white p-4 rounded-md shadow-sm flex flex-col text-center dark:bg-gray-800 ${
        subtitle === "" ? "justify-around" : ""
      }`}
    >
      <p className="text-xs text-gray-500 uppercase dark:text-gray-200">
        {title}
      </p>
      <p className="dark:text-gray-300">{subtitle}</p>
      <p className="text-xl font-semibold text-gray-800 dark:text-lightBg">
        {amount === null ? "0.00" : Number(amount).toLocaleString()}
        {getCurrencyEntity(unit)}
      </p>
    </div>
  );
}

export default ReportCard;
