import { useSearchParams } from "react-router-dom";
import { formatMonthYear } from "../../helpers/dateFunctions";

/* eslint-disable react/prop-types */
function TotalCard({ total, name, icon }) {
  const [searchParams] = useSearchParams();
  const month = searchParams.get("month");
  return (
    <div className="grid grid-cols-2 overflow-hidden px-4 py-9 w-[100%] h-36">
      <div className="bg-lightBg flex flex-col gap-1 pb-4 w-full">
        <p className="text-sm">TOTAL {name.toUpperCase()}</p>
        <p className="text-2xl font-semibold">{total.toLocaleString()}&euro;</p>
        <p className="text-xs text-slate-500">{formatMonthYear(month)}</p>
      </div>
      <div
        className={`self-end text-9xl  mb-[1rem] ml-[2rem] ${
          name === "income" ? "text-green-400" : "text-red-500"
        }`}
      >
        {icon}
      </div>
    </div>
  );
}

export default TotalCard;
