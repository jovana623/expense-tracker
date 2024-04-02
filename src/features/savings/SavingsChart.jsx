import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

/* eslint-disable react/prop-types */
export default function SavingsChart({ saving }) {
  const amount = parseInt(saving.Amount);
  const goal = parseInt(saving.Goal);
  const percentage = ((amount * 100) / goal).toFixed(0);
  const angle_in_degrees = (percentage / 100) * 360;

  const data = [
    {
      name: "Savings",
      amount,
      goal: goal - amount,
      angle_in_degrees,
      percentage,
    },
    {
      name: "Goal",
      amount: goal,
      goal: 0,
      angle_in_degrees: 360 - angle_in_degrees,
      percentage: 100 - percentage,
      fill: "#fff",
    },
  ];

  return (
    <ResponsiveContainer width="70%" height={400}>
      <RadialBarChart
        innerRadius="70%"
        outerRadius="50%"
        data={data}
        startAngle={0}
        endAngle={360}
        barSize={30}
      >
        <RadialBar
          minAngle={100}
          label={{ position: "inside", fill: "none" }}
          background
          clockWise
          dataKey="amount"
          fill="#0ea5e9"
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}
