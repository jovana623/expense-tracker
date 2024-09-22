import { useSearchParams } from "react-router-dom";
import { useCategoryByMonth } from "../features/statistics/useCategoryByMonth";
import SavingsContainer from "../features/statistics/SavingsContainer";
import SelectType from "../features/statistics/SelectType";
import ChartCard from "../ui/ChartCard";
import Spinner from "../ui/Spinner";
import CategoryChart from "../features/statistics/CategoryChart";

function Statistic() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "Salary";
  const { data: typeData, isLoading } = useCategoryByMonth(type);
  return (
    <div className="py-8 px-7">
      <div className="grid grid-cols-[1fr_2fr_1fr] gap-10 h-[100%]">
        <div className="flex flex-col gap-5">
          <ChartCard>
            <SelectType />
            {isLoading ? <Spinner /> : <CategoryChart data={typeData} />}
          </ChartCard>
        </div>
        <div className="">
          <SavingsContainer />
        </div>
        <div>Child 3</div>
      </div>
    </div>
  );
}

export default Statistic;
