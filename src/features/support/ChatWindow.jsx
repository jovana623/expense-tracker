import ChatBubble from "./ChatBubble";
import { useThread } from "./useThread";
import { IoSend } from "react-icons/io5";
import Menu from "../../ui/Menu";
import { useThreadMessages } from "./useThreadMessages";
import { useChangeStatus } from "./useChangeStatus";
import { useEffect, useMemo, useRef, useState } from "react";
import { useThreadContext } from "./useThreadContext";
import { motion, AnimatePresence } from "framer-motion";
import MessageSkeleton from "./MessageSkeleton";
import { FaArrowLeft } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";

/* eslint-disable react/prop-types */
function ChatWindow({ user }) {
  const { selectedThreadId: threadId, setSelectedThreadId } =
    useThreadContext();
  const { threadMessages = [], isLoading: isLoadingMessages } =
    useThreadMessages(threadId);
  const { thread } = useThread(threadId);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { changeStatus } = useChangeStatus();
  const socketRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const queryClient = useQueryClient();

  console.log(thread);

  useEffect(() => {
    setMessages([]);
  }, [threadId]);

  useEffect(() => {
    if (!threadId) return;

    const token = localStorage.getItem("accessToken");

    const socket = new WebSocket(
      `ws://localhost:8000/ws/support/chat/${threadId}/?token=${token}`
    );

    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, [threadId, queryClient]);

  const allMessages = useMemo(
    () => [...threadMessages, ...messages],
    [threadMessages, messages]
  );

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scroll = () => {
        scrollContainerRef.current.scrollTop =
          scrollContainerRef.current.scrollHeight;
      };
      const timeoutId = setTimeout(scroll, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [allMessages]);

  function sendMessage(message) {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ message }));
    }
  }

  function handleSendButtonClick() {
    if (inputValue.trim() !== "") {
      sendMessage(inputValue.trim());
      setInputValue("");
    }
  }

  const statusTransitions = {
    open: ["in_progress"],
    in_progress: ["close", "open"],
    close: [],
  };

  function handleStatusChange(newStatus) {
    if (!threadId || !newStatus) return;
    console.log("ThreadId:", threadId);
    changeStatus({ id: threadId, status: newStatus });
  }

  const handleBackClick = () => {
    setSelectedThreadId(null);
  };

  let headerDisplayName;
  let headerAvatarUrl;

  if (thread) {
    if (user && user.username === thread.user) {
      headerDisplayName = "Support";
      headerAvatarUrl = "/support-avatar.png";
    } else {
      headerDisplayName = thread.other_user?.username || "User";
      headerAvatarUrl = thread.other_user?.avatar
        ? `http://localhost:8000${thread.other_user.avatar}`
        : "/anon-user.png";
    }
  } else {
    headerDisplayName = "Loading...";
    headerAvatarUrl = "/anon-user.png";
  }

  return (
    <AnimatePresence mode="wait">
      {!threadId ? (
        <motion.div
          key="no-thread-selected"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full bg-white dark:bg-gray-800 shadow-inner flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 p-10"
        >
          <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Select a Conversation
          </h3>
          <p className="text-center">
            Choose a thread from the list on the left to start chatting.
          </p>
        </motion.div>
      ) : (
        <motion.div
          key={threadId}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="w-full h-full bg-white dark:bg-gray-800 shadow-md overflow-hidden flex flex-col"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 flex-shrink-0">
            <div className="flex items-center flex-grow mr-4 overflow-hidden">
              <button
                onClick={handleBackClick}
                className="mr-2 p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
                aria-label="Back to threads"
              >
                <FaArrowLeft className="w-5 h-5" />
              </button>
              <img
                className="w-10 h-10 rounded-full mr-3 object-cover flex-shrink-0"
                src={headerAvatarUrl}
                alt={headerDisplayName}
              />
              <div className="overflow-hidden">
                <div className="font-semibold text-gray-800 dark:text-gray-100 text-lg truncate">
                  {headerDisplayName}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {thread?.subject || "No Subject"}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 flex-shrink-0">
              {user.is_staff && thread && (
                <Menu>
                  <Menu.Toggle onClick={(e) => e.stopPropagation()} />
                  <Menu.List>
                    {statusTransitions[thread.status]?.map((newStatus) => (
                      <Menu.Button
                        key={newStatus}
                        onClick={() => handleStatusChange(newStatus)}
                      >
                        <span>{`Mark as ${newStatus.replace("_", " ")}`}</span>
                      </Menu.Button>
                    ))}
                  </Menu.List>
                </Menu>
              )}
            </div>
          </div>
          <div
            ref={scrollContainerRef}
            className="flex-grow px-3 py-4 md:px-6 md:py-6 overflow-y-auto flex flex-col bg-white dark:bg-gray-800"
          >
            {isLoadingMessages ? (
              <div className="m-auto space-y-4 w-full px-4">
                <MessageSkeleton />
              </div>
            ) : Array.isArray(allMessages) && allMessages.length > 0 ? (
              <div className="flex flex-col gap-3 w-full max-w-full">
                {allMessages.map((message, index) => {
                  const previousMessage = allMessages[index - 1];

                  const showAvatarAndUsername =
                    index === 0 ||
                    (previousMessage &&
                      previousMessage.sender !== message.sender);
                  const isCurrentUser = message.sender === user.username;
                  const avatar = isCurrentUser
                    ? user?.avatar
                    : thread?.other_user?.avatar;
                  return (
                    <ChatBubble
                      key={message.id ?? `msg-${index}-${message.sent_at}`}
                      message={message}
                      isCurrentUser={isCurrentUser}
                      avatar={avatar}
                      showAvatarAndUsername={showAvatarAndUsername}
                      thread={thread}
                      currentUser={user}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="m-auto text-gray-500 dark:text-gray-400 text-center px-6">
                No messages in this conversation yet. <br />
                {thread?.status === "in_progress"
                  ? "Type your message below to start!"
                  : ""}
              </div>
            )}
          </div>
          {thread?.status === "in_progress" ? (
            <div className="bg-gray-50 dark:bg-gray-800 p-3 border-t border-gray-200 dark:border-gray-700 flex items-end flex-shrink-0">
              <textarea
                rows={1}
                className="flex-grow resize-none rounded-lg py-2 px-3 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500" //
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendButtonClick();
                  }
                }}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                style={{ maxHeight: "120px", overflowY: "auto" }}
              />
              <button
                onClick={handleSendButtonClick}
                disabled={
                  !inputValue.trim() ||
                  !socketRef.current ||
                  socketRef.current.readyState !== WebSocket.OPEN ||
                  socketRef.current.protocol !== "Authorization-Bearer-Token"
                }
                className="ml-2 flex-shrink-0 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-bold p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IoSend className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm px-4 py-3 text-center border-t border-gray-200 dark:border-gray-700">
              {thread?.status === "open" ? (
                user.is_staff ? (
                  <p>
                    This thread is currently **Open**. To take it and start
                    responding, please change its status to *In progress*.
                  </p>
                ) : (
                  <p>
                    This thread is currently **Open**. A support agent will get
                    back to you shortly.
                  </p>
                )
              ) : thread?.status === "close" ? (
                user.is_staff ? (
                  <p>
                    This thread is **Closed**. If you need to reopen it, change
                    its status to *In progress* or *Open* using the menu above.
                  </p>
                ) : (
                  <p>
                    This thread is **Closed**. If you have further questions,
                    please open a new support thread.
                  </p>
                )
              ) : (
                <p>
                  Thread is currently marked as{" "}
                  <span className="capitalize">
                    {thread?.status?.replace("_", " ")}
                  </span>
                  . You cannot send messages.
                </p>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ChatWindow;
