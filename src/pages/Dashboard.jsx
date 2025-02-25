import {
  NavLink,
  Outlet,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useEffect } from "react";

import { MdOutlineSavings } from "react-icons/md";
import { BiWallet } from "react-icons/bi";
import { BiReceipt } from "react-icons/bi";
import { MdOutlineEuroSymbol } from "react-icons/md";

import { goalSummary, summary } from "../helpers/sortTransactions";
import { useIncomeTransactions } from "../features/transactions/useIncomeTransactions";
import { useExpenseTransactions } from "../features/transactions/useExpenseTransactions";
import { useSavings } from "../features/savings/useSavings";
import { useIncomeSummary } from "../features/transactions/useIncomeSummary";
import { useMonthlyBalance } from "../features/transactions/useMonthlyBalance";
import { useExpenseSummary } from "../features/transactions/useExpenseSummary";
import { useBalancePercentage } from "../features/dashboard/hooks/useBalancePercentage";
import { useIncomeExpensePercentage } from "../features/dashboard/hooks/useIncomeExpensePercentage";

import SummaryCard from "../features/dashboard/SummaryCard";
import TimeFilter from "../ui/TimeFilter";
import AddForm from "../ui/AddForm";
import MonthFilter from "../ui/MonthFilter";
import CreateSavingGoalForm from "../features/savings/CreateSavingGoalForm";
import CreateTransactionForm from "../features/transactions/CreateTransactionForm";
import { useCurrentUser } from "../features/authentification/useCurrentUser";

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  let time = searchParams.get("time") || "";
  let month = searchParams.get("month") || "";
  const queryString = searchParams.toString()
    ? `?${searchParams.toString()}`
    : "";

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

  const { monthlyBalance, isLoading: isLoadingBalance } = useMonthlyBalance();

  const { incomePercentage, expensePercentage } = useIncomeExpensePercentage(
    time,
    month,
    monthlyIncome,
    monthlyExpense,
    yearlyIncome,
    yearlyExpense
  );

  const { currentMonthBalance, balancePercentage } = useBalancePercentage(
    monthlyBalance,
    isLoadingBalance
  );

  const savingsSummary = summary(savings);

  const savingGoalsSummary = goalSummary(savings);
  const percentageSaved = ((savingsSummary / savingGoalsSummary) * 100).toFixed(
    1
  );

  const { data: currentUser, isLoadingUser } = useCurrentUser();
  console.log(currentUser);

  return (
    <div className="w-[90%] m-auto py-2 sm:px-7 sm:w-full sm:m-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-between items-center mb-3">
        {location.pathname === "/dashboard/savings" ? (
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
        {window.location.pathname === "/dashboard/savings" ? (
          <div></div>
        ) : (
          <div className="flex gap-2 m-auto md:m-0 sm:m-0 md:justify-self-end">
            <MonthFilter />
            <TimeFilter />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7">
        <NavLink
          to={`income${queryString}`}
          className="w-full"
          onClick={(e) => {
            if (location.pathname === "/dashboard/income") {
              e.preventDefault();
            }
          }}
          aria-disabled={location.pathname === "/dashboard/income"}
        >
          <SummaryCard
            icon={<MdOutlineEuroSymbol />}
            name="Total income"
            amount={totalIncome}
            percentage={incomePercentage}
            isActive={location.pathname === "/dashboard/income"}
            isLoading={isLoadingIncome || isLoadingUser}
            reportPath="income"
            currency={currentUser?.currency}
          />
        </NavLink>
        <NavLink
          to={`expenses${queryString}`}
          className="w-full"
          onClick={(e) => {
            if (location.pathname === "/dashboard/expenses") {
              e.preventDefault();
            }
          }}
          aria-disabled={location.pathname === "/dashboard/expenses"}
        >
          <SummaryCard
            icon={<BiReceipt />}
            name="Total expenses"
            amount={totalExpense}
            percentage={expensePercentage}
            isActive={location.pathname === "/dashboard/expenses"}
            isLoading={isLoadingExpense || isLoadingUser}
            reportPath="expense"
            currency={currentUser?.currency}
          />
        </NavLink>
        <NavLink
          to={`balance${queryString}`}
          className="w-full"
          onClick={(e) => {
            if (location.pathname === "/dashboard/balance") {
              e.preventDefault();
            }
          }}
          aria-disabled={location.pathname === "/dashboard/balance"}
        >
          <SummaryCard
            icon={<BiWallet />}
            name="current balance"
            amount={currentMonthBalance}
            percentage={balancePercentage.toFixed(2)}
            isActive={location.pathname === "/dashboard/balance"}
            isLoading={isLoadingBalance || isLoadingUser}
            reportPath="balance"
            currency={currentUser?.currency}
          />
        </NavLink>
        <NavLink to="savings" className="w-full">
          <SummaryCard
            icon={<MdOutlineSavings />}
            name="Savings"
            amount={savingsSummary}
            percentage={percentageSaved}
            isActive={location.pathname === "/dashboard/savings"}
            isLoading={isLoadingSavings || isLoadingUser}
            reportPath="savings"
            currency={currentUser?.currency}
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
