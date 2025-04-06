/* eslint-disable react/prop-types */
function ChartCard({ title, children }) {
  const childArray = Array.isArray(children) ? children : [children];

  return (
    <div className="shadow w-full px-5 py-6 flex flex-col rounded-md bg-lightBg gap-4 dark:bg-gray-700">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        {title && (
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">
            {title}
          </h2>
        )}
        <div className="w-full md:w-auto">{childArray[0]}</div>
      </div>
      <div className="mt-2 h-[300px]">{childArray[1]}</div>{" "}
    </div>
  );
}

export default ChartCard;
