import { useState } from "react";
import Spinner from "../../ui/Spinner";
import SavingsCarousel from "./SavingsCarousel";

import SavingsDetailCard from "./SavingsDetailCard";
import { useSaving } from "./useSaving";
import { useSavings } from "./useSavings";

function Savings() {
  const [activeSaving, setActiveSaving] = useState(1);
  const { savings, isLoading: isLoadingAll } = useSavings();
  const { saving, isLoading } = useSaving(activeSaving);

  console.log(saving);
  if (!saving) return null;

  function handleCardChange(value) {
    console.log(value);
    setActiveSaving(value);
  }

  if (isLoading || isLoadingAll) return <Spinner />;

  return (
    <div className="grid grid-cols-2 gap-8 justify-between w-full h-full">
      <SavingsDetailCard saving={saving} />
      <SavingsCarousel
        savings={savings}
        onCardChange={handleCardChange}
        activeSaving={activeSaving}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Savings;
