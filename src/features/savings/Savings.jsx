import { useEffect, useState } from "react";
import { useSaving } from "./useSaving";
import { useSavings } from "./useSavings";
import Spinner from "../../ui/Spinner";
import SavingsDetailCard from "./SavingsDetailCard";
import VerticalCarousel from "./VerticalCarousel";
import CardSkeleton from "../../ui/CardSkeleton";

function Savings() {
  const { savings, isLoading: isLoadingSavings } = useSavings();
  const [activeSaving, setActiveSaving] = useState(null);
  const { saving: currentSaving, isLoading: isLoadingCurrentSaving } =
    useSaving(activeSaving);
  const currency = localStorage.getItem("currency");

  useEffect(() => {
    if (savings?.length > 0 && activeSaving === null) {
      setActiveSaving(savings[0].id);
    }
  }, [savings, activeSaving]);

  function handleCardChange(value) {
    setActiveSaving(value);
  }

  if (isLoadingSavings) {
    return (
      <div className="md:grid-cols-[1fr_1fr] gap-10 grid grid-cols-1">
        <Spinner />
        <CardSkeleton />
      </div>
    );
  }

  if (!savings || savings.length === 0) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-300 p-8">
        No savings added yet. Start by adding a new saving goal!
      </div>
    );
  }

  return (
    <div className="md:grid-cols-[1fr_1fr] gap-10 grid grid-cols-1">
      <SavingsDetailCard
        currentSaving={currentSaving}
        currency={currency}
        isLoading={isLoadingCurrentSaving}
      />

      <div>
        <VerticalCarousel
          savings={savings || []}
          onCardChange={handleCardChange}
          activeSaving={activeSaving}
          currency={currency}
          isLoading={isLoadingSavings}
        />
      </div>
    </div>
  );
}

export default Savings;
