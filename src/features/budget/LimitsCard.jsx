/* eslint-disable react/prop-types */
function LimitsCard({ data }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-5 py-3 flex justify-between items-center">
        <h3 className="text-zinc-900 text-lg">{data.type}</h3>
        <svg
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6 text-zinc-900"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
      </div>
      <div className="px-5 pb-5">
        <div className="w-full bg-zinc-200 rounded-full h-2.5">
          {data.percentage > 100 ? (
            <div className="bg-red-600 h-2.5 rounded-full w-[100%]"></div>
          ) : (
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${data.percentage}%` }}
            ></div>
          )}
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm text-zinc-600">
            {data.percentage.toFixed(0)}&#x25;
          </span>
          <span className="text-sm text-zinc-600">
            {data.total.toLocaleString()}&euro;/{data.budget.toLocaleString()}
            &euro;
          </span>
        </div>
      </div>
    </div>
  );
}

export default LimitsCard;
