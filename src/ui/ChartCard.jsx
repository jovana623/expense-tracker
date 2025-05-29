import React from "react";

/* eslint-disable react/prop-types */
function ChartCard({ title, children, className }) {
  const childArray = React.useMemo(
    () => (Array.isArray(children) ? children : [children, null]),
    [children]
  );

  return (
    <div
      className={`relative shadow-lg w-full p-4 md:p-6 rounded-2xl bg-white dark:bg-gray-700 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.005] ${className} lg:flex lg:flex-col`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 lg:mb-6 lg:flex-shrink-0">
        {title && (
          <h2 className="text-xl font-bold text-center md:text-left text-gray-800 dark:text-gray-100 flex-grow">
            {title}
          </h2>
        )}
        <div className="w-full md:w-auto text-center md:text-left">
          {childArray[0]}
        </div>
      </div>

      <div>{childArray[1]}</div>
    </div>
  );
}

export default ChartCard;
