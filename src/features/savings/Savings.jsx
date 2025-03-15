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
  const { saving: currentSaving, isLoading } = useSaving(activeSaving);
  const currency = localStorage.getItem("currency");

  useEffect(() => {
    if (savings?.length > 0) {
      setActiveSaving(savings[0].id);
    }
  }, [savings]);

  if (!currentSaving) return null;

  function handleCardChange(value) {
    setActiveSaving(value);
  }

  return (
    <div className="md:grid-cols-[1fr_1fr] gap-10 grid grid-cols-1">
      {isLoading || isLoadingSavings ? (
        <Spinner />
      ) : (
        <SavingsDetailCard currentSaving={currentSaving} currency={currency} />
      )}
      <div>
        {isLoading || isLoadingSavings ? (
          <CardSkeleton />
        ) : (
          <VerticalCarousel
            savings={savings || []}
            onCardChange={handleCardChange}
            activeSaving={activeSaving}
            currency={currency}
          />
        )}
      </div>
    </div>
  );
}

export default Savings;
