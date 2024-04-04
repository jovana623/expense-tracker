import { useState } from "react";
import Spinner from "../../ui/Spinner";
import SavingsCarousel from "./SavingsCarousel";

import SavingsDetailCard from "./SavingsDetailCard";
import { useSaving } from "./useSaving";
import { useSavings } from "./useSavings";

function Savings() {
  const [activeSaving, setActiveSaving] = useState(2);
  const { savings, isLoading: isLoadingAll } = useSavings();
  const { saving, isLoading } = useSaving(activeSaving);

  console.log(saving);
  if (!saving) return null;

  function handleSavingChange(value) {
    console.log(value);
    setActiveSaving(value);
  }

  if (isLoading || isLoadingAll) return <Spinner />;

  return (
    <div className="grid grid-cols-2 gap-8 justify-between w-full h-full">
      <SavingsDetailCard saving={saving} onClick={handleSavingChange} />
      <SavingsCarousel savings={savings} />
    </div>
  );
}

export default Savings;
