import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { summarizeAmountsByType } from "../../helpers/sortTransactions";
import { useExpenseTransactions } from "../transactions/useExpenseTransactions";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Pagination from "../../ui/Pagination";
import ChartCard from "../../ui/ChartCard";
import DetailedPieChart from "../../ui/DetailedPieChart";

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

  const currency = localStorage.getItem("currency");

  useEffect(() => {
    setSearchParams({ time, month, sortBy, page });
  }, [time, month, sortBy, page, setSearchParams]);

  const summary = expenseTransactions
    ? summarizeAmountsByType(expenseTransactions)
    : [];
  const numOfPages = paginatedTransactions
    ? Math.ceil(paginatedTransactions.count / pageSize)
    : [];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ChartCard title="Expenses breakdown">
          <div></div>
          {isLoading ? (
            <Spinner />
          ) : (
            <DetailedPieChart data={summary} currency={currency} />
          )}
        </ChartCard>
        <div className="flex flex-col gap-4">
          <div className="flex-grow">
            <Table
              data={paginatedTransactions?.results || []}
              isLoading={isLoading}
              currency={currency}
            />
          </div>
          <div className="mt-auto self-center">
            <Pagination page={page} numOfPages={numOfPages} setPage={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expenses;
