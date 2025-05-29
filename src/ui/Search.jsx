import { useSearchParams } from "react-router-dom";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    const value = e.target.value;
    if (value) {
      searchParams.set("search", e.target.value);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  }

  return (
    <div className="relative flex items-center w-full max-w-xs">
      <input
        type="text"
        className="w-full pl-10 pr-4 py-2 rounded-lg shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:focus:border-transparent dark:focus:ring-green-400 transition-all duration-200 ease-in-out"
        placeholder="Search..."
        onChange={handleChange}
        value={searchParams.get("search") || ""}
      />
      <div className="absolute left-3 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Isolation_Mode"
          data-name="Isolation Mode"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="currentColor"
          className="text-gray-500 dark:text-gray-400"
        >
          <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
        </svg>
      </div>
    </div>
  );
}

export default Search;
