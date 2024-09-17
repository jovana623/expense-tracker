import { useExpenseTransactions } from "../transactions/useExpenseTransactions";
import { useSearchParams } from "react-router-dom";
import { summarizeAmountsByType } from "../../helpers/sortTransactions";
import PieChartComponent from "../../ui/PieChartComponent";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import PieChartCard from "../dashboard/PieChartCard";
import { useEffect, useState } from "react";
import Pagination from "../../ui/Pagination";

function Expenses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const time = searchParams.get("time") || "";
  const month = searchParams.get("month") || "";
  const sortBy = searchParams.get("sortBy") || "date-desc";
  const pageParams = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageParams);
  const [pageSize] = useState(4);

  const { expenseTransactions, paginatedTransactions, isLoading } =
    useExpenseTransactions(time, month, sortBy, page, pageSize);

  useEffect(() => {
    setSearchParams({ time, month, sortBy, page });
  }, [time, month, sortBy, page, setSearchParams]);

  if (isLoading) return <Spinner />;

  const summarizedByType = summarizeAmountsByType(expenseTransactions);
  const numOfPages = Math.ceil(paginatedTransactions.count / pageSize);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <PieChartCard>
          <PieChartComponent data={summarizedByType}></PieChartComponent>
        </PieChartCard>
        <div className="flex flex-col gap-4">
          <Table data={paginatedTransactions.results} isLoading={isLoading} />
          <div className="mt-4">
            <Pagination page={page} numOfPages={numOfPages} setPage={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expenses;
