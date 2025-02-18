function ChartSkeleton() {
  return (
    <div
      role="status"
      className="w-full p-4 border rounded-sm shadow-sm animate-pulse md:p-6"
    >
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 h-60 place-items-end">
        <div className="bg-gray-200 rounded-md h-[80%] w-full"></div>
        <div className="bg-gray-200 rounded-md h-[65%] w-full"></div>
        <div className="bg-gray-200 rounded-md h-[90%] w-full"></div>
        <div className="bg-gray-200 rounded-md h-[75%] w-full"></div>
        <div className="bg-gray-200 rounded-md h-[85%] w-full"></div>
        <div className="bg-gray-200 rounded-md h-[60%] w-full"></div>
        <div className="bg-gray-200 rounded-md h-[95%] w-full"></div>
        <div className="bg-gray-200 rounded-md h-[70%] w-full"></div>
      </div>
    </div>
  );
}

export default ChartSkeleton;
