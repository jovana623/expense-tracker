import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { BiHomeAlt2 } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { BiCoinStack } from "react-icons/bi";
import { VscGraphLine } from "react-icons/vsc";
import { RxGear } from "react-icons/rx";
import { RxAvatar } from "react-icons/rx";
import { CiCalendar } from "react-icons/ci";

function NavBar() {
  return (
    <nav className="flex flex-col row-span-2 border-r border-stone-200 px-10 gap-10">
      <Logo />
      <ul className="flex flex-col gap-4 text-stone-500 text-lg">
        <li>
          <NavLink
            to="dashboard/overview"
            className={({ isActive }) => (isActive ? "nav nav-active" : "nav")}
          >
            <BiHomeAlt2 />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="transactions"
            className={({ isActive }) => (isActive ? "nav nav-active" : "nav")}
          >
            <GrTransaction />
            <span>Transactions</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="calendar"
            className={({ isActive }) => (isActive ? "nav nav-active" : "nav")}
          >
            <CiCalendar />
            <span>Calendar</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="budget"
            className={({ isActive }) => (isActive ? "nav nav-active" : "nav")}
          >
            <BiCoinStack />
            <span>Budget</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="statistic"
            className={({ isActive }) => (isActive ? "nav nav-active" : "nav")}
          >
            <VscGraphLine />
            <span>Statistic</span>
          </NavLink>
        </li>

        <li className="pt-[250px]">
          <NavLink
            to="settings"
            className={({ isActive }) => (isActive ? "nav nav-active" : "nav")}
          >
            <RxGear />
            <span>Settings</span>
          </NavLink>
        </li>
        <li className="pb-[30px]">
          <NavLink
            to="profile"
            className={({ isActive }) => (isActive ? "nav nav-active" : "nav")}
          >
            <RxAvatar />
            <span>Profile</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
