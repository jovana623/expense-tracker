export function ChatListSkeletonItem() {
  return <div className="h-16 bg-gray-600 rounded animate-pulse"></div>;
}

function SupportSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] h-[calc(100vh-40px)]">
      <div className="p-4 border-r border-gray-700 flex flex-col">
        <div className="flex space-x-2 mb-4">
          <div className="h-10 bg-gray-600 rounded w-1/2 animate-pulse"></div>
          <div className="h-10 bg-gray-600 rounded w-1/2 animate-pulse"></div>
        </div>
        <div className="flex-grow space-y-3 overflow-y-hidden">
          {[...Array(6)].map((_, i) => (
            <ChatListSkeletonItem key={i} />
          ))}
        </div>
      </div>

      <div className="hidden md:flex p-4 flex-col h-full bg-gray-700">
        <div className="flex items-center justify-between p-4 border-b border-gray-600 mb-4">
          <div className="flex-grow mr-4">
            <div className="h-5 bg-gray-600 rounded w-1/3 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-600 rounded w-2/3 animate-pulse"></div>
          </div>
          <div className="h-8 w-8 bg-gray-600 rounded animate-pulse"></div>{" "}
        </div>
        <div className="flex-grow bg-gray-800 rounded mb-4 p-4 space-y-4 animate-pulse">
          <div className="h-10 bg-gray-600 rounded w-3/4"></div>
          <div className="h-10 bg-gray-600 rounded w-1/2 self-end"></div>
          <div className="h-12 bg-gray-600 rounded w-5/6"></div>
        </div>
        <div className="flex items-center">
          <div className="flex-grow h-12 bg-gray-600 rounded mr-2 animate-pulse"></div>
          <div className="h-12 w-12 bg-gray-600 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default SupportSkeleton;
