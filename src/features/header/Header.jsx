import { useLogout } from "../authentification/useLogout";
import DarkModeSwitch from "./DarkModeSwitch";

function Header() {
  const { mutate: logout } = useLogout();
  const avatar = localStorage.getItem("avatar");
  const username = localStorage.getItem("username");

  const avatarUrl = avatar
    ? `http://localhost:8000${avatar}`
    : "/anon-user.png";

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-stone-200 dark:border-stone-600 shadow-sm px-6 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side (reserved for future content) */}
        <div></div>

        {/* Right side */}
        <div className="flex items-center gap-8">
          <DarkModeSwitch />

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
              <img
                src={avatarUrl}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-white">
              {username || "Guest"}
            </span>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 transition duration-200 shadow-sm"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
