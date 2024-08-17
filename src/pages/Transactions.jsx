import { FiArrowUpRight } from "react-icons/fi";

import Spinner from "../ui/Spinner";
import Table from "../ui/Table";
import TimeFilter from "../ui/TimeFilter";
import SortByTable from "../ui/SortByTable";

import { useIncomeTransactions } from "../features/transactions/useIncomeTransactions";
import { useExpenseTransactions } from "../features/transactions/useExpenseTransactions";

function Transactions() {
  const { incomeTransactions, isLoading: isLoadingIncome } =
    useIncomeTransactions();

  const { expensesTransactions, isLoading: isLoadingExpenses } =
    useExpenseTransactions();

  if (isLoadingIncome || isLoadingExpenses) return <Spinner />;
  const allTransactions = incomeTransactions?.concat(expensesTransactions);
  console.log(allTransactions);

  return (
    <div>
      <div className="my-2 mx-10 flex justify-end gap-5">
        <SortByTable />
        <TimeFilter />
      </div>
      <div className="mx-10 h-[75vh]">
        <Table
          data={allTransactions}
          isLoading={isLoadingIncome || isLoadingExpenses}
          arrow={<FiArrowUpRight />}
        />
      </div>
    </div>
  );
}

export default Transactions;
