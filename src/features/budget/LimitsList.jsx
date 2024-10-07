import Spinner from "../../ui/Spinner";
import AddBudget from "./AddBudget";
import LimitsCard from "./LimitsCard";
import { useUsedBudget } from "./useUsedBudget";

function LimitsList() {
  const { usedBudget, isLoading } = useUsedBudget();
  if (isLoading) return <Spinner />;
  return (
    <div className="rounded-md h-[100%]">
      <div className="grid grid-cols-2 gap-2">
        {usedBudget.map((budget) => (
          <div key={budget.id}>
            <LimitsCard data={budget} />
          </div>
        ))}
        <AddBudget />
      </div>
    </div>
  );
}

export default LimitsList;
