import { useEffect, useState } from "react";
import { useTransactions } from "../features/transactions/useTransactions";
import { useSearchParams } from "react-router-dom";

import SortByTable from "../ui/SortByTable";
import Search from "../ui/Search";
import Pagination from "../ui/Pagination";
import Table from "../ui/Table";
import TimeFilter from "../ui/TimeFilter";

function Transactions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const time = searchParams.get("time") || "";
  const month = searchParams.get("month") || "";
  const sortBy = searchParams.get("sortBy") || "date-desc";
  const search = searchParams.get("search") || "";
  const pageParams = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageParams);
  const [pageSize] = useState(7);

  const { transactions, isLoading } = useTransactions(
    time,
    month,
    sortBy,
    search,
    page,
    pageSize
  );
  const currency = localStorage.getItem("currency");

  useEffect(() => {
    if (!searchParams.get("time")) {
      setSearchParams({ time: "month", month, sortBy, search, page });
    }
  }, [searchParams, month, sortBy, search, page, setSearchParams]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="my-4 px-4 sm:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="w-full md:flex-grow md:max-w-xs">
          <Search />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <SortByTable />
          <TimeFilter />
        </div>
      </div>

      <div className="flex-grow overflow-auto px-4 sm:px-10">
        <Table
          data={transactions?.results || []}
          isLoading={isLoading}
          currency={currency}
        />
      </div>

      <div className="sticky bottom-0 z-10 bg-white dark:bg-gray-800 py-4 mt-4 px-4 sm:px-10 border-t border-gray-200 dark:border-gray-700">
        <Pagination
          page={page}
          numOfPages={
            transactions ? Math.ceil(transactions.count / pageSize) : 1
          }
          setPage={setPage}
        />
      </div>
    </div>
  );
}

export default Transactions;
