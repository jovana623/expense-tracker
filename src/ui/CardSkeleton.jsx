/* eslint-disable react/prop-types */
function CardSkeleton({ size = 6 }) {
  return (
    <div role="status" className="max-w-sm animate-pulse">
      {[...Array(size)].map((_, index) => (
        <div
          key={index}
          className="h-3 bg-gray-200 rounded-full mb-4"
          style={{ width: `${Math.max(150, 230 - index * 10)}px` }}
        ></div>
      ))}
    </div>
  );
}

export default CardSkeleton;
