import { FiArrowUpRight } from "react-icons/fi";
import Table from "../ui/Table";
import TimeFilter from "../ui/TimeFilter";
import SortByTable from "../ui/SortByTable";
import { useTransactions } from "../features/transactions/useTransactions";
import { useSearchParams } from "react-router-dom";
import Search from "../ui/Search";
import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";
import Pagination from "../ui/Pagination";

function Transactions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const time = searchParams.get("time") || "";
  const month = searchParams.get("month") || "";
  const sortBy = searchParams.get("sortBy") || "date-desc";
  const search = searchParams.get("search") || "";
  const pageParams = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageParams);
  const [pageSize] = useState(9);

  const { transactions, isLoading } = useTransactions(
    time,
    month,
    sortBy,
    search,
    page,
    pageSize
  );

  useEffect(() => {
    setSearchParams({ time, month, sortBy, search, page });
  }, [time, month, sortBy, search, page, setSearchParams]);

  if (isLoading) return <Spinner />;

  const numOfPages = Math.ceil(transactions.count / pageSize);

  return (
    <div>
      <div className="my-4 ml-11 flex justify-between">
        <Search />
        <div className="flex mx-10 gap-5">
          <SortByTable />
          <TimeFilter />
        </div>
      </div>

      <div className="mx-10 h-[75vh]">
        <Table
          data={transactions.results}
          isLoading={isLoading}
          arrow={<FiArrowUpRight />}
        />
      </div>
      <Pagination page={page} numOfPages={numOfPages} setPage={setPage} />
    </div>
  );
}

export default Transactions;
