import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

/* eslint-disable react/prop-types */
function RadialBarChartComponent({ data }) {
  return (
    <ResponsiveContainer width="100%" height="50%">
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="10%"
        outerRadius="100%"
        barSize={10}
        data={data}
      >
        <RadialBar
          minAngle={15}
          background
          clockWise
          dataKey="percentage"
          fill="color"
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

export default RadialBarChartComponent;
