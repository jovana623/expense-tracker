import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import ChartCard from "../../ui/ChartCard";
import { useDailyBalance } from "../transactions/useDailyBalance";

import AreaChartComponent from "./AreaChartComponent";
import { useMonthlyBalance } from "../transactions/useMonthlyBalance";
import BalanceCard from "./BalanceCard";
import { useBalanceStats } from "./hooks/useBalanceStats";

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

  const isLoading = isLoadingDailyBalance || isLoadingMonthlyBalance;

  const {
    isMonthlyBalance,
    bestBalance,
    worstBalance,
    averageBalance,
    bestBalanceDiff,
    worstBalanceDiff,
  } = useBalanceStats(monthlyBalance, dailyBalance, time, isLoading);

  if (isLoading) return <Spinner />;
  if (!bestBalance || !worstBalance) return <Spinner />;

  return (
    <div className="md:grid-cols-[1fr_1fr] gap-10 grid grid-cols-1">
      <ChartCard>
        <div></div>
        <AreaChartComponent
          dailyBalance={dailyBalance}
          monthlyBalance={monthlyBalance}
        />
      </ChartCard>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
        <BalanceCard
          title={isMonthlyBalance ? "Best month" : "Best day"}
          date={bestBalance.date}
          balance={bestBalance.balance}
          color="green-500"
          percentage={bestBalanceDiff.toFixed(2)}
        />
        <BalanceCard
          title={isMonthlyBalance ? "Worst month" : "Worst day"}
          date={worstBalance.date}
          balance={worstBalance.balance}
          color="red-500"
          percentage={worstBalanceDiff.toFixed(2)}
        />
        <div className="md:col-span-2">
          <BalanceCard
            title="Average balance"
            balance={averageBalance.toFixed(2)}
            color="blue-500"
          />
        </div>
      </div>
    </div>
  );
}

export default Balance;
