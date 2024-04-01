import Table from "../ui/Table";
import Spinner from "../ui/Spinner";
import { FiArrowDownLeft } from "react-icons/fi";
import { useTransactions } from "../features/dashboard/useTransactions";

function Transactions() {
  const { isLoading, transactions } = useTransactions();

  if (isLoading) return <Spinner />;

  return (
    <div className="mt-10 mx-10 h-screen">
      <Table
        data={transactions}
        arrow={<FiArrowDownLeft />}
        isLoading={isLoading}
      ></Table>
    </div>
  );
}

export default Transactions;
