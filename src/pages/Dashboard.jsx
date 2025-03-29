import {
  NavLink,
  Outlet,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useMemo } from "react";

import { MdOutlineSavings } from "react-icons/md";
import { BiWallet } from "react-icons/bi";
import { BiReceipt } from "react-icons/bi";
import { MdOutlineEuroSymbol } from "react-icons/md";

import { goalSummary, summary } from "../helpers/sortTransactions";
import { useSavings } from "../features/savings/useSavings";
import { useDashboardData } from "../features/transactions/useDashboardData";
import { useMonthlyBalance } from "../features/transactions/useMonthlyBalance";
import { useBalancePercentage } from "../features/dashboard/hooks/useBalancePercentage";

import SummaryCard from "../features/dashboard/SummaryCard";
import TimeFilter from "../ui/TimeFilter";
import AddForm from "../ui/AddForm";
import MonthFilter from "../ui/MonthFilter";
import CreateSavingGoalForm from "../features/savings/CreateSavingGoalForm";
import CreateTransactionForm from "../features/transactions/CreateTransactionForm";

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  let time = searchParams.get("time") || "";
  let month = searchParams.get("month") || "";
  const queryString = searchParams.toString()
    ? `?${searchParams.toString()}`
    : "";

  useEffect(() => {
    if (!searchParams.has("time") && !searchParams.has("month")) {
      setSearchParams({ time: "month" });
    }
  }, [searchParams, setSearchParams]);

  const { savings, isLoading: isLoadingSavings } = useSavings();

  const {
    monthlyData,
    yearlyData,
    totalIncome,
    totalExpense,
    isLoading: isLoadingDashboard,
  } = useDashboardData(time, month);

  const { monthlyBalance, isLoading: isLoadingBalance } = useMonthlyBalance();

  const { currentMonthBalance, balancePercentage } = useBalancePercentage(
    monthlyBalance,
    isLoadingBalance
  );

  console.log(savings);

  const savingsSummary = useMemo(() => summary(savings), [savings]);

  const savingGoalsSummary = useMemo(() => goalSummary(savings), [savings]);
  const percentageSaved = useMemo(
    () => ((savingsSummary / savingGoalsSummary) * 100).toFixed(1),
    [savingsSummary, savingGoalsSummary]
  );

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
            percentage="6"
            isActive={location.pathname === "/dashboard/income"}
            isLoading={isLoadingDashboard}
            reportPath="income"
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
            percentage="6"
            isActive={location.pathname === "/dashboard/expenses"}
            isLoading={isLoadingDashboard}
            reportPath="expense"
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
            isLoading={isLoadingBalance}
            reportPath="balance"
          />
        </NavLink>
        <NavLink to="savings" className="w-full">
          <SummaryCard
            icon={<MdOutlineSavings />}
            name="Savings"
            amount={savingsSummary}
            percentage={percentageSaved}
            isActive={location.pathname === "/dashboard/savings"}
            isLoading={isLoadingSavings}
            reportPath="savings"
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
