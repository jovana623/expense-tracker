import { useSearchParams } from "react-router-dom";
import { useTypeByMonth } from "../features/statistics/useTypeByMonth";
import { useTransactionStatistic } from "../features/transactions/useTransactionStatistic";
import { useTypes } from "../features/type/useTypes";

import SavingsContainer from "../features/statistics/SavingsContainer";
import ChartCard from "../ui/ChartCard";
import CategoryChart from "../features/statistics/CategoryChart";
import TimeFilter from "../ui/TimeFilter";
import FlipCard from "../features/statistics/FlipCard";
import StatsTable from "../features/statistics/StatsTable";
import SelectType from "../features/statistics/SelectType";
import ChartSkeleton from "../ui/ChartSkeleton";
import CardSkeleton from "../ui/CardSkeleton";

function Statistic() {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type") || "Salary";
  const time = searchParams.get("time") || "";

  const { data: typeData, isLoading } = useTypeByMonth(type);
  const { statistic, isLoading: isLoadingStats } =
    useTransactionStatistic(time);
  const { types, isLoading: isLoadingTypes } = useTypes();
  console.log("Types:", types);

  function handleTypeChange(e) {
    searchParams.set("type", e.target.value);
    setSearchParams(searchParams);
  }

  const currency = localStorage.getItem("currency");

  return (
    <div className="py-4 px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="grid grid-rows-[1fr_2fr]  gap-5">
          <ChartCard title="Trends over time">
            <SelectType
              data={types}
              onChange={handleTypeChange}
              isLoading={isLoadingTypes}
            />

            {isLoading ? (
              <ChartSkeleton />
            ) : (
              <CategoryChart data={typeData} currency={currency} />
            )}
          </ChartCard>

          <SavingsContainer currency={currency} />
        </div>

        <ChartCard>
          <TimeFilter />

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {isLoadingStats ? (
                <CardSkeleton size={4} />
              ) : (
                <FlipCard
                  titleFront="Average income"
                  titleBack="Top income"
                  transaction={statistic.top_income}
                  avg={statistic.avg_income}
                  currency={currency}
                />
              )}
              {isLoadingStats ? (
                <CardSkeleton size={4} />
              ) : (
                <FlipCard
                  titleFront="Average expense"
                  titleBack="Top expense"
                  transaction={statistic.top_expense}
                  avg={statistic.avg_expense}
                  currency={currency}
                />
              )}
            </div>

            <div className="flex-grow grid grid-cols-1 gap-4 mt-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-700 uppercase dark:text-lightBg mb-2">
                    Top income types
                  </p>
                  <StatsTable
                    data={statistic?.top_income_types || []}
                    isLoading={isLoadingStats}
                    currency={currency}
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-700 uppercase dark:text-lightBg mb-2">
                    Top expense types
                  </p>
                  <StatsTable
                    data={statistic?.top_expense_types || []}
                    isLoading={isLoadingStats}
                    currency={currency}
                  />
                </div>
              </div>
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}

export default Statistic;
