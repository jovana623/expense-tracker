/* eslint-disable react/prop-types */
function PieChartCard({ children }) {
  return (
    <div className="shadow w-full px-5 py-5 flex flex-col rounded-md bg-lightBg">
      <h1 className="font-semibold">Report Overview</h1>
      <div>{children}</div>
    </div>
  );
}

export default PieChartCard;
