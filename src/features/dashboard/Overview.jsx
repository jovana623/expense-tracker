import {
  getCurrentMonthData,
  monthySummary,
} from "../../helpers/sortTransactions";
import Spinner from "../../ui/Spinner";
import LineChartComponent from "./LineChartComponent";
import PieChartCard from "./PieChartCard";
import { useIncomeTransactions } from "../income/useIncomeTransactions";
import { useExpensesTransactions } from "../expenses/useExpensesTransactions";
import PositiveAndNegativeBar from "./PositiveAndNegativeBar";
import { useSearchParams } from "react-router-dom";

function Overview() {
  const [searchParams] = useSearchParams();
  const { incomeTransactions, isLoading: isLoadingIncome } =
    useIncomeTransactions();

  const { expensesTransactions, isLoading: isLoadingExpenses } =
    useExpensesTransactions();

  if (isLoadingIncome || isLoadingExpenses) return <Spinner />;

  const allTransactions = incomeTransactions?.concat(expensesTransactions);

  const sortedByMonth = allTransactions ? monthySummary(allTransactions) : [];

  const timeValue = searchParams.get("time");

  const monthData = getCurrentMonthData(allTransactions);

  console.log(monthData);
  console.log(sortedByMonth);

  return (
    <div className="grid grid-cols-[1fr_1fr] gap-10">
      <PieChartCard>
        <PositiveAndNegativeBar
          data={sortedByMonth}
          timeValue={timeValue}
          monthData={monthData}
        ></PositiveAndNegativeBar>
      </PieChartCard>
      <PieChartCard>
        <LineChartComponent
          data={sortedByMonth}
          timeValue={timeValue}
          monthData={monthData}
        />
      </PieChartCard>
    </div>
  );
}

export default Overview;
