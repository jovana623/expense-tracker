import { NavLink, Outlet, useSearchParams } from "react-router-dom";

import SummaryCard from "../features/dashboard/SummaryCard";
import TimeFilter from "../ui/TimeFilter";
import AddTransaction from "../features/transactions/AddTransaction";
import AddSavingGoal from "../ui/AddSavingGoal";
import Spinner from "../ui/Spinner";
import MonthFilter from "../ui/MonthFilter";

import { MdOutlineSavings } from "react-icons/md";
import { BiWallet } from "react-icons/bi";
import { BiReceipt } from "react-icons/bi";
import { MdOutlineEuroSymbol } from "react-icons/md";

import { summary } from "../helpers/sortTransactions";
import { useIncomeTransactions } from "../features/transactions/useIncomeTransactions";
import { useExpenseTransactions } from "../features/transactions/useExpenseTransactions";
import { useSavings } from "../features/savings/useSavings";
import { useIncomeSummary } from "../features/transactions/useIncomeSummary";
import {
  calculateMonthPercentageDiff,
  calculateTwoMonthDiff,
  calculateYearPercentageDiff,
} from "../helpers/statistics";
import { useExpenseSummary } from "../features/transactions/useExpenseSummary";

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  let time = searchParams.get("time") || "";
  let month = searchParams.get("month") || "";
  let incomePercentage;
  let expensePercentage;

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
  const { savings, isLoading: isLoadingSavings } = useSavings();

  const {
    monthlyIncome,
    yearlyIncome,
    isLoading: isLoadingMI,
  } = useIncomeSummary();

  const {
    monthlyExpense,
    yearlyExpense,
    isLoading: isLoadingEI,
  } = useExpenseSummary();

  const isLoading =
    isLoadingIncome ||
    isLoadingExpense ||
    isLoadingSavings ||
    isLoadingMI ||
    isLoadingEI;

  if (month) {
    incomePercentage = calculateTwoMonthDiff(monthlyIncome, month);
    expensePercentage = calculateTwoMonthDiff(monthlyExpense, month);
  } else if (time === "month") {
    incomePercentage = calculateMonthPercentageDiff(monthlyIncome);
    expensePercentage = calculateMonthPercentageDiff(monthlyExpense);
  } else if (time === "year") {
    incomePercentage = calculateYearPercentageDiff(yearlyIncome);
    expensePercentage = calculateYearPercentageDiff(yearlyExpense);
  } else {
    incomePercentage = calculateMonthPercentageDiff(monthlyIncome);
    expensePercentage = calculateMonthPercentageDiff(monthlyExpense);
  }

  const savingsSummary = summary(savings);

  const balance = totalIncome - totalExpense;

  const numOfSavings =
    savings?.filter((saving) => saving.status === "In progress").length || 0;

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
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex justify-between gap-7">
          <NavLink to="income" className="w-full">
            <SummaryCard
              icon={<MdOutlineEuroSymbol />}
              name="Total income"
              amount={totalIncome}
              percentage={incomePercentage}
              isActive={location.pathname === "/dashboard/income"}
            />
          </NavLink>
          <NavLink to="expenses" className="w-full">
            <SummaryCard
              icon={<BiReceipt />}
              name="Total expenses"
              amount={totalExpense}
              percentage={expensePercentage}
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
              percentage={numOfSavings}
              isActive={location.pathname === "/dashboard/savings"}
            />
          </NavLink>
        </div>
      )}
      <div className="mt-10">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
