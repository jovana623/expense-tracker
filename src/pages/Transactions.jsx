import { FiArrowUpRight } from "react-icons/fi";
import Spinner from "../ui/Spinner";
import Table from "../ui/Table";
import TimeFilter from "../ui/TimeFilter";
import SortByTable from "../ui/SortByTable";
import { useTransactions } from "../features/transactions/useTransactions";
import { useSearchParams } from "react-router-dom";

function Transactions() {
  const [searchParams] = useSearchParams();
  const time = searchParams.get("time") || "";
  const month = searchParams.get("month") || "";
  const sortBy = searchParams.get("sortBy") || "date-desc";
  const { transactions, isLoading } = useTransactions(time, month, sortBy);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="my-2 mx-10 flex justify-end gap-5">
        <SortByTable />
        <TimeFilter />
      </div>
      <div className="mx-10 h-[75vh]">
        <Table
          data={transactions}
          isLoading={isLoading}
          arrow={<FiArrowUpRight />}
        />
      </div>
    </div>
  );
}

export default Transactions;
