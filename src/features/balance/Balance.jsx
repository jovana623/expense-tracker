import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import ChartCard from "../../ui/ChartCard";
import { useDailyBalance } from "../transactions/useDailyBalance";

import AreaChartComponent from "./AreaChartComponent";
import { useMonthlyBalance } from "../transactions/useMonthlyBalance";

function Balance() {
  const [searchParams] = useSearchParams();
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;
  const formattedDate = `${currentYear}-${currentMonth}`;

  const month = searchParams.get("month") || formattedDate;
  const time = searchParams.get("time") || "";

  const { dailyBalance, isLoading: isLoadingDailyBalance } =
    useDailyBalance(month);

  const { monthlyBalance, isLoading: isLoadingMonthlyBalance } =
    useMonthlyBalance(time);

  if (isLoadingDailyBalance || isLoadingMonthlyBalance) return <Spinner />;

  return (
    <div className="md:grid-cols-[1fr_1fr] gap-10 grid grid-cols-1">
      <ChartCard>
        <div></div>
        <AreaChartComponent
          dailyBalance={dailyBalance}
          monthlyBalance={monthlyBalance}
        />
      </ChartCard>
      <ChartCard></ChartCard>
      <div></div>
    </div>
  );
}

export default Balance;
