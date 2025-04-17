import { HiArrowRightOnRectangle, HiChevronDown } from "react-icons/hi2";
import Menu from "../../ui/Menu";
import { useLogout } from "../authentification/useLogout";
import DarkModeSwitch from "./DarkModeSwitch";
import { RxAvatar } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import NotificationDropdown from "../notifications/NotificationDropdown";
import { useCurrentUser } from "../authentification/useCurrentUser";

function UserMenu() {
  const { mutate: logout, isLoading: isLoggingOut } = useLogout();
  const { data: currentUser } = useCurrentUser();
  const avatar = currentUser?.avatar;
  const username = localStorage.getItem("username") || "Guest";

  const avatarUrl = avatar
    ? `http://localhost:8000${avatar}`
    : "/anon-user.png";

  const menuId = "user-profile-menu";

  return (
    <div className="flex items-center gap-6">
      <NotificationDropdown userId={currentUser?.id} />
      <DarkModeSwitch />

      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center
                        ring-2 ring-offset-2 ring-gray-300 dark:ring-gray-600 ring-offset-white dark:ring-offset-gray-900"
        >
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <Menu>
            <Menu.Toggle id={menuId} icon={HiChevronDown} />
            <Menu.List id={menuId}>
              <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="block text-center text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {username}
                </span>
              </div>
              <Menu.Button icon={<RxAvatar />}>
                <NavLink to="profile">
                  <span>Profile</span>
                </NavLink>
              </Menu.Button>
              <Menu.Button
                icon={<HiArrowRightOnRectangle />}
                onClick={logout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </Menu.Button>
            </Menu.List>
          </Menu>
        </div>
      </div>
    </div>
  );
}
export default UserMenu;
