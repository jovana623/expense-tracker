import { getCurrencyEntity } from "../../helpers/currencyFunctions";

/* eslint-disable react/prop-types */
function FlipCardFront({ title, avg, currency }) {
  return (
    <div className="h-full w-full p-6 rounded-2xl shadow-xl flex flex-col bg-gradient-to-br from-sky-100 to-cyan-200 dark:from-slate-700 dark:to-slate-800 text-slate-800 dark:text-slate-200 overflow-hidden">
      <div className="flex-shrink-0">
        <p className="text-sm font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-400">
          {title}
        </p>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center text-center py-2">
        <p className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
          {avg.toLocaleString()}
          <span className="text-2xl lg:text-3xl align-baseline ml-1 font-medium">
            {getCurrencyEntity(currency)}
          </span>
        </p>
      </div>

      <svg
        className="absolute top-5 right-5 text-sky-500/60 dark:text-sky-400/50"
        width="32"
        height="32"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    </div>
  );
}

export default FlipCardFront;
