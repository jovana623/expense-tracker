//import { HiOutlineLogout } from "react-icons/hi";

import { useAuth } from "../authentification/useAuth";

function Header() {
  const { logout } = useAuth();
  return (
    <div className="border-b border-stone-200 py-3 h-[50px] flex items-center gap-2 justify-end">
      <div>
        <h1>Welcome!</h1>
        <button onClick={logout} className="btn-submit">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
