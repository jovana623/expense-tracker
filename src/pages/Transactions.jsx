import SortByTable from "../ui/SortByTable";
import { useTransactions } from "../features/transactions/useTransactions";
import { useSearchParams } from "react-router-dom";
import Search from "../ui/Search";
import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";
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

  return (
    <div>
      <div className="my-4 pr-10 flex justify-end items-center gap-4">
        <Search />
        <SortByTable />
        <TimeFilter />
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <div className="mx-10 h-[75vh]">
            <Table data={transactions.results} isLoading={isLoading} />
          </div>
          <Pagination
            page={page}
            numOfPages={Math.ceil(transactions.count / pageSize)}
            setPage={setPage}
          />
        </div>
      )}
    </div>
  );
}

export default Transactions;
