import { useSearchParams } from "react-router-dom";

/* eslint-disable react/prop-types */
function PageNumber({ number, onClick }) {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  return (
    <button
      className={`border-l border-r px-3 py-1 ${
        number === currentPage ? "bg-green-500 text-white" : ""
      }`}
      onClick={onClick}
    >
      {number}
    </button>
  );
}

export default PageNumber;
