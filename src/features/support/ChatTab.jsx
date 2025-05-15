import { useThreadContext } from "./useThreadContext";
import { getTimeAgo } from "../../helpers/dateFunctions";
import { useQueryClient } from "@tanstack/react-query";

/* eslint-disable react/prop-types */
function ChatTab({ thread, isActive, currentUser }) {
  const { setSelectedThreadId } = useThreadContext();
  const queryClient = useQueryClient();

  const hasUnread = thread.has_unread;

  const now = new Date().toISOString();

  function handleClick() {
    setSelectedThreadId(thread.id);
    queryClient.invalidateQueries({ queryKey: ["open-threads"] });
    queryClient.invalidateQueries({ queryKey: ["my-threads"] });
  }

  const lastMessage = thread.last_message;
  let messagePreview = "No message yet";
  let messageTime = "";

  let otherUserName;

  if (currentUser && currentUser.username === thread.user)
    otherUserName = "Support";
  else if (currentUser && currentUser.username === thread.staff)
    otherUserName = thread.user;
  else otherUserName = "Unknown user";

  if (lastMessage) {
    const senderUsername = lastMessage.sender;
    const message = lastMessage.message;
    messageTime = getTimeAgo(lastMessage.sent_at, now);

    if (currentUser && senderUsername === currentUser.username) {
      messagePreview = `You: ${message}`;
    } else {
      if (
        currentUser &&
        currentUser.username === thread.user &&
        senderUsername === thread.staff
      ) {
        messagePreview = `Support: ${message}`;
      } else {
        messagePreview = `${senderUsername}: ${message}`;
      }
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`$flex flex-col py-3 px-4 rounded-md cursor-pointer transition-colors duration-150 ${
        isActive
          ? "$bg-teal-50 border-l-4 border-teal-500 dark:bg-teal-900/40 dark:border-l-4 dark:border-teal-500"
          : "$border-b border-gray-100  hover:bg-gray-100 dark:border-b dark:border-gray-700/60 dark:hover:bg-gray-700/70"
      }`}
    >
      <div className="flex justify-between items-center mb-1 w-full">
        <span
          className={`font-semibold truncate ${hasUnread ? "font-bold" : ""} ${
            isActive
              ? "text-gray-900 dark:text-gray-50"
              : "text-gray-800 dark:text-gray-100"
          } text-base mr-2`}
        >
          {thread.subject || "No Subject"}
        </span>
        {lastMessage && (
          <span
            className={`text-xs flex-shrink-0 ml-2 ${
              hasUnread ? "text-gray-600 dark:text-gray-300" : ""
            } ${
              isActive
                ? "text-gray-500 dark:text-gray-400"
                : "text-gray-400 dark:text-gray-500"
            }`}
          >
            {messageTime}
          </span>
        )}
      </div>

      <div
        className={`text-xs truncate ${
          hasUnread ? "text-gray-700 dark:text-gray-200" : ""
        } ${
          isActive
            ? "text-gray-500 dark:text-gray-400"
            : "text-gray-400 dark:text-gray-500"
        } mb-1`}
      >
        {otherUserName}
      </div>

      <div className="flex items-center space-x-2 w-full">
        {hasUnread && (
          <span
            className="w-2 h-2 bg-teal-500 dark:bg-teal-400 rounded-full flex-shrink-0"
            title="Unread messages"
          ></span>
        )}
        <p
          className={`text-sm truncate ${hasUnread ? "font-bold" : ""} ${
            isActive
              ? "text-gray-600 dark:text-gray-300"
              : "text-gray-500 dark:text-gray-400"
          } min-w-0 ${!hasUnread ? "ml-0" : ""}`}
        >
          {messagePreview}
        </p>
      </div>
    </div>
  );
}

export default ChatTab;
