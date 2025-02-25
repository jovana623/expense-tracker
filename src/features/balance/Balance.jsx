import { useSearchParams } from "react-router-dom";
import ChartCard from "../../ui/ChartCard";
import { useDailyBalance } from "../transactions/useDailyBalance";
import { useCurrentUser } from "../authentification/useCurrentUser";

import AreaChartComponent from "./AreaChartComponent";
import { useMonthlyBalance } from "../transactions/useMonthlyBalance";
import BalanceCard from "./BalanceCard";
import { useBalanceStats } from "./hooks/useBalanceStats";
import ChartSkeleton from "../../ui/ChartSkeleton";

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

  const { data: currentUser, isLoading: isLoadingUser } = useCurrentUser();

  const isLoading =
    isLoadingDailyBalance || isLoadingMonthlyBalance || isLoadingUser;

  const {
    isMonthlyBalance,
    bestBalance,
    worstBalance,
    averageBalance,
    bestBalanceDiff,
    worstBalanceDiff,
  } = useBalanceStats(monthlyBalance, dailyBalance, time, isLoading);

  return (
    <div className="md:grid-cols-[1fr_1fr] gap-10 grid grid-cols-1">
      <ChartCard title="Net Balance Progress">
        <div></div>
        {isLoading ? (
          <ChartSkeleton />
        ) : (
          <AreaChartComponent
            dailyBalance={dailyBalance}
            monthlyBalance={monthlyBalance}
            currency={currentUser.currency}
          />
        )}
      </ChartCard>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mb-3">
        <BalanceCard
          title={isMonthlyBalance ? "Best month" : "Best day"}
          date={bestBalance?.date || "N/A"}
          balance={bestBalance?.balance || 0}
          color="green-500"
          percentage={bestBalanceDiff ? bestBalanceDiff.toFixed(2) : "0.00"}
          isLoading={
            isLoading || !worstBalance || !bestBalance || isLoadingUser
          }
          currency={currentUser.currency}
        />
        <BalanceCard
          title={isMonthlyBalance ? "Worst month" : "Worst day"}
          date={worstBalance?.date || "N/A"}
          balance={worstBalance?.balance || 0}
          color="red-500"
          percentage={worstBalanceDiff ? worstBalanceDiff.toFixed(2) : "0.00"}
          currency={currentUser.currency}
        />
        <div className="md:col-span-2">
          <BalanceCard
            title="Average balance"
            balance={averageBalance ? averageBalance.toFixed(2) : "0.00"}
            color="blue-500"
            currency={currentUser.currency}
          />
        </div>
      </div>
    </div>
  );
}

export default Balance;
