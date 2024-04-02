import Spinner from "../../ui/Spinner";
import SavingCard from "./SavingsCard";
import SavingsChart from "./SavingsChart";
import { useSaving } from "./useSaving";
import { useSavings } from "./useSavings";

function Savings() {
  const { savings, isLoading: isLoadingAll } = useSavings();
  const { saving, isLoading } = useSaving(2);

  if (!saving) return null;
  const { Amount, Goal } = saving;
  console.log(Amount, Goal);
  const percentage = ((Amount * 100) / Goal).toFixed(0);

  if (isLoading || isLoadingAll) return <Spinner />;

  return (
    <div className="grid grid-cols-2 gap-10 justify-between w-full">
      <div className="relative shadow rounded-md">
        <div className="absolute top-[17.5%] left-[17.5%] font-semibold text-4xl z-20 bg-white px-[11.5%] py-[14%] rounded-full">
          <p className="text-blue-500">{percentage}&#x25;</p>
        </div>
        <SavingsChart saving={saving} />
      </div>
      <div className="flex flex-col gap-5">
        {savings.map((saving) => (
          <SavingCard saving={saving} key={saving.id} />
        ))}
      </div>
    </div>
  );
}

export default Savings;
