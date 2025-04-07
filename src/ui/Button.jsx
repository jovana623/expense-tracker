/* eslint-disable react/prop-types */
function Button({ type, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-3 rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500  ${
        type === "primary"
          ? "bg-green-600 text-lightBg hover:bg-green-500 active:bg-green-700"
          : type === "danger"
          ? "bg-red-600 text-lightBg hover:bg-red-500 active:bg-red-700"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:active:bg-gray-500"
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
