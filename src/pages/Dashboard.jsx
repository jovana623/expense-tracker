import { BiDollar } from "react-icons/bi";
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

function Dashboard() {
  const { incomeTransactions, isLoading: isLoadingIncome } =
    useIncomeTransactions();
  const { expensesTransactions, isLoading: isLoadingExpenses } =
    useExpensesTransactions();
  const { isLoading: isLoadingSavings, savings } = useSavings();

  if (isLoadingSavings || isLoadingIncome || isLoadingExpenses)
    return <Spinner />;

  const incomeSummary = incomeTransactions
    ? calculateTotalAmount(incomeTransactions)
    : [];

  const expensesSummary = expensesTransactions
    ? calculateTotalAmount(expensesTransactions)
    : [];

  const amounts = [45200, 24500, 21200, 46000];

  return (
    <div className="p-2 px-7 overflow-y-scroll">
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
            icon={<BiDollar />}
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
            amount={10200}
            percentage="6"
            isActive={location.pathname === "/dashboard/savings"}
          />
        </NavLink>
        <NavLink to="investments" className="w-full">
          <SummaryCard
            icon={<BiWallet />}
            name="Investments"
            amount={amounts[3]}
            percentage="6"
            isActive={location.pathname === "/dashboard/investments"}
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
