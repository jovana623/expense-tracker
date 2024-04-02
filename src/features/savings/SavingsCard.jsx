import { calculateDaysLeft } from "../../helpers/dateFunctions";

/* eslint-disable react/prop-types */
function SavingCard({ saving }) {
  if (!saving) return null;

  console.log(saving.Target_Date);

  const daysLeft = calculateDaysLeft(saving.Target_Date);
  const percentage = ((saving.Amount * 100) / saving.Goal).toFixed(0);

  return (
    <div className="rounded-md px-3 pt-4 w-1/2 items-end shadow">
      <div
        style={{
          width: `${100}%`,
          backgroundColor: "#e5e7eb",
          height: "3px",
          borderRadius: "5px",
          transition: "width 0.5s ease-in-out",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            backgroundColor: "#0ea5e9",
            height: "3px",
            borderRadius: "5px",
            transition: "width 0.5s ease-in-out",
          }}
        ></div>
      </div>

      <p className="mt-8 text-stone-500 text-md">{saving.Name}</p>
      <div className="flex justify-between items-center pb-2">
        <p className="mb-2 text-2xl">{saving.Goal} &euro;</p>
        <p className="text-stone-500 text-sm">{daysLeft} days left</p>
      </div>
    </div>
  );
}

export default SavingCard;
