import { useSearchParams } from "react-router-dom";
import { useTypeByMonth } from "../features/statistics/useTypeByMonth";
import { useTransactionStatistic } from "../features/transactions/useTransactionStatistic";
import { useTypes } from "../features/type/useTypes";

import SavingsContainer from "../features/statistics/SavingsContainer";
import ChartCard from "../ui/ChartCard";
import Spinner from "../ui/Spinner";
import CategoryChart from "../features/statistics/CategoryChart";
import TimeFilter from "../ui/TimeFilter";
import FlipCard from "../features/statistics/FlipCard";
import StatsTable from "../features/statistics/StatsTable";
import Select from "../ui/Select";

function Statistic() {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type") || "Salary";
  const time = searchParams.get("time") || "";

  const { data: typeData, isLoading } = useTypeByMonth(type);

  const { statistic, isLoading: isLoadingStats } =
    useTransactionStatistic(time);

  const { types, isLoading: isLoadingTypes } = useTypes();

  if (isLoading || isLoadingStats) return <Spinner />;

  const {
    top_income,
    avg_income,
    top_expense,
    avg_expense,
    top_income_types,
    top_expense_types,
  } = statistic;

  function handleTypeChange(e) {
    searchParams.set("type", e.target.value);
    setSearchParams(searchParams);
  }

  console.log(types);

  return (
    <div className="py-8 px-7">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr_2fr] gap-10 h-[100%]">
        <div className="flex flex-col gap-5">
          <ChartCard>
            {isLoadingTypes ? (
              <Spinner />
            ) : (
              <Select data={types} onChange={handleTypeChange} />
            )}
            {isLoading ? <Spinner /> : <CategoryChart data={typeData} />}
          </ChartCard>
          <ChartCard>
            <TimeFilter />
            {isLoadingStats ? (
              <Spinner />
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <FlipCard
                  titleFront="Average income"
                  titleBack="Top income"
                  transaction={top_income}
                  avg={avg_income}
                />
                <FlipCard
                  titleFront="Average expense"
                  titleBack="Top expense"
                  transaction={top_expense}
                  avg={avg_expense}
                />
              </div>
            )}
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
              <StatsTable data={top_income_types} />
              <p className="text-xs text-gray-700 uppercase bg-gray-50">
                Top expense types
              </p>
              <StatsTable data={top_expense_types} />
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

export default Statistic;
