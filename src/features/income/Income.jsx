import Spinner from "../../ui/Spinner";
import { summarizeAmountsByType } from "../../helpers/sortTransactions";
import { useIncomeTransactions } from "../transactions/useIncomeTransactions";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import { useEffect, useState } from "react";
import ChartCard from "../../ui/ChartCard";
import Table from "../../ui/Table";
import DetailedPieChart from "../../ui/DetailedPieChart";

function Income() {
  const [searchParams, setSearchParams] = useSearchParams();
  const time = searchParams.get("time") || "";
  const month = searchParams.get("month") || "";
  const sortBy = searchParams.get("sortBy") || "date-desc";
  const pageParams = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageParams);
  const [pageSize] = useState(4);

  const { incomeTransactions, paginatedTransactions, isLoading } =
    useIncomeTransactions(time, month, sortBy, page, pageSize);

  useEffect(() => {
    setSearchParams({ time, month, sortBy, page });
  }, [time, month, sortBy, page, setSearchParams]);

  if (isLoading) return <Spinner />;
  const summary = summarizeAmountsByType(incomeTransactions);
  const numOfPages = Math.ceil(paginatedTransactions.count / pageSize);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 h-full">
        <ChartCard title="Income Breakdown">
          <div></div>
          <DetailedPieChart data={summary} />
        </ChartCard>
        <div className="flex flex-col gap-4">
          <div className="flex-grow">
            <Table data={paginatedTransactions.results} isLoading={isLoading} />
          </div>
          <div className="mt-auto self-center">
            <Pagination page={page} numOfPages={numOfPages} setPage={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Income;
