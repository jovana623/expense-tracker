/* eslint-disable react/prop-types */
function FilterContainer({ children }) {
  return (
    <div className="flex gap-1 p-1 rounded-md shadow-sm border border-stone-200 justify-center dark:border-stone-600">
      {children}
    </div>
  );
}

export default FilterContainer;
