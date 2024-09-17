import { FiArrowUpRight } from "react-icons/fi";
import Spinner from "../ui/Spinner";
import Table from "../ui/Table";
import TimeFilter from "../ui/TimeFilter";
import SortByTable from "../ui/SortByTable";
import { useTransactions } from "../features/transactions/useTransactions";
import { useSearchParams } from "react-router-dom";
import Search from "../ui/Search";

function Transactions() {
  const [searchParams] = useSearchParams();
  const time = searchParams.get("time") || "";
  const month = searchParams.get("month") || "";
  const sortBy = searchParams.get("sortBy") || "date-desc";
  const search = searchParams.get("search") || "";

  const { transactions, isLoading } = useTransactions(
    time,
    month,
    sortBy,
    search
  );

  return (
    <div>
      <div className="my-2 mx-10 flex justify-end gap-5">
        <Search />
        <SortByTable />
        <TimeFilter />
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="mx-10 h-[75vh]">
          {transactions.length === 0 ? (
            "No transactions"
          ) : (
            <Table
              data={transactions}
              isLoading={isLoading}
              arrow={<FiArrowUpRight />}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Transactions;
