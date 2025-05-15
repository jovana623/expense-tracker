import { useState } from "react";
import { NavLink } from "react-router-dom";
import { BiCoinStack, BiHomeAlt2 } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { CiCalendar } from "react-icons/ci";
import { VscGraphLine } from "react-icons/vsc";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineContactSupport } from "react-icons/md";
import UserMenu from "../features/header/UserMenu";

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const isStaff = localStorage.getItem("isStaff");

  const getNavLinkClass = ({ isActive }) =>
    `nav ${isActive ? "nav-active" : "nav"}`;

  return (
    <nav className="relative">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-stone-700 dark:bg-gray-800 shadow-md">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl focus:outline-none text-gray-600 dark:text-gray-300 p-1 -ml-1"
        >
          <GiHamburgerMenu />
        </button>
        <UserMenu />
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-full bg-white transform dark:bg-gray-700 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 lg:hidden`}
      >
        <div className="flex justify-between items-center px-4 py-2 border-b border-stone-200">
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl focus:outline-none text-gray-600 dark:text-gray-300 p-1 -ml-1"
          >
            <AiOutlineClose />
          </button>
        </div>
        <ul className="flex flex-col items-center justify-center gap-8 text-stone-500 text-lg h-full">
          <li>
            <NavLink
              to="dashboard/overview"
              className={getNavLinkClass}
              onClick={() => setIsOpen(false)}
            >
              <BiHomeAlt2 />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="transactions"
              className={getNavLinkClass}
              onClick={() => setIsOpen(false)}
            >
              <GrTransaction />
              <span>Transactions</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="calendar"
              className={getNavLinkClass}
              onClick={() => setIsOpen(false)}
            >
              <CiCalendar />
              <span>Calendar</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="budget"
              className={getNavLinkClass}
              onClick={() => setIsOpen(false)}
            >
              <BiCoinStack />
              <span>Budget</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="statistic"
              className={getNavLinkClass}
              onClick={() => setIsOpen(false)}
            >
              <VscGraphLine />
              <span>Statistic</span>
            </NavLink>
          </li>
          {isStaff && (
            <li>
              <NavLink
                to="admin"
                className={getNavLinkClass}
                onClick={() => setIsOpen(false)}
              >
                <MdOutlineAdminPanelSettings />
                <span>Admin Panel</span>
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="support"
              className={getNavLinkClass}
              onClick={() => setIsOpen(false)}
            >
              <MdOutlineContactSupport />
              <span>Support</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default MobileNav;
