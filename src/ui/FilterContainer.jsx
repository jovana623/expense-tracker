/* eslint-disable react/prop-types */
function FilterContainer({ children }) {
  return (
    <div className="flex gap-2 px-0.5 py-0.5 border border-stone-200 rounded-md justify-center dark:border-stone-600">
      {children}
    </div>
  );
}

export default FilterContainer;
