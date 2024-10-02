/* eslint-disable react/prop-types */
function FlipCardFront({ title, avg }) {
  return (
    <div className="font-sans w-full h-40 p-8 rounded-2xl bg-gradient-to-br from-green-400 to-green-500 shadow-lg relative overflow-hidden text-white">
      <p className="text-xl font-bold mb-4">{title}</p>
      <p className="text-2xl font-bold mb-3 text-shadow">
        {avg.toLocaleString()}&euro;
      </p>

      <svg
        className="absolute top-6 right-6 opacity-50"
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
