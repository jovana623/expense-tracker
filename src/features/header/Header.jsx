import { HiOutlineLogout } from "react-icons/hi";
import { useAuth } from "../authentification/useAuth";

function Header() {
  const { logout } = useAuth();
  return (
    <div className="border-b border-stone-200 py-3 h-[50px] flex items-center justify-end pr-8 gap-4 sticky top-0 bg-white z-10 md:bg-white">
      <div className="flex items-center gap-1">
        <img src="/anon-user.png" width="30px" />
        <p>User 1</p>
      </div>
      <HiOutlineLogout onClick={logout} />
    </div>
  );
}

export default Header;
