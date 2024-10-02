import { useSearchParams } from "react-router-dom";
import { useCategoryByMonth } from "../features/statistics/useCategoryByMonth";
import SavingsContainer from "../features/statistics/SavingsContainer";
import SelectType from "../features/statistics/SelectType";
import ChartCard from "../ui/ChartCard";
import Spinner from "../ui/Spinner";
import CategoryChart from "../features/statistics/CategoryChart";
import TimeFilter from "../ui/TimeFilter";
import FlipCard from "../features/statistics/FlipCard";
import { useTransactionStatistic } from "../features/transactions/useTransactionStatistic";

function Statistic() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "Salary";
  const time = searchParams.get("time") || "";
  const { data: typeData, isLoading } = useCategoryByMonth(type);
  const { statistic, isLoading: isLoadingStats } =
    useTransactionStatistic(time);

  if (isLoading || isLoadingStats) return <Spinner />;

  const { top_income, avg_income, top_expense, avg_expense } = statistic;
  return (
    <div className="py-8 px-7">
      <div className="grid grid-cols-[1fr_2fr_1fr] gap-10 h-[100%]">
        <div className="flex flex-col gap-5">
          <ChartCard>
            <SelectType />
            {isLoading ? <Spinner /> : <CategoryChart data={typeData} />}
          </ChartCard>
          <ChartCard>
            <TimeFilter />
            <div className="flex gap-3">
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
          </ChartCard>
        </div>
        <div className="">
          <SavingsContainer />
        </div>
        <div>Child 3</div>
      </div>
    </div>
  );
}

export default Statistic;
