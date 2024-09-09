import { NavLink, Outlet, useSearchParams } from "react-router-dom";

import SummaryCard from "../features/dashboard/SummaryCard";
import TimeFilter from "../ui/TimeFilter";
import AddTransaction from "../features/transactions/AddTransaction";
import AddSavingGoal from "../ui/AddSavingGoal";
import Spinner from "../ui/Spinner";

import { MdOutlineSavings } from "react-icons/md";
import { BiWallet } from "react-icons/bi";
import { BiReceipt } from "react-icons/bi";
import { MdOutlineEuroSymbol } from "react-icons/md";

import { summary } from "../helpers/sortTransactions";
import { useIncomeTransactions } from "../features/transactions/useIncomeTransactions";
import { useExpenseTransactions } from "../features/transactions/useExpenseTransactions";
import { useSavings } from "../features/savings/useSavings";
import MonthFilter from "../ui/MonthFilter";
import { useIncomeDifference } from "../hooks/useIncomeDifference";

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  let time = searchParams.get("time") || "";
  let month = searchParams.get("month") || "";

  if (month && time) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("time");
    setSearchParams(newSearchParams);
  }

  const { totalIncome, isLoading: isLoadingIncome } = useIncomeTransactions(
    time,
    month
  );
  const { totalExpense, isLoading: isLoadingExpense } = useExpenseTransactions(
    time,
    month
  );
  const { percentage: percentageIncome, isLoadingPercentageI } =
    useIncomeDifference(time, month);
  const { percentage: percentageExpense, isLoadingPercentageE } =
    useIncomeDifference(time, month);
  const { savings, isLoading: isLoadingSavings } = useSavings();

  if (
    isLoadingIncome ||
    isLoadingExpense ||
    isLoadingSavings ||
    isLoadingPercentageE ||
    isLoadingPercentageI
  )
    return <Spinner />;

  const savingsSummary = summary(savings);

  const balance = totalIncome - totalExpense;

  return (
    <div className="py-2 px-7 overflow-y-scroll">
      <div className="flex justify-between items-center mb-3">
        {window.location.pathname === "/dashboard/savings" ? (
          <AddSavingGoal />
        ) : (
          <AddTransaction />
        )}
        <div className="flex gap-2">
          <MonthFilter />
          <TimeFilter />
        </div>
      </div>
      <div className="flex justify-between gap-7">
        <NavLink to="income" className="w-full">
          <SummaryCard
            icon={<MdOutlineEuroSymbol />}
            name="Total income"
            amount={totalIncome}
            percentage={percentageIncome}
            isActive={location.pathname === "/dashboard/income"}
          />
        </NavLink>
        <NavLink to="expenses" className="w-full">
          <SummaryCard
            icon={<BiReceipt />}
            name="Total expenses"
            amount={totalExpense}
            percentage={percentageExpense}
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
