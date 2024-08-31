import { useState } from "react";
import Spinner from "../../ui/Spinner";
import SavingsDetailCard from "./SavingsDetailCard";
import { useSaving } from "./useSaving";
import SavingCard from "./SavingsCard";
import SeeAllSavings from "./SeeAllSavings";

function Savings() {
  const [activeSaving, setActiveSaving] = useState(1);
  const { saving, isLoading } = useSaving(activeSaving);

  if (!saving) return null;
  console.log(saving);

  function handleCardChange(value) {
    console.log(value);
    setActiveSaving(value);
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="grid grid-cols-2 gap-8 justify-between w-full h-full">
      <SavingsDetailCard saving={saving} />
      <div>
        <SavingCard saving={saving} />
        <SeeAllSavings
          activeSaving={activeSaving}
          onCardChange={handleCardChange}
        />
      </div>
    </div>
  );
}

export default Savings;
