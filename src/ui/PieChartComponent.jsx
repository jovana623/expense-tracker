import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

/* eslint-disable react/prop-types */
function PieChartComponent({ data }) {
  const [isScreenSmall, setIsScreenSmall] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsScreenSmall(window.innerWidth < 540);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <ResponsiveContainer
      width={isScreenSmall ? 300 : 450}
      height={isScreenSmall ? 400 : 250}
    >
      <PieChart>
        <Pie
          data={data}
          cx={isScreenSmall ? 150 : 90}
          cy={isScreenSmall ? 75 : 120}
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
          verticalAlign={isScreenSmall ? "bottom" : "middle"}
          align={isScreenSmall ? "center" : "right"}
          layout="vertical"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieChartComponent;
