/* eslint-disable react/prop-types */
function ReportCard({ title, subtitle = "", amount, unit }) {
  return (
    <div
      className={`bg-white p-4 rounded-md shadow-sm flex flex-col text-center ${
        subtitle === "" ? "justify-around" : ""
      }`}
    >
      <p className="text-xs text-gray-500 uppercase">{title}</p>
      <p>{subtitle}</p>
      <p className="text-xl font-semibold text-gray-800">
        {amount === null ? "0.00" : Number(amount).toLocaleString()}
        {unit}
      </p>
    </div>
  );
}

export default ReportCard;
