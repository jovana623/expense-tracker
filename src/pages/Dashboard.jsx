import { MdOutlineSavings } from "react-icons/md";
import { BiWallet } from "react-icons/bi";
import { BiReceipt } from "react-icons/bi";
import { calculateTotalAmount } from "../helpers/sortTransactions";
import { NavLink, Outlet } from "react-router-dom";
import SummaryCard from "../features/dashboard/SummaryCard";
import Spinner from "../ui/Spinner";
import TimeFilter from "../ui/TimeFilter";
import AddTransaction from "../ui/AddTransaction";
import { useSavings } from "../features/savings/useSavings";
import AddSavingGoal from "../ui/AddSavingGoal";
import { useIncomeTransactions } from "../features/income/useIncomeTransactions";
import { useExpensesTransactions } from "../features/expenses/useExpensesTransactions";
import { MdOutlineEuroSymbol } from "react-icons/md";

function Dashboard() {
  const { incomeTransactions, isLoading: isLoadingIncome } =
    useIncomeTransactions();
  const { expensesTransactions, isLoading: isLoadingExpenses } =
    useExpensesTransactions();
  const { savings, isLoading: isLoadingSavings } = useSavings();

  if (isLoadingSavings || isLoadingIncome || isLoadingExpenses)
    return <Spinner />;

  const incomeSummary = incomeTransactions
    ? calculateTotalAmount(incomeTransactions)
    : [];

  const expensesSummary = expensesTransactions
    ? calculateTotalAmount(expensesTransactions)
    : [];

  const savingsSummary = savings ? calculateTotalAmount(savings) : [];

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
        <NavLink to="savings" className="w-full">
          <SummaryCard
            icon={<MdOutlineSavings />}
            name="Savings"
            amount={savingsSummary}
            percentage="6"
            isActive={location.pathname === "/dashboard/savings"}
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
      </div>
      <div className="mt-10">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
