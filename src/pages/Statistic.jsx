import GraphContainer from "../features/statistics/GraphContainer";
import SavingsContainer from "../features/statistics/SavingsContainer";

function Statistic() {
  return (
    <div className="py-2 px-7">
      <div className="grid grid-cols-[2fr_1.5fr_1fr] gap-10 h-[100%]">
        <div className="flex flex-col gap-5">
          <GraphContainer />
        </div>
        <div className="py-4">
          <SavingsContainer />
        </div>
        <div>Child 3</div>
      </div>
    </div>
  );
}

export default Statistic;
