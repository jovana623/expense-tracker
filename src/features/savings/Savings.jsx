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

  useEffect(() => {
    if (savings?.length > 0) {
      setActiveSaving(savings[0].id);
    }
  }, [savings]);

  const { saving, isLoading } = useSaving(activeSaving);

  if (!saving) return null;

  function handleCardChange(value) {
    setActiveSaving(value);
  }

  return (
    <div className="md:grid-cols-[1fr_1fr] gap-10 grid grid-cols-1">
      {isLoading || isLoadingSavings ? (
        <Spinner />
      ) : (
        <SavingsDetailCard saving={saving} />
      )}
      <div>
        {isLoading || isLoadingSavings ? (
          <CardSkeleton />
        ) : (
          <VerticalCarousel
            savings={savings || []}
            onCardChange={handleCardChange}
            activeSaving={activeSaving}
          />
        )}
      </div>
    </div>
  );
}

export default Savings;
