import { useSearchParams } from "react-router-dom";
import { useTypes } from "../type/useTypes";
import Spinner from "../../ui/Spinner";

function SelectType() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { types, isLoading } = useTypes();
  function handleChange(e) {
    searchParams.set("type", e.target.value);
    setSearchParams(searchParams);
  }
  if (isLoading) return <Spinner />;
  return (
    <select onChange={handleChange} className="outline-none">
      {types.map((type) => (
        <option value={type.name} key={type.id}>
          {type.name}
        </option>
      ))}
    </select>
  );
}

export default SelectType;
