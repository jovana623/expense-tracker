import Spinner from "../../ui/Spinner";
import PieChartCard from "../dashboard/PieChartCard";
import PieChartComponent from "../../ui/PieChartComponent";
import { summarizeAmountsByType } from "../../helpers/sortTransactions";
import Table from "../../ui/Table";
import { FiArrowDownLeft } from "react-icons/fi";
import { useTransactions } from "../transactions/useTransactions";
import { useUser } from "../authentification/useUser";

function Income() {
  const { data: user, isLoadingUser } = useUser();
  const { isLoading, transactions: incomeTransactions } = useTransactions(
    "Income",
    user.user.id
  );

  console.log(user);
  console.log(incomeTransactions);

  const summary = incomeTransactions
    ? summarizeAmountsByType(incomeTransactions)
    : [];

  if (isLoading || isLoadingUser) return <Spinner />;

  return (
    <div>
      <div className="flex gap-12 h-80">
        <PieChartCard>
          <PieChartComponent data={summary}></PieChartComponent>
        </PieChartCard>
        <Table
          data={incomeTransactions}
          arrow={<FiArrowDownLeft />}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default Income;
