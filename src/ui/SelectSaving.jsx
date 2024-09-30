import { useSearchParams } from "react-router-dom";
import { useSavings } from "../features/savings/useSavings";
import Spinner from "./Spinner";

function SelectSaving() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { savings, isLoading } = useSavings();

  function handleChange(e) {
    searchParams.set("saving", e.target.value);
    setSearchParams(searchParams);
  }

  if (isLoading) return <Spinner />;

  return (
    <select onChange={handleChange} className="outline-none">
      {savings.map((saving) => (
        <option value={saving.id} key={saving.id}>
          {saving.name}
        </option>
      ))}
    </select>
  );
}

export default SelectSaving;
