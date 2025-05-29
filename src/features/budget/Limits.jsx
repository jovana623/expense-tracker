import { useBudgets } from "./useBudgets";
import LimitsCard from "./LimitsCard";
import CardSkeleton from "../../ui/CardSkeleton";

function Limits() {
  const { budgets, isLoading } = useBudgets();
  const currency = localStorage.getItem("currency");

  const renderSkeletons = (count) =>
    Array.from({ length: count }).map((_, index) => (
      <div
        key={`skeleton-${index}`}
        className="bg-white shadow-lg rounded-xl overflow-hidden dark:bg-gray-700 dark:border dark:border-gray-600 p-6"
      >
        <CardSkeleton size={3} />{" "}
      </div>
    ));

  const renderBudgets = (filteredBudgets) =>
    filteredBudgets.map((budget) => (
      <LimitsCard key={budget.id} data={budget} currency={currency} />
    ));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
      <section className="flex flex-col gap-y-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 border-b border-gray-300 pb-3 dark:text-gray-200 dark:border-gray-500">
          Monthly Budgets
        </h2>
        {budgets?.filter((b) => b.period === "Monthly").length === 0 &&
          !isLoading && (
            <p className="text-gray-500 dark:text-gray-400">
              No monthly budgets found.
            </p>
          )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading
            ? renderSkeletons(2)
            : renderBudgets(
                budgets.filter((budget) => budget.period === "Monthly")
              )}
        </div>
      </section>

      <section className="flex flex-col gap-y-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 border-b border-gray-300 pb-3 dark:text-gray-200 dark:border-gray-500">
          Yearly Budgets
        </h2>
        {budgets?.filter((b) => b.period === "Yearly").length === 0 &&
          !isLoading && (
            <p className="text-gray-500 dark:text-gray-400">
              No yearly budgets found.
            </p>
          )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading
            ? renderSkeletons(2)
            : renderBudgets(
                budgets.filter((budget) => budget.period === "Yearly")
              )}
        </div>
      </section>
    </div>
  );
}

export default Limits;
