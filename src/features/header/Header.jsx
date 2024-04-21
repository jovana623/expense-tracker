import { useLogout } from "../authentification/useLogout";
import { useUser } from "../authentification/useUser";
import { HiOutlineLogout } from "react-icons/hi";

function Header() {
  const { data: user, isLoadingUser } = useUser();
  const { logout, isLoading } = useLogout();

  console.log(isLoadingUser || isLoading);
  console.log(user.user);

  return (
    <div className="border-b border-stone-200 py-3 h-[50px] flex items-center gap-2 justify-end">
      <img src="../anon-user.png" className="w-8" />
      <p>Jonny</p>
      <button onClick={logout} className="ml-auto">
        <HiOutlineLogout />
      </button>
    </div>
  );
}

export default Header;
