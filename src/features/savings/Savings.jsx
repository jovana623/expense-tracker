import { useEffect, useState } from "react";
import { useSaving } from "./useSaving";
import { useSavings } from "./useSavings";
import { useCurrentUser } from "../authentification/useCurrentUser";
import Spinner from "../../ui/Spinner";
import SavingsDetailCard from "./SavingsDetailCard";
import VerticalCarousel from "./VerticalCarousel";
import CardSkeleton from "../../ui/CardSkeleton";

function Savings() {
  const { savings, isLoading: isLoadingSavings } = useSavings();
  const [activeSaving, setActiveSaving] = useState(null);
  const { data: currentUser, isLoading: isLoadingUser } = useCurrentUser();
  const { saving: currentSaving, isLoading } = useSaving(activeSaving);

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
      {isLoading || isLoadingSavings || isLoadingUser ? (
        <Spinner />
      ) : (
        <SavingsDetailCard
          currentSaving={currentSaving}
          currency={currentUser.currency}
        />
      )}
      <div>
        {isLoading || isLoadingSavings ? (
          <CardSkeleton />
        ) : (
          <VerticalCarousel
            savings={savings || []}
            onCardChange={handleCardChange}
            activeSaving={activeSaving}
            currency={currentUser.currency}
          />
        )}
      </div>
    </div>
  );
}

export default Savings;
