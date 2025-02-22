import { useLogout } from "../authentification/useLogout";
import { useCurrentUser } from "../authentification/useCurrentUser";
import HeaderSkeleton from "../../ui/HeaderSkeleton";

function Header() {
  const { mutate: logout } = useLogout();
  const { data: user, isLoading } = useCurrentUser();
  console.log(user);

  const avatarUrl = user?.avatar
    ? `http://localhost:8000${user.avatar}`
    : "/anon-user.png";

  return (
    <div className="border-b border-stone-200 py-3 h-[50px] flex items-center justify-end pr-12 pl-6 sticky top-0 bg-white z-10 md:bg-white gap-6">
      {isLoading ? (
        <HeaderSkeleton />
      ) : (
        <div className="flex gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
              <img
                src={avatarUrl}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-gray-700 font-medium text-sm">
              {user?.username || "Guest"}
            </span>
          </div>

          <button
            onClick={logout}
            className="px-4 py-1 text-sm text-gray-600 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-shadow shadow-sm"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
