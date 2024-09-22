/* eslint-disable react/prop-types */
function ChartCard({ children }) {
  const childArray = Array.isArray(children) ? children : [children];
  return (
    <div className="shadow w-full px-5 py-5 flex flex-col rounded-md bg-lightBg gap-2">
      <div className="self-end">{childArray[0]}</div>
      <div>{childArray[1]}</div>
    </div>
  );
}

export default ChartCard;
