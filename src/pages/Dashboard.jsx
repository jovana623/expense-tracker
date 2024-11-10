import { NavLink, Outlet, useSearchParams } from "react-router-dom";

import SummaryCard from "../features/dashboard/SummaryCard";
import TimeFilter from "../ui/TimeFilter";
import AddForm from "../ui/AddForm";
import MonthFilter from "../ui/MonthFilter";
import CreateSavingGoalForm from "../features/savings/CreateSavingGoalForm";

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
  calculateMonthlyPercentageChange,
  calculateTwoMonthsPercentageChange,
  calculateYearlyPercentageChange,
} from "../helpers/statistics";
import { useExpenseSummary } from "../features/transactions/useExpenseSummary";
import { useEffect } from "react";
import CreateTransactionForm from "../features/transactions/CreateTransactionForm";

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

  useEffect(() => {
    if (!time && !month) {
      searchParams.set("time", "month");
      setSearchParams(searchParams);
    }
  });

  const { totalIncome, isLoading: isLoadingIncome } = useIncomeTransactions(
    time,
    month
  );

  const { totalExpense, isLoading: isLoadingExpense } = useExpenseTransactions(
    time,
    month
  );
  const { savings, isLoading: isLoadingSavings } = useSavings();

  const { monthlyIncome, yearlyIncome } = useIncomeSummary();

  const { monthlyExpense, yearlyExpense } = useExpenseSummary();

  if (month) {
    incomePercentage = calculateTwoMonthsPercentageChange(monthlyIncome, month);
    expensePercentage = calculateTwoMonthsPercentageChange(
      monthlyExpense,
      month
    );
  } else if (time === "month") {
    incomePercentage = calculateMonthlyPercentageChange(monthlyIncome);
    expensePercentage = calculateMonthlyPercentageChange(monthlyExpense);
  } else if (time === "year") {
    incomePercentage = calculateYearlyPercentageChange(yearlyIncome);
    expensePercentage = calculateYearlyPercentageChange(yearlyExpense);
  } else {
    incomePercentage = calculateMonthlyPercentageChange(monthlyIncome);
    expensePercentage = calculateMonthlyPercentageChange(monthlyExpense);
  }
  const savingsSummary = summary(savings);

  const balance = totalIncome - totalExpense;

  const numOfSavings =
    savings?.filter((saving) => saving.status === "In progress").length || 0;

  return (
    <div className="w-[90%] m-auto py-2 sm:px-7 sm:w-full sm:m-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-between items-center mb-3">
        {window.location.pathname === "/dashboard/savings" ? (
          <div className="w-15 m-auto md:m-0 sm:m-0">
            <AddForm title="saving goal">
              <CreateSavingGoalForm />
            </AddForm>
          </div>
        ) : (
          <div className="w-15 m-auto md:m-0 sm:m-0">
            <AddForm title="transaction">
              <CreateTransactionForm />
            </AddForm>
          </div>
        )}
        <div className="flex gap-2 m-auto md:m-0 sm:m-0 md:justify-self-end">
          <MonthFilter />
          <TimeFilter />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7">
        <NavLink to="income" className="w-full">
          <SummaryCard
            icon={<MdOutlineEuroSymbol />}
            name="Total income"
            amount={totalIncome}
            percentage={incomePercentage}
            isActive={location.pathname === "/dashboard/income"}
            isLoading={isLoadingIncome}
          />
        </NavLink>
        <NavLink to="expenses" className="w-full">
          <SummaryCard
            icon={<BiReceipt />}
            name="Total expenses"
            amount={totalExpense}
            percentage={expensePercentage}
            isActive={location.pathname === "/dashboard/expenses"}
            isLoading={isLoadingExpense}
          />
        </NavLink>
        <NavLink to="balance" className="w-full">
          <SummaryCard
            icon={<BiWallet />}
            name="Balance"
            amount={balance}
            percentage="6"
            isActive={location.pathname === "/dashboard/balance"}
            isLoading={isLoadingIncome || isLoadingExpense}
          />
        </NavLink>
        <NavLink to="savings" className="w-full">
          <SummaryCard
            icon={<MdOutlineSavings />}
            name="Savings"
            amount={savingsSummary}
            percentage={numOfSavings}
            isActive={location.pathname === "/dashboard/savings"}
            isLoading={isLoadingSavings}
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
