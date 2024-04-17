import { useState } from "react";
import HorizontalBarChart from "./HorizontalBarChart";

/* eslint-disable react/prop-types */
function StatisticsContainer({ incomeByType, expenseByType }) {
  const [type, setType] = useState("income");

  function handleTypeChange(value) {
    setType(value);
  }

  return (
    <div className="rounded shadow px-4 py-4">
      <div className="flex justify-end gap-3">
        <button onClick={() => handleTypeChange("income")}>Income</button>
        <button onClick={() => handleTypeChange("expenses")}>Expenses</button>
      </div>
      <div className="py-4">
        {type === "income" ? (
          <HorizontalBarChart data={incomeByType} color="#22c55e" />
        ) : (
          <HorizontalBarChart data={expenseByType} color="#ef4444" />
        )}
      </div>
    </div>
  );
}

export default StatisticsContainer;
