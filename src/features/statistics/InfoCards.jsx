import { GiExpense } from "react-icons/gi";
import { PiChartPieSliceDuotone } from "react-icons/pi";
import StatisticsCard from "./StatisticsCard";
import TotalCard from "./TotalCard";

/* eslint-disable react/prop-types */
function InfoCards({ totalIncome, totalExpense }) {
  return (
    <div className="flex gap-11 justify-start items-start my-4">
      <StatisticsCard>
        <TotalCard
          total={totalIncome}
          name="income"
          icon={<PiChartPieSliceDuotone />}
        />
      </StatisticsCard>
      <StatisticsCard>
        <TotalCard total={totalExpense} name="expense" icon={<GiExpense />} />
      </StatisticsCard>
    </div>
  );
}

export default InfoCards;
