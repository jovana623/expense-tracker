import { useSearchParams } from "react-router-dom";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    searchParams.set("search", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <div className="p-4 overflow-hidden w-[16px] h-[12px] hover:w-[270px] bg-gray-50 hover:bg-white hover:shadow-md hover:rounded-md flex group items-center hover:duration-300 duration-300 dark:bg-inherit hover:dark:bg-gray-800">
      <div className="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Isolation_Mode"
          data-name="Isolation Mode"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="currentColor"
          className="text-gray-800 dark:text-white"
        >
          <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
        </svg>
      </div>
      <input
        type="text"
        className="outline-none ml-3 rounded-md text-[14px] bg-white w-full text-black font-normal p-5 dark:bg-inherit dark:text-lightBg"
        placeholder="Search"
        onChange={handleChange}
        value={searchParams.get("search") || ""}
      />
    </div>
  );
}

export default Search;
