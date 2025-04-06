/* eslint-disable react/prop-types */
function Button({ type, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 border border-stone-200 rounded-md dark:border-stone-600 ${
        type === "primary"
          ? "bg-green-500 text-lightBg"
          : type === "danger"
          ? "bg-red-500 text-lightBg"
          : "bg-lightBg text-green-500 dark:bg-gray-800"
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
