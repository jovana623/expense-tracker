/* eslint-disable react/prop-types */
function RadialChartTable({ data }) {
  console.log(data);
  return (
    <ul className="flex gap-4 flex-col px-3 overflow-y-scroll h-[fit-container] max-h-[240px]">
      {data.map((entry, index) => (
        <li
          key={index}
          className="grid grid-cols-[0.5fr_2fr_3fr_1fr] border-b border-stone-200 py-1 items-center gap-3 text-sm w-[90%] mx-auto"
        >
          <div
            className="h-2 w-4 rounded"
            style={{ backgroundColor: data[index].fill }}
          ></div>

          <p>{data[index].name}</p>
          <p className="font-semibold justify-self-center">
            {data[index].amount.toLocaleString()}&euro; /{" "}
            {data[index].goal.toLocaleString()}
            &euro;
          </p>
          <p className="text-stone-500">{data[index].percentage}%</p>
        </li>
      ))}
    </ul>
  );
}

export default RadialChartTable;
