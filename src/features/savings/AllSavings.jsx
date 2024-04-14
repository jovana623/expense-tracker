import Spinner from "../../ui/Spinner";
import SavingCard from "./SavingsCard";
import { useSavings } from "./useSavings";

/* eslint-disable react/prop-types */
function AllSavings({ activeSaving, onCardChange }) {
  const { savings, isLoading: isLoading } = useSavings();

  if (isLoading) return <Spinner />;

  return (
    <div className="grid grid-cols-2">
      {savings.map((saving) => (
        <SavingCard
          saving={saving}
          key={saving.id}
          activeSaving={activeSaving}
          onCardChange={onCardChange}
        />
      ))}
    </div>
  );
}

export default AllSavings;
