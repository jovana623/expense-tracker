import ChatTab from "./ChatTab";
import { useThreadContext } from "./useThreadContext";
import { ChatListSkeletonItem } from "./SupportSkeleton";

/* eslint-disable react/prop-types */
function ChatList({ threads, isLoading, className = "", currentUser }) {
  const { selectedThreadId } = useThreadContext();

  if (isLoading) {
    return (
      <div className={`p-4 space-y-2 ${className}`}>
        {[...Array(6)].map((_, i) => (
          <ChatListSkeletonItem key={i} />
        ))}
      </div>
    );
  }

  if (!threads || threads.length === 0) {
    return (
      <div className={`p-6 text-center text-gray-500 ${className}`}>
        No threads here.
      </div>
    );
  }
  return (
    <div className={`p-4 overflow-y-auto ${className}`}>
      <div className="space-y-2">
        {threads.map((thread) => (
          <ChatTab
            key={thread.id}
            thread={thread}
            isActive={thread.id === selectedThreadId}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
}

export default ChatList;
