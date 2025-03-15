import LimitsCard from "./LimitsCard";
import { useUsedBudget } from "./useUsedBudget";
import CardSkeleton from "../../ui/CardSkeleton";

function Limits() {
  const { usedBudget, isLoading } = useUsedBudget();
  const currency = localStorage.getItem("currency");

  return (
    <div className="rounded-md h-[100%]">
      <div className="grid sm:grid-cols-2 gap-20 mt-5">
        <div className="flex flex-col gap-8">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-stone-200 pb-2">
            Monthly Budgets
          </h2>
          <div className="grid md:grid-cols-2 gap-2">
            {isLoading
              ? Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-lg overflow-hidden p-3"
                  >
                    <CardSkeleton size={3} />
                  </div>
                ))
              : usedBudget
                  .filter((budget) => budget.period === "Monthly")
                  .map((budget) => (
                    <LimitsCard
                      key={budget.id}
                      data={budget}
                      currency={currency}
                    />
                  ))}
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-stone-200 pb-2">
            Yearly Budgets
          </h2>
          <div className="grid md:grid-cols-2 gap-2">
            {isLoading
              ? Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-lg overflow-hidden p-3"
                  >
                    <CardSkeleton size={3} />
                  </div>
                ))
              : usedBudget
                  .filter((budget) => budget.period === "Yearly")
                  .map((budget) => (
                    <LimitsCard
                      key={budget.id}
                      data={budget}
                      currency={currency}
                    />
                  ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Limits;
