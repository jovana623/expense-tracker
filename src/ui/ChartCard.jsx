import React from "react";

/* eslint-disable react/prop-types */
function ChartCard({ title, children, className }) {
  const childArray = React.useMemo(
    () => (Array.isArray(children) ? children : [children, null]),
    [children]
  );

  return (
    <div
      className={`shadow-md w-full p-4 md:p-6 rounded-xl bg-lightBg dark:bg-gray-700 transition-shadow duration-300 hover:shadow-lg ${className} lg:flex lg:flex-col lg:h-full`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 lg:mb-6 lg:flex-shrink-0">
        {" "}
        {title && (
          <h2 className="text-lg font-semibold text-center md:text-left text-gray-700 dark:text-gray-100">
            {title}
          </h2>
        )}
        <div className="w-full md:w-auto text-center md:text-left">
          {childArray[0]}
        </div>
      </div>

      <div className="lg:flex-grow lg:min-h-0"> {childArray[1]}</div>
    </div>
  );
}

export default ChartCard;
