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
    if (isActive) return "text-white";
    if (percentage > 0) return "text-green-500 group-hover:text-lightBg";
    if (percentage < 0) return "text-red-500 group-hover:text-lightBg";
    return "text-stone-500";
  }, [percentage, isActive]);

  const arrowIcon = useMemo(() => {
    return percentage > 0 ? <BsArrowUpRight /> : <BsArrowDownRight />;
  }, [percentage]);

  return (
    <div
      data-testid="summary-card"
      className={`group shadow-md p-5 rounded-md hover:bg-green-500 hover:text-lightBg hover:shadow-lg transition-all duration-200 dark:hover:bg-green-500 ${
        isActive
          ? "bg-green-500 text-lightBg shadow-xl"
          : "bg-lightBg text-stone-800 dark:bg-gray-700 dark:text-white dark:shadow-lg"
      }`}
    >
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <>
          <div className="flex items-start justify-between">
            <div className="text-5xl bg-gray-100 dark:bg-gray-600 p-4 rounded-full text-green-500">
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
              className={`text-sm hover:text-lightBg${
                isActive ? "text-lightBg" : "text-stone-500"
              } group-hover:text-lightBg`}
            >
              {name.toUpperCase()}
            </p>
            <p className="text-xl font-bold mb-2">
              {amount.toLocaleString()}
              {getCurrencyEntity(currency)}
            </p>

            {time === "all" && name !== "Savings" ? (
              <div className="h-[1rem]"></div>
            ) : (
              <p className="flex items-center gap-1 h-4">
                <span className={`flex items-center gap-1 ${percentageClass}`}>
                  <span data-testid="arrow-icon">{arrowIcon}</span>
                  <span className="hover:text-lightBg">{percentage}&#x25;</span>
                </span>{" "}
                <span
                  className={`${
                    isActive ? "text-lightBg" : ""
                  } hover:text-lightBg`}
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
