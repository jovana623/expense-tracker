import Spinner from "../../ui/Spinner";
import LimitsCard from "./LimitsCard";
import { useUsedBudget } from "./useUsedBudget";

function Limits() {
  const { usedBudget, isLoading } = useUsedBudget();
  if (isLoading) return <Spinner />;
  return (
    <div className="rounded-md h-[100%]">
      <div className="grid sm:grid-cols-2 gap-20 mt-5">
        <div className="flex flex-col gap-8">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-stone-200 pb-2">
            Monthly Budgets
          </h2>
          <div className="grid md:grid-cols-2 gap-2">
            {usedBudget
              .filter((budget) => budget.period === "Monthly")
              .map((budget) => (
                <div key={budget.id}>
                  <LimitsCard data={budget} />
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-stone-200 pb-2">
            Yearly Budgets
          </h2>
          <div className="grid md:grid-cols-2 gap-2">
            {usedBudget
              .filter((budget) => budget.period === "Yearly")
              .map((budget) => (
                <div key={budget.id}>
                  <LimitsCard data={budget} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Limits;
