import { BsThreeDots } from "react-icons/bs";
import { BsArrowUpRight } from "react-icons/bs";

/* eslint-disable react/prop-types */
function SummaryCard({ icon, name, amount, percentage, isActive }) {
  return (
    <div
      className={`shadow p-5 rounded-md hover:bg-green-500 hover:text-lightBg  ${
        isActive ? "bg-green-500 text-lightBg" : "bg-lightBg"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="text-5xl bg-slate-50 p-4 rounded-full text-green-500">
          {icon}
        </div>
        <button className="bg-transparent">
          <BsThreeDots />
        </button>
      </div>
      <div className="mt-4">
        <p
          className={`text-sm hover:text-lightBg${
            isActive ? "text-lightBg" : "text-stone-500"
          }`}
        >
          {name.toUpperCase()}
        </p>
        <p className="text-xl font-bold mb-2">
          {amount.toLocaleString()}&euro;
        </p>

        <p className="flex items-center gap-1">
          <span
            className={`flex items-center gap-1 ${
              isActive ? "text-lightBg" : "text-green-500"
            }`}
          >
            <BsArrowUpRight />
            <span className="hover:text-lightBg">{percentage}&#x25;</span>
          </span>{" "}
          <span
            className={`${isActive ? "text-lightBg" : ""} hover:text-lightBg`}
          >
            vs last 30 days
          </span>
        </p>
      </div>
    </div>
  );
}

export default SummaryCard;
