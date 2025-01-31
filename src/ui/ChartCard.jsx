/* eslint-disable react/prop-types */
function ChartCard({ title, children }) {
  const childArray = Array.isArray(children) ? children : [children];
  return (
    <div className="shadow w-full px-5 py-5 flex flex-col rounded-md bg-lightBg gap-2">
      <div className="flex md:justify-between flex-col items-center md:flex-row">
        {title ? (
          <h2 className="text-base font-semibold text-gray-700 mb-4 md:mb-0">
            {title}
          </h2>
        ) : (
          <div></div>
        )}
        <div className="">{childArray[0]}</div>
      </div>
      <div>{childArray[1]}</div>
    </div>
  );
}

export default ChartCard;
