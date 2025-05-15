import { getTimeAgo } from "../../helpers/dateFunctions";

/* eslint-disable react/prop-types */
function ChatBubble({
  message,
  isCurrentUser,
  avatar,
  showAvatarAndUsername,
  thread,
  currentUser,
}) {
  const now = new Date().toISOString();
  const timeDisplay = message.sent_at
    ? getTimeAgo(message.sent_at, now)
    : "sending...";

  const avatarSizeClasses = "w-8 h-8";

  let senderDisplayName = message.sender;
  if (
    thread &&
    message.sender === thread.staff &&
    currentUser &&
    currentUser.username === thread.user
  ) {
    senderDisplayName = "Support";
  }

  let displayedAvatarUrl;
  if (isCurrentUser) {
    displayedAvatarUrl = avatar
      ? `http://localhost:8000${avatar}`
      : "/anon-user.png";
  } else if (senderDisplayName === "Support") {
    displayedAvatarUrl = "/support-avatar.png";
  } else {
    displayedAvatarUrl = avatar
      ? `http://localhost:8000${avatar}`
      : "/anon-user.png";
  }

  return (
    <div
      className={`flex w-full gap-2.5 items-start ${
        isCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isCurrentUser &&
        (showAvatarAndUsername ? (
          <img
            className={`${avatarSizeClasses} rounded-full object-cover flex-shrink-0`}
            src={displayedAvatarUrl}
            alt={message.sender || "User avatar"}
          />
        ) : (
          <div className={`${avatarSizeClasses} flex-shrink-0`}></div>
        ))}

      <div
        className={`flex flex-col w-fit max-w-[70%] sm:max-w-[60%] md:max-w-md leading-1.5 p-3 shadow-sm ${
          isCurrentUser
            ? `bg-teal-600 dark:bg-teal-700 text-white rounded-s-xl ${
                showAvatarAndUsername
                  ? "rounded-br-xl"
                  : "rounded-tr-xl rounded-br-xl"
              } `
            : `bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-e-xl ${
                showAvatarAndUsername ? "rounded-bl-xl" : "rounded-s-xl"
              } `
        }`}
      >
        {!isCurrentUser && showAvatarAndUsername && (
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {senderDisplayName}
            </span>
          </div>
        )}

        <div className="text-sm font-normal py-1 whitespace-pre-wrap break-words">
          {message.message}
        </div>

        <span
          className={`text-xs font-normal text-right mt-1 ${
            isCurrentUser
              ? "text-teal-100 dark:text-teal-200/80"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {timeDisplay}
        </span>
      </div>
    </div>
  );
}

export default ChatBubble;
