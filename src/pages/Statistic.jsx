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

  function handleTypeChange(e) {
    searchParams.set("type", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <div className="py-8 px-7">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr_2fr] gap-10 h-[100%]">
        <div className="flex flex-col gap-5">
          <ChartCard title="Trends over time">
            {isLoadingTypes ? (
              <div></div>
            ) : (
              <SelectType data={types} onChange={handleTypeChange} />
            )}
            {isLoading ? <ChartSkeleton /> : <CategoryChart data={typeData} />}
          </ChartCard>
          <ChartCard>
            <TimeFilter />

            <div className="flex flex-col sm:flex-row gap-3">
              {isLoadingStats ? (
                <div className="my-3 shadow-sm w-[200px] mx-auto">
                  <CardSkeleton size={4} />
                </div>
              ) : (
                <FlipCard
                  titleFront="Average income"
                  titleBack="Top income"
                  transaction={statistic.top_income}
                  avg={statistic.avg_income}
                />
              )}
              {isLoadingStats ? (
                <div className="my-3 shadow-sm w-[200px] mx-auto">
                  <CardSkeleton size={4} />
                </div>
              ) : (
                <FlipCard
                  titleFront="Average expense"
                  titleBack="Top expense"
                  transaction={statistic.top_expense}
                  avg={statistic.avg_expense}
                />
              )}
            </div>
          </ChartCard>
        </div>
        <div className="">
          <SavingsContainer />
        </div>
        <div>
          <ChartCard>
            <TimeFilter />

            <div className="flex flex-col gap-3">
              <p className="text-xs text-gray-700 uppercase bg-gray-50">
                Top income types
              </p>
              <StatsTable
                data={statistic?.top_income_types || []}
                isLoading={isLoadingStats}
              />
              <p className="text-xs text-gray-700 uppercase bg-gray-50">
                Top expense types
              </p>
              <StatsTable
                data={statistic?.top_expense_types || []}
                isLoading={isLoadingStats}
              />
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

export default Statistic;
