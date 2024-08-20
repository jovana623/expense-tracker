import { NavLink, Outlet } from "react-router-dom";

import SummaryCard from "../features/dashboard/SummaryCard";
import TimeFilter from "../ui/TimeFilter";
import AddTransaction from "../features/transactions/AddTransaction";
import AddSavingGoal from "../ui/AddSavingGoal";

import { MdOutlineSavings } from "react-icons/md";
import { BiWallet } from "react-icons/bi";
import { BiReceipt } from "react-icons/bi";
import { MdOutlineEuroSymbol } from "react-icons/md";

import { summary } from "../helpers/sortTransactions";
import { useIncomeTransactions } from "../features/transactions/useIncomeTransactions";
import { useExpenseTransactions } from "../features/transactions/useExpenseTransactions";
import Spinner from "../ui/Spinner";

function Dashboard() {
  const { incomeTransactions, isLoading: isLoadingIncome } =
    useIncomeTransactions();
  const { expenseTransactions, isLoading: isLoadingExpense } =
    useExpenseTransactions();

  if (isLoadingIncome || isLoadingExpense) return <Spinner />;

  const incomeSummary = summary(incomeTransactions);

  const expensesSummary = summary(expenseTransactions);
  console.log(expenseTransactions);

  const savingsSummary = 240;

  const balance = incomeSummary - expensesSummary;

  return (
    <div className="py-2 px-7 overflow-y-scroll">
      <div className="flex justify-between items-center mb-3">
        {window.location.pathname === "/dashboard/savings" ? (
          <AddSavingGoal />
        ) : (
          <AddTransaction />
        )}
        <TimeFilter />
      </div>
      <div className="flex justify-between gap-7">
        <NavLink to="income" className="w-full">
          <SummaryCard
            icon={<MdOutlineEuroSymbol />}
            name="Total income"
            amount={incomeSummary}
            percentage="6"
            isActive={location.pathname === "/dashboard/income"}
          />
        </NavLink>
        <NavLink to="expenses" className="w-full">
          <SummaryCard
            icon={<BiReceipt />}
            name="Total expenses"
            amount={expensesSummary}
            percentage="6"
            isActive={location.pathname === "/dashboard/expenses"}
          />
        </NavLink>
        <NavLink to="balance" className="w-full">
          <SummaryCard
            icon={<BiWallet />}
            name="Balance"
            amount={balance}
            percentage="6"
            isActive={location.pathname === "/dashboard/balance"}
          />
        </NavLink>
        <NavLink to="savings" className="w-full">
          <SummaryCard
            icon={<MdOutlineSavings />}
            name="Savings"
            amount={savingsSummary}
            percentage="6"
            isActive={location.pathname === "/dashboard/savings"}
          />
        </NavLink>
      </div>
      <div className="mt-10">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
