/* eslint-disable react/prop-types */
function FilterButton({ onClick, isActive, children }) {
  return (
    <button
      onClick={onClick}
      disabled={isActive}
      className={`px-2 py-0.5 rounded-md hover:bg-green-500 hover:text-lightBg ${
        isActive ? "bg-green-500 text-lightBg" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default FilterButton;
