import { useSearchParams } from "react-router-dom";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    searchParams.set("search", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <input
      type="text"
      placeholder="Search"
      onChange={handleChange}
      value={searchParams.get("search") || ""}
      className="border border-stone-200 focus:outline-green-500 rounded-md h-8"
    />
  );
}

export default Search;
