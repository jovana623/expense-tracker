/* eslint-disable react/prop-types */
function Button({ type, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 border border-stone-200 rounded-md ${
        type === "primary"
          ? "bg-green-500 text-lightBg"
          : type === "danger"
          ? "bg-red-500 text-lightBg"
          : "bg-lightBg text-green-500"
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
