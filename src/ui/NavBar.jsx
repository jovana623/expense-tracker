import { NavLink } from "react-router-dom";
import { BiHomeAlt2 } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { BiCoinStack } from "react-icons/bi";
import { VscGraphLine } from "react-icons/vsc";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

import Logo from "./Logo";

function NavBar() {
  const isStaff = localStorage.getItem("isStaff");

  const getNavLinkClass = ({ isActive }) =>
    `nav ${isActive ? "nav-active" : "nav"}`;

  return (
    <aside
      className="hidden lg:flex flex-col border-r border-gray-200 text-gray-500 dark:border-stone-700 
                 px-6 py-8 gap-y-10 h-full bg-white dark:bg-gray-800"
    >
      <Logo />
      <ul className="flex flex-col gap-y-3">
        <li>
          <NavLink to="dashboard/overview" className={getNavLinkClass}>
            <BiHomeAlt2 />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="transactions" className={getNavLinkClass}>
            <GrTransaction />
            <span>Transactions</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="calendar" className={getNavLinkClass}>
            <CiCalendar />
            <span>Calendar</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="budget" className={getNavLinkClass}>
            <BiCoinStack />
            <span>Budget</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="statistic" className={getNavLinkClass}>
            <VscGraphLine />
            <span>Statistic</span>
          </NavLink>
        </li>
        {isStaff && (
          <li>
            <NavLink to="admin" className={getNavLinkClass}>
              <MdOutlineAdminPanelSettings />
              <span>Admin Panel</span>
            </NavLink>
          </li>
        )}
      </ul>
    </aside>
  );
}

export default NavBar;
