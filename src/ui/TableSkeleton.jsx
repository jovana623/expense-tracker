/* eslint-disable react/prop-types */
function TableSkeleton({ columns = 5, rows = 5 }) {
  return (
    <div
      role="status"
      className="w-full p-4 space-y-4 divide-y divide-gray-200 rounded-sm shadow-sm animate-pulse md:p-6"
    >
      {[...Array(rows)].map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex items-center justify-between w-full pt-4 gap-4"
        >
          {[...Array(columns)].map((_, colIndex) => (
            <div
              key={colIndex}
              className="h-4 bg-gray-300 rounded-full"
              style={{
                width: `${100 / columns}%`,
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TableSkeleton;
