function CardSkeleton() {
  return (
    <div role="status" className="max-w-sm animate-pulse">
      <div className="h-3 bg-gray-200 rounded-full  w-48 mb-4"></div>
      <div className="h-3 bg-gray-200 rounded-full max-w-[360px] mb-4"></div>
      <div className="h-3 bg-gray-200 rounded-full  mb-3"></div>
      <div className="h-3 bg-gray-200 rounded-full  max-w-[330px] mb-4"></div>
      <div className="h-3 bg-gray-200 rounded-full  max-w-[300px] mb-4"></div>
      <div className="h-3 bg-gray-200 rounded-full  max-w-[360px] mb-5"></div>
    </div>
  );
}

export default CardSkeleton;
