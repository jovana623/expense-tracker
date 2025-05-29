import { getCurrencyEntity } from "../../helpers/currencyFunctions";

/* eslint-disable react/prop-types */
function FlipCardBack({ title, transaction, currency }) {
  return (
    <div className="h-full w-full p-6 rounded-2xl shadow-xl flex flex-col bg-gradient-to-br from-purple-100 to-violet-2 dark:from-slate-700 dark:to-slate-800 text-slate-800 dark:text-slate-200 overflow-hidden">
      <div className="flex-shrink-0">
        <p className="text-sm font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-400">
          {title}
        </p>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center text-center space-y-2 py-2">
        <p className="text-xl font-semibold text-slate-700 dark:text-slate-300">
          {transaction.name}
        </p>
        <p className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
          {transaction.amount.toLocaleString()}
          <span className="text-xl lg:text-2xl align-baseline ml-1 font-medium">
            {getCurrencyEntity(currency)}
          </span>
        </p>
      </div>

      <svg
        className="absolute top-5 right-5 text-purple-500/60 dark:text-purple-400/50"
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

export default FlipCardBack;
