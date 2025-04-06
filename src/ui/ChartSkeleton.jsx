function ChartSkeleton() {
  const heights = [80, 65, 90, 75, 85, 60, 95, 70];
  return (
    <div
      role="status"
      className="w-full p-4 rounded-sm shadow-sm animate-pulse md:p-6"
    >
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 h-56 place-items-end dark:bg-gray-700">
        {heights.map((h, i) => (
          <div
            key={i}
            style={{ height: `${h}%` }}
            className="bg-gray-200 rounded-md w-full dark:bg-gray-600"
          />
        ))}
      </div>
    </div>
  );
}

export default ChartSkeleton;
