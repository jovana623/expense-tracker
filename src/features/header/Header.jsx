import { useLogout } from "../authentification/useLogout";
import { useCurrentUser } from "../authentification/useCurrentUser";
import Spinner from "../../ui/Spinner";

function Header() {
  const { mutate: logout } = useLogout();
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return <Spinner />;

  return (
    <div className="border-b border-stone-200 py-3 h-[50px] flex items-center justify-end pr-12 pl-6 sticky top-0 bg-white z-10 md:bg-white gap-6">
      <div className="flex items-center gap-3">
        <img
          src="/anon-user.png"
          width="36px"
          className="rounded-full shadow-sm"
        />
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
  );
}

export default Header;
