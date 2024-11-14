import { useState } from "react";
import Spinner from "../../ui/Spinner";
import SavingsDetailCard from "./SavingsDetailCard";
import { useSaving } from "./useSaving";
import VerticalCarousel from "./VerticalCarousel";
import { useSavings } from "./useSavings";

function Savings() {
  const [activeSaving, setActiveSaving] = useState(1);
  const { saving, isLoading } = useSaving(activeSaving);
  const { savings, isLoading: isLoadingSavings } = useSavings();

  if (!saving) return null;
  console.log(saving);

  function handleCardChange(value) {
    console.log(value);
    setActiveSaving(value);
  }

  if (isLoading || isLoadingSavings) return <Spinner />;

  return (
    <div className="md:grid-cols-[1fr_1fr] gap-10 grid grid-cols-1">
      <SavingsDetailCard saving={saving} />
      <div>
        <VerticalCarousel
          savings={savings || []}
          onCardChange={handleCardChange}
          activeSaving={activeSaving}
        />
      </div>
    </div>
  );
}

export default Savings;
