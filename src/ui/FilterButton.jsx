/* eslint-disable react/prop-types */
function FilterButton({ onClick, isActive, children }) {
  return (
    <button
      onClick={onClick}
      disabled={isActive}
      className={`px-2 py-1 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-xs sm:text-base hover:bg-green-100 dark:hover:bg-green-700 ${
        isActive
          ? "bg-green-500 text-white shadow-sm"
          : "text-gray-700 dark:text-gray-300"
      }`}
    >
      {children}
    </button>
  );
}

export default FilterButton;
