import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { useTypes } from "../type/useTypes";
import { useCategoryByMonth } from "./useCategoryByMonth";
import CategoryChart from "./CategoryChart";

function GraphContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type") || "Salary";
  const { types, isLoading } = useTypes();
  const { data: typeData, isLoading: isLoadingType } = useCategoryByMonth(type);

  function handleChange(e) {
    searchParams.set("type", e.target.value);
    setSearchParams(searchParams);
  }

  if (isLoading) return <Spinner />;

  console.log(typeData);

  return (
    <div className="shadow w-full px-5 py-5 flex flex-col rounded-md bg-lightBg">
      <div className="flex flex-col">
        <select onChange={handleChange} className="self-end">
          {types.map((type) => (
            <option value={type.name} key={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <div>
          {isLoadingType ? <Spinner /> : <CategoryChart data={typeData} />}
        </div>
      </div>
    </div>
  );
}

export default GraphContainer;
