import { useSearchParams } from "react-router-dom";

import { sortByMonth, sortMonthData } from "../../helpers/sortTransactions";
import { handleDownloadPDF } from "../../helpers/pdfDownload";
import { useDailyBalance } from "../transactions/useDailyBalance";
import { useMonthlyBalance } from "../transactions/useMonthlyBalance";
import { useBalanceStats } from "../balance/hooks/useBalanceStats";
import { useTransactions } from "../transactions/useTransactions";
import { useCurrentUser } from "../authentification/useCurrentUser";
import { getCurrentMonthAndYear } from "../../helpers/dateFunctions";

import PositiveAndNegativeBar from "../dashboard/PositiveAndNegativeBar";
import LineChartComponent from "../dashboard/LineChartComponent";
import Table from "../../ui/Table";
import BalanceCard from "../balance/BalanceCard";
import Spinner from "../../ui/Spinner";
import ChartCard from "../../ui/ChartCard";
import AreaChartComponent from "../balance/AreaChartComponent";

function BalanceReport() {
  const [searchParams] = useSearchParams();
  const month = searchParams.get("month") || "";
  const time = searchParams.get("time") || "";
  const sortBy = "date-desc";
  const currentDate = getCurrentMonthAndYear();

  const monthParam =
    month === ""
      ? `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`
      : month;

  const { dailyBalance, isLoading: isLoadingDailyBalance } =
    useDailyBalance(monthParam);

  const { monthlyBalance, isLoading: isLoadingMonthlyBalance } =
    useMonthlyBalance(time);

  const { transactions, isLoading: isLoadingTransactions } = useTransactions(
    time,
    month,
    sortBy
  );

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

  if (isLoading || isLoadingTransactions) return <Spinner />;
  if (!bestBalance || !worstBalance) return <Spinner />;

  let monthData = [];
  let sortedByMonth = [];

  if (isLoading) return <Spinner />;

  if (!isLoading) {
    sortedByMonth = sortByMonth(transactions);
    if (!month) monthData = sortMonthData(transactions, currentDate);
    else monthData = sortMonthData(transactions, month);
  }

  const options = { month: "long", year: "numeric" };
  const currentMonth = currentDate.toLocaleDateString("en-US", options);

  const timeReport =
    time === "month"
      ? currentMonth
      : time === "year"
      ? currentDate.getFullYear()
      : time === "all"
      ? "all"
      : "Empty";

  const period =
    timeReport === "Empty"
      ? new Date(month).toLocaleDateString("en-US", options)
      : timeReport;

  return (
    <div className="flex flex-col gap-2 m-auto w-[80%] mb-10">
      <div className="flex flex-col gap-10 my-4">
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-xl font-semibold text-gray-800">
            Balance Report:<span className="text-green-500">{period}</span>
          </p>
          <button
            onClick={() => handleDownloadPDF("Balance", "")}
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-1"
          >
            Download
          </button>
        </div>
      </div>
      <div id="pdf-content">
        <div className="flex flex-col gap-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <ChartCard title="Net Balance Progress">
              <div></div>

              <AreaChartComponent
                dailyBalance={dailyBalance}
                monthlyBalance={monthlyBalance}
                currency={currentUser.currency}
              />
            </ChartCard>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-5 mt-5">
              <BalanceCard
                title={isMonthlyBalance ? "Best month" : "Best day"}
                date={bestBalance.date}
                balance={bestBalance.balance}
                color="green-500"
                percentage={bestBalanceDiff.toFixed(2)}
                currency={currentUser.currency}
              />
              <BalanceCard
                title={isMonthlyBalance ? "Worst month" : "Worst day"}
                date={worstBalance.date}
                balance={worstBalance.balance}
                color="red-500"
                percentage={worstBalanceDiff.toFixed(2)}
                currency={currentUser.currency}
              />
              <div className="">
                <BalanceCard
                  title="Average balance"
                  balance={averageBalance.toFixed(2)}
                  color="blue-500"
                  currency={currentUser.currency}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5 bg-gray-100 p-4 rounded-lg shadow-md">
            <ChartCard title="Income vs Expense (Line View)">
              <div></div>
              <PositiveAndNegativeBar
                data={sortedByMonth}
                monthData={monthData}
                currency={currentUser.currency}
              />
            </ChartCard>
            <ChartCard title="Income vs Expense (Bar View)">
              <div></div>
              <LineChartComponent
                data={sortedByMonth}
                monthData={monthData}
                currency={currentUser.currency}
              />
            </ChartCard>
          </div>
        </div>
        <div className="mt-6">
          <Table data={transactions} currency={currentUser.currency} />
        </div>
      </div>
    </div>
  );
}

export default BalanceReport;
