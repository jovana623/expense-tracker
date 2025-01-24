import { BsArrowUpRight } from "react-icons/bs";
import { BsArrowDownRight } from "react-icons/bs";
import { NavLink, useSearchParams } from "react-router-dom";
import { HiOutlineDocumentReport } from "react-icons/hi";
import CardSkeleton from "../../ui/CardSkeleton";
import Menu from "../../ui/Menu";

/* eslint-disable react/prop-types */
function SummaryCard({
  icon,
  name,
  amount,
  percentage,
  isActive,
  isLoading,
  reportPath,
}) {
  const [searchParams] = useSearchParams();
  let time = searchParams.get("time") || "";
  let month = searchParams.get("month") || "";

  return (
    <div
      className={`shadow p-5 rounded-md hover:bg-green-500 hover:text-lightBg hover:shadow-xl transition-all duration-200 ${
        isActive ? "bg-green-500 text-lightBg" : "bg-lightBg"
      }`}
    >
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <>
          <div className="flex items-start justify-between">
            <div className="text-5xl bg-slate-50 p-4 rounded-full text-green-500">
              {icon}
            </div>
            {!isActive ? (
              <div></div>
            ) : (
              <Menu>
                <Menu.Toggle
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
                <Menu.List>
                  <NavLink
                    onClick={(e) => {
                      e.preventDefault();
                      const reportUrl = `/report/${reportPath}?time=${time}&month=${month}`;
                      window.open(reportUrl, "_blank");
                    }}
                    to={`/report/${reportPath}?time=${time}&month=${month}`}
                    className="flex items-center justify-center gap-2 px-2 py-1 border-b border-stone-200 text-stone-500"
                  >
                    <HiOutlineDocumentReport />
                    <span>Check report</span>
                  </NavLink>
                </Menu.List>
              </Menu>
            )}
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

            <p className="flex items-center gap-1 h-4">
              <span
                className={`flex items-center gap-1 ${
                  isActive
                    ? "text-lightBg"
                    : percentage > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {percentage > 0 ? <BsArrowUpRight /> : <BsArrowDownRight />}
                <span className="hover:text-lightBg">{percentage}&#x25;</span>
              </span>{" "}
              <span
                className={`${
                  isActive ? "text-lightBg" : ""
                } hover:text-lightBg`}
              >
                {month
                  ? "vs this month"
                  : time === "year"
                  ? "vs last year"
                  : "vs last month"}
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default SummaryCard;
