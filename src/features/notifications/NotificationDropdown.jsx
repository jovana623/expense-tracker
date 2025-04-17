import { useEffect, useRef, useState } from "react";
import { useNotifications } from "./useNotifications";
import { getTimeAgo } from "../../helpers/dateFunctions";
import { useNotificationSocket } from "./useNotificationsSocket";
import { useMarkAsRead } from "./useMarkAsRead";

/* eslint-disable react/prop-types */
function NotificationDropdown({ userId }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const { notifications, isLoading, refetch } = useNotifications();
  const now = new Date().toISOString();
  useNotificationSocket(userId, refetch);
  const { markAsRead } = useMarkAsRead();

  const unreadCount = notifications?.filter((n) => !n.is_read).length ?? 0;
  const displayCount = unreadCount > 9 ? "9+" : unreadCount;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400 mt-2"
        type="button"
      >
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 14 20"
        >
          <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
        </svg>

        {unreadCount > 0 && (
          <div className="absolute flex items-center justify-center w-5 h-5 bg-red-500 border-2 border-white rounded-full -top-2 start-3.5 dark:border-gray-900 text-xs text-white">
            {displayCount}
          </div>
        )}
      </button>

      <div
        id="dropdownNotification"
        className={`z-20 absolute right-0 w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-800 dark:divide-gray-700 ${
          isOpen ? "block" : "hidden"
        }`}
        aria-labelledby="dropdownNotificationButton"
      >
        <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
          Notifications
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {isLoading && (
            <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
              Loading...
            </div>
          )}
          {!isLoading && (!notifications || notifications.length === 0) && (
            <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
              No new notifications.
            </div>
          )}
          {!isLoading &&
            notifications &&
            notifications.length > 0 &&
            notifications.map((notification) => (
              <a
                key={notification.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  markAsRead(notification.id);
                }}
                className={`flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  !notification.is_read
                    ? "bg-blue-50 dark:bg-gray-700 border-l-4 border-blue-500"
                    : "bg-gray-50 dark:bg-gray-800"
                }`}
              >
                <div className="w-full ps-3">
                  <div
                    className={`text-gray-500 text-sm mb-1.5 dark:text-gray-400 ${
                      !notification.is_read ? "dark:text-white" : ""
                    }`}
                  >
                    {notification.message}
                  </div>

                  <div className="text-xs text-blue-600 dark:text-blue-500">
                    {getTimeAgo(notification.created_at, now)}
                  </div>
                </div>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}

export default NotificationDropdown;
