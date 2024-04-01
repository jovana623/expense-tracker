import { PieChart, Pie, Cell, Legend } from "recharts";

/* eslint-disable react/prop-types */
function PieChartComponent({ data }) {
  function renderLegend(props) {
    const { payload } = props;

    return (
      <ul>
        {payload.map((entry, index) => (
          <li
            key={`legend-${index}`}
            className="py-2 border-b border-stone-200 flex gap-2 items-center"
          >
            <div
              className="h-2 w-4 rounded-md"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-stone-400"> {data[index].typeName} </span>{" "}
            <span className="text-stone-900 font-semibold ml-auto">
              {data[index].amount.toLocaleString()}&euro;
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <PieChart width={450} height={250}>
      <Pie
        data={data}
        cx={90}
        cy={120}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="amount"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Legend
        content={renderLegend}
        verticalAlign="middle"
        align="right"
        layout="vertical"
      />
    </PieChart>
  );
}

export default PieChartComponent;
