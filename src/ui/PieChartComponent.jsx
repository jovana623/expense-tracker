import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

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

  return (
    <ResponsiveContainer
      width={isScreenSmall ? 300 : 250}
      height={isScreenSmall ? 200 : 250}
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
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieChartComponent;
