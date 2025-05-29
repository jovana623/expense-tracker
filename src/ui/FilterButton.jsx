/* eslint-disable react/prop-types */
function FilterButton({ onClick, isActive, children }) {
  return (
    <button
      onClick={onClick}
      disabled={isActive}
      className={`px-3 py-1.5 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-xs sm:text-sm ${
        isActive
          ? "bg-green-600 text-white shadow-sm"
          : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
      }`}
    >
      {children}
    </button>
  );
}

export default FilterButton;
