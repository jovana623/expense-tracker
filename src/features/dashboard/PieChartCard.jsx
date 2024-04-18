/* eslint-disable react/prop-types */
function PieChartCard({ children, title }) {
  return (
    <div className="shadow w-full px-5 py-5 flex flex-col rounded-md bg-lightBg">
      <h1 className="font-semibold mb-2">{title}</h1>
      <div>{children}</div>
    </div>
  );
}

export default PieChartCard;
