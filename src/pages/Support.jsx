import ChatWindow from "../features/support/ChatWindow";
import Tab from "../features/support/Tab";
import { useCurrentUser } from "../features/authentification/useCurrentUser";
import { ThreadProvider } from "../features/support/ThreadContext";
import SupportSkeleton from "../features/support/SupportSkeleton";
import { useThreadContext } from "../features/support/useThreadContext";

function SupportLayout() {
  const { data: currentUser, isLoading } = useCurrentUser();
  const { selectedThreadId } = useThreadContext();

  if (isLoading) return <SupportSkeleton />;
  if (!currentUser) return <div>Error while loading user</div>;

  return (
    <div className="w-full h-[97%] flex flex-row">
      <div
        className={`w-full md:w-[350px] lg:w-[400px] flex-shrink-0 border-r border-gray-200 dark:border-gray-600 h-full ${
          selectedThreadId ? "hidden md:flex" : "flex"
        }`}
      >
        <Tab currentUser={currentUser} />
      </div>
      <div
        className={`flex-grow min-w-0 ${
          !selectedThreadId ? "hidden md:flex" : "flex"
        }`}
      >
        <ChatWindow user={currentUser} />
      </div>
    </div>
  );
}

function Support() {
  return (
    <div className="h-[calc(100vh-40px)] bg-white dark:bg-gray-800 overflow-hidden">
      <ThreadProvider>
        <SupportLayout />
      </ThreadProvider>
    </div>
  );
}

export default Support;
