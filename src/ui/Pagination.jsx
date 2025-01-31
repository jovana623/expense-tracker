import PageNumber from "../ui/PageNumber";
import {
  MdOutlineArrowCircleLeft,
  MdOutlineArrowCircleRight,
} from "react-icons/md";

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

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (numOfPages <= maxVisiblePages) {
      for (let i = 1; i <= numOfPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (page > 3) pages.push("...");

      for (
        let i = Math.max(3, page - 1);
        i <= Math.min(numOfPages - 1, page + 1);
        i++
      ) {
        pages.push(i);
      }

      if (page < numOfPages - 2) pages.push("...");

      pages.push(numOfPages);
    }

    return pages;
  };

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

        {getPageNumbers().map((pageNumber, index) =>
          pageNumber === "..." ? (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <PageNumber
              key={`page-${pageNumber}`}
              number={pageNumber}
              isActive={page === pageNumber}
              onClick={() => handlePageNumClick(pageNumber)}
            />
          )
        )}

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
