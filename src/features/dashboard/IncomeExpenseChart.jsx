import React, { Suspense, useMemo } from "react";
import ChartSkeleton from "../../ui/ChartSkeleton";

const PositiveAndNegativeBar = React.lazy(() =>
  import("./PositiveAndNegativeBar")
);
const LineChartComponent = React.lazy(() => import("./LineChartComponent"));

/* eslint-disable react/prop-types */
function IncomeExpenseChart({ chart, sortedByMonth, monthData }) {
  const chartComponent = useMemo(() => {
    switch (chart) {
      case 1:
        return (
          <Suspense fallback={<ChartSkeleton />}>
            <PositiveAndNegativeBar
              data={sortedByMonth}
              monthData={monthData}
              currency={localStorage.getItem("currency")}
            />
          </Suspense>
        );
      case 2:
        return (
          <Suspense fallback={<ChartSkeleton />}>
            <LineChartComponent
              data={sortedByMonth}
              monthData={monthData}
              currency={localStorage.getItem("currency")}
            />
          </Suspense>
        );
      default:
        return null;
    }
  }, [chart, sortedByMonth, monthData]);

  return <>{chartComponent}</>;
}

export default IncomeExpenseChart;
