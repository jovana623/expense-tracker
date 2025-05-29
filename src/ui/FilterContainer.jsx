/* eslint-disable react/prop-types */
function FilterContainer({ children }) {
  return (
    <div className="flex gap-1 p-1 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-sm">
      {children}
    </div>
  );
}

export default FilterContainer;
