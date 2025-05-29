import React, { useMemo } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { BsArrowDownRight } from "react-icons/bs";
import { NavLink, useSearchParams } from "react-router-dom";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { getCurrencyEntity } from "../../helpers/currencyFunctions";

import CardSkeleton from "../../ui/CardSkeleton";
import Menu from "../../ui/Menu";

/* eslint-disable react/prop-types */
const SummaryCard = React.memo(function SummaryCard({
  icon,
  name,
  amount,
  percentage,
  isActive,
  isLoading,
  reportPath,
}) {
  const [searchParams] = useSearchParams();
  const time = searchParams.get("time") || "";
  const month = searchParams.get("month") || "";
  const currency = localStorage.getItem("currency");

  const reportUrl = useMemo(
    () => `/report/${reportPath}?time=${time}&month=${month}`,
    [reportPath, time, month]
  );

  const percentageClass = useMemo(() => {
    if (isActive) return "dark:text-white";
    if (percentage > 0) return "text-emerald-500 hover:group-hover:text-white";
    if (percentage < 0) return "text-rose-500 hover:group-hover:text-white";
    return "text-gray-500";
  }, [percentage, isActive]);

  const arrowIcon = useMemo(() => {
    return percentage > 0 ? <BsArrowUpRight /> : <BsArrowDownRight />;
  }, [percentage]);

  return (
    <div
      data-testid="summary-card"
      className={`group relative p-6 rounded-xl transition-all duration-300 ease-in-out ${
        isActive
          ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl shadow-green-500/30"
          : "bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-white shadow-lg hover:shadow-xl dark:shadow-md dark:hover:shadow-lg"
      } hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/20 dark:hover:shadow-green-500/15`}
    >
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <>
          <div className="flex items-start justify-between">
            <div
              className={`p-3 rounded-full border${
                isActive
                  ? "bg-white bg-opacity-20 text-white"
                  : "bg-green-100 text-green-600 dark:bg-gray-700 dark:text-green-400"
              }`}
            >
              <span className="text-3xl">{icon}</span>
            </div>
            {isActive && (
              <Menu>
                <Menu.Toggle
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
                <Menu.List>
                  <Menu.Button icon={<HiOutlineDocumentReport />}>
                    <NavLink
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(reportUrl, "_blank");
                      }}
                      to={reportUrl}
                    >
                      <span>Check report</span>
                    </NavLink>
                  </Menu.Button>
                </Menu.List>
              </Menu>
            )}
          </div>
          <div className="mt-4">
            <p
              className={`text-sm font-semibold tracking-wide ${
                isActive
                  ? "text-white text-opacity-80 group-hover:text-white"
                  : "text-gray-500 dark:text-gray-400"
              } `}
            >
              {name.toUpperCase()}
            </p>
            <p className="text-3xl font-extrabold mt-1 mb-2">
              {amount.toLocaleString()}
              {getCurrencyEntity(currency)}
            </p>

            {time === "all" && name !== "Savings" ? (
              <div className="h-6"></div>
            ) : (
              <p className="flex items-center gap-2 text-sm">
                <span className={`flex items-center gap-1 ${percentageClass}`}>
                  <span data-testid="arrow-icon">{arrowIcon}</span>
                  <span className="font-medium">{percentage}&#x25;</span>
                </span>{" "}
                <span
                  className={`${
                    isActive
                      ? "text-white text-opacity-70 group-hover:text-white"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {name === "Savings"
                    ? "completed"
                    : month
                    ? "vs this month"
                    : time === "year"
                    ? "vs last year"
                    : "vs last month"}
                </span>
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
});

export default SummaryCard;
