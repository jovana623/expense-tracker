import LimitsCard from "./LimitsCard";

function LimitsList() {
  return (
    <div className="rounded-md shadow h-[100%] flex flex-col px-4 py-7">
      <p className="font-semibold text-xl text-center">Budget limits</p>
      <LimitsCard />
    </div>
  );
}

export default LimitsList;
