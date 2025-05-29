import Spinner from "../../ui/Spinner";

/* eslint-disable react/prop-types */
function AdminStatsCard({ title, isLoading, children, className = "" }) {
  return (
    <div className="flex flex-col p-4 bg-white dark:bg-gray-700 rounded-2xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.005] ">
      {title && (
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
          {title}
        </h2>
      )}

      <div className={`flex items-center h-24 grow ${className}`}>
        {isLoading ? <Spinner /> : children}
      </div>
    </div>
  );
}

export default AdminStatsCard;
