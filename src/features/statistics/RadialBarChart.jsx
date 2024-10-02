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
        barSize={15}
        data={data}
        startAngle={180} // Optional: start from the bottom
        endAngle={-180} // Optional: makes a semi-circle chart
      >
        <RadialBar
          minAngle={15}
          clockWise
          dataKey="percentage"
          background={{ fill: "#eee" }}
          cornerRadius={10} // Optional: adds rounded edges to bars
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

export default RadialBarChartComponent;
