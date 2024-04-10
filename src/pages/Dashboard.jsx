import { BiDollar } from "react-icons/bi";
import { MdOutlineSavings } from "react-icons/md";
import { BiWallet } from "react-icons/bi";
import { BiReceipt } from "react-icons/bi";
import {
  calculateTotalAmountSaved,
  summarizeAmountsByCategory,
} from "../helpers/sortTransactions";
import { NavLink, Outlet } from "react-router-dom";
import { useTransactions } from "../features/transactions/useTransactions";

import SummaryCard from "../features/dashboard/SummaryCard";
import Spinner from "../ui/Spinner";
import TimeFilter from "../ui/TimeFilter";
import AddTransaction from "../ui/AddTransaction";
import { useSavings } from "../features/savings/useSavings";
import AddSavingGoal from "../ui/AddSavingGoal";

function Dashboard() {
  const { isLoading, transactions } = useTransactions();
  const { isLoading: isLoadingSavings, savings } = useSavings();
  console.log(transactions);

  if (isLoading || isLoadingSavings) return <Spinner />;

  const summarizedByCategory = summarizeAmountsByCategory(transactions);
  const savedSummary = calculateTotalAmountSaved(savings);
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
            amount={summarizedByCategory[0].amount}
            percentage="6"
            isActive={location.pathname === "/dashboard/income"}
          />
        </NavLink>
        <NavLink to="expenses" className="w-full">
          <SummaryCard
            icon={<BiReceipt />}
            name="Total expenses"
            amount={amounts[1]}
            percentage="6"
            isActive={location.pathname === "/dashboard/expenses"}
          />
        </NavLink>
        <NavLink to="savings" className="w-full">
          <SummaryCard
            icon={<MdOutlineSavings />}
            name="Savings"
            amount={savedSummary}
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
