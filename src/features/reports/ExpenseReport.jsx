import { useSearchParams } from "react-router-dom";
import { useCurrentUser } from "../authentification/useCurrentUser";
import { useTransactionStatistic } from "../transactions/useTransactionStatistic";
import { useExpenseTransactions } from "../transactions/useExpenseTransactions";
import { summarizeAmountsByType } from "../../helpers/sortTransactions";
import { handleDownloadPDF } from "../../helpers/pdfDownload";
import Spinner from "../../ui/Spinner";
import DetailedPieChart from "../../ui/DetailedPieChart";
import StatsTable from "../statistics/StatsTable";
import ReportCard from "./ReportCard";
import Table from "../../ui/Table";

function ExpenseReport() {
  const [searchParams] = useSearchParams();
  let time = searchParams.get("time") || "";
  let month = searchParams.get("month") || "";
  const sortBy = "date-desc";
  const { expenseTransactions, totalExpense, isLoading } =
    useExpenseTransactions(time, month, sortBy);
  const { statistic, isLoading: isLoadingStats } = useTransactionStatistic(
    time,
    month
  );

  const { data: currentUser, isLoading: isLoadingUser } = useCurrentUser();

  const summary = summarizeAmountsByType(expenseTransactions);
  const currentDate = new Date();
  const options = { month: "long", year: "numeric" };
  const currentMonth = currentDate.toLocaleDateString("en-US", options);
  const monthDate = new Date(month);
  const monthParam = monthDate.toLocaleDateString("en-US", options);

  if (isLoadingStats || isLoadingUser) return <Spinner />;

  const timeReport =
    time === "month"
      ? currentMonth
      : time === "year"
      ? currentDate.getFullYear()
      : time === "all"
      ? "all"
      : "Empty";

  const period = timeReport === "Empty" ? monthParam : timeReport;

  return (
    <div className="flex flex-col gap-5 m-auto w-[95%] md:w-[80%]">
      <div className="flex flex-col gap-10 my-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-xl font-semibold text-gray-800 md:text-left text-center">
            Expense Report: <span className="text-green-500">{period}</span>
          </p>
          <button
            onClick={() => handleDownloadPDF("Expense", period)}
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-1 self-center place-self-center"
          >
            Download
          </button>
        </div>
        <div id="pdf-content" className="flex flex-col gap-10">
          <div className="grid grid-cols-1 gap-5 bg-gray-100 p-4 rounded-lg shadow-md">
            <DetailedPieChart data={summary} currency={currentUser.currency} />

            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ReportCard
                  title="Top Expense"
                  subtitle={statistic.top_expense.name}
                  amount={statistic.top_expense.amount}
                  unit={currentUser.currency}
                />
                <ReportCard
                  title="Average Expense"
                  amount={statistic.avg_expense}
                  unit={currentUser.currency}
                />

                <ReportCard
                  title="Total Expense"
                  amount={totalExpense}
                  unit={currentUser.currency}
                />
              </div>

              <div>
                <p className="text-sm text-gray-700 uppercase mb-2">
                  Top expense types
                </p>
                <StatsTable
                  data={statistic.top_expense_types}
                  currency={currentUser.currency}
                />
              </div>
            </div>
          </div>

          <div>
            <Table
              data={expenseTransactions}
              isLoading={isLoading || isLoadingUser}
              currency={currentUser.currency}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseReport;
