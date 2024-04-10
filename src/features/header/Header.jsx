import { useLogout } from "../authentification/useLogout";
import { useUser } from "../authentification/useUser";
import { HiOutlineLogout } from "react-icons/hi";

function Header() {
  const { data: user, isLoadingUser } = useUser();
  const { logout, isLoading } = useLogout();

  console.log(isLoadingUser || isLoading);

  return (
    <div className="border-b border-stone-200 py-3 h-[50px] flex items-center gap-3 sticky">
      <p>Welcome, {user.user.email}</p>
      <button onClick={logout}>
        <HiOutlineLogout />
      </button>

      <div className="ml-auto mr-9"></div>
    </div>
  );
}

export default Header;
