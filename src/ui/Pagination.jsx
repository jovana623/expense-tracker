import PageNumber from "../ui/PageNumber";
import { MdOutlineArrowCircleLeft } from "react-icons/md";
import { MdOutlineArrowCircleRight } from "react-icons/md";

/* eslint-disable react/prop-types */
function Pagination({ page, numOfPages, setPage }) {
  function handlePrevPage() {
    if (page > 1) setPage(page - 1);
  }

  function handleNextPage() {
    if (page < numOfPages) setPage(page + 1);
  }

  function handlePageNumClick(number) {
    setPage(number);
  }
  return (
    <div className="flex justify-center">
      <div className="inline-flex border items-center rounded-md">
        <button
          className={`px-3 flex items-center justify-center gap-1 
            ${
              page === 1
                ? "text-gray-400 cursor-not-allowed"
                : "hover:cursor-pointer"
            } 
            disabled:opacity-50`}
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          <MdOutlineArrowCircleLeft className="text-green-500 mt-1" /> Previous
        </button>
        {Array.from({ length: numOfPages }, (_, index) => (
          <PageNumber
            key={index + 1}
            number={index + 1}
            onClick={() => {
              handlePageNumClick(index + 1);
            }}
          />
        ))}
        <button
          className={`px-3 flex items-center justify-center gap-1 
            ${
              page === numOfPages
                ? "text-gray-400 cursor-not-allowed"
                : "hover:cursor-pointer"
            } 
            disabled:opacity-50`}
          onClick={handleNextPage}
          disabled={page === numOfPages}
        >
          Next{" "}
          <MdOutlineArrowCircleRight className="text-green-500 mt-1 hover:cursor-pointer" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
