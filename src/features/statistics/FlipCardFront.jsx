/* eslint-disable react/prop-types */
function FlipCardFront({ title, avg }) {
  return (
    <div className="bg-white p-4 rounded-md shadow-md flex flex-col text-center h-[80%] justify-around">
      <p className="text-xs text-gray-500 uppercase">{title}</p>
      <p className="text-xl font-semibold text-gray-800">
        {avg.toLocaleString()}&euro;
      </p>

      <svg
        className="absolute top-6 right-6 opacity-50 text-green-500"
        width="40"
        height="40"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    </div>
  );
}

export default FlipCardFront;
