import { calculateDaysLeft } from "../../helpers/dateFunctions";

/* eslint-disable react/prop-types */
function SavingCard({ saving, onCardChange, activeSaving }) {
  if (!saving) return null;

  const daysLeft = calculateDaysLeft(saving.Target_Date);
  const percentage = ((saving.Amount * 100) / saving.Goal).toFixed(0);

  const firstLetter = saving.Name.charAt(0);

  const statusBg =
    saving.Status === "In progress"
      ? "bg-blue-500"
      : saving.Status === "Completed"
      ? "bg-green-500"
      : "bg-yellow-500";

  return (
    <div className="flex justify-center">
      <div
        className={` rounded-md px-3 pt-4 w-[90%]  items-end shadow hover:border hover:border-blue-500 hover:cursor-pointer mb-4 ${
          activeSaving === saving.id
            ? "border border-blue-500"
            : "border border-lightBg"
        }`}
        onClick={() => onCardChange(saving.id)}
      >
        <div className="grid grid-cols-[1fr_4fr] my-3 mx-2">
          <div className="items-self-center justify-self-center">
            <p className="font-semibold text-xl px-4 py-2 rounded-md bg-blue-500 text-lightBg">
              {firstLetter}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-3 pb-4">
              <p className=" text-stone-900 text-xl font-semibold">
                {saving.Name}
              </p>
              <p
                className={`py-1 px-2 text-xs rounded-md text-lightBg ${statusBg}`}
              >
                {saving.Status}
              </p>
            </div>
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
            <div className="flex justify-between mt-3 text-stone-500">
              <p>
                {saving.Amount.toLocaleString()}&euro; /{" "}
                {saving.Goal.toLocaleString()}&euro;
              </p>
              <p>{percentage}&#x25;</p>
            </div>
            <div className="flex justify-end mt-3 text-stone-600">
              <p>{daysLeft} days left</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavingCard;
