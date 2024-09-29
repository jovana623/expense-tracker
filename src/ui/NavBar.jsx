import { NavLink } from "react-router-dom";
import { useState } from "react";
import Logo from "./Logo";
import { BiHomeAlt2 } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { BiCoinStack } from "react-icons/bi";
import { VscGraphLine } from "react-icons/vsc";
import { RxGear } from "react-icons/rx";
import { RxAvatar } from "react-icons/rx";
import { CiCalendar } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative">
      <div className="lg:hidden flex items-center justify-between px-4 py-2 border-b border-stone-200">
        <Logo />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl focus:outline-none"
        >
          {isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-full bg-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 lg:hidden`}
      >
        {/* Close button in the mobile menu */}
        <div className="flex justify-between items-center px-4 py-2 border-b border-stone-200">
          <Logo />
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl focus:outline-none"
          >
            <AiOutlineClose />
          </button>
        </div>
        <ul className="flex flex-col items-center justify-center gap-8 text-stone-500 text-lg h-full">
          <li>
            <NavLink
              to="dashboard/overview"
              className={({ isActive }) =>
                isActive ? "nav nav-active" : "nav"
              }
              onClick={() => setIsOpen(false)}
            >
              <BiHomeAlt2 />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="transactions"
              className={({ isActive }) =>
                isActive ? "nav nav-active" : "nav"
              }
              onClick={() => setIsOpen(false)}
            >
              <GrTransaction />
              <span>Transactions</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="calendar"
              className={({ isActive }) =>
                isActive ? "nav nav-active" : "nav"
              }
              onClick={() => setIsOpen(false)}
            >
              <CiCalendar />
              <span>Calendar</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="budget"
              className={({ isActive }) =>
                isActive ? "nav nav-active" : "nav"
              }
              onClick={() => setIsOpen(false)}
            >
              <BiCoinStack />
              <span>Budget</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="statistic"
              className={({ isActive }) =>
                isActive ? "nav nav-active" : "nav"
              }
              onClick={() => setIsOpen(false)}
            >
              <VscGraphLine />
              <span>Statistic</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="settings"
              className={({ isActive }) =>
                isActive ? "nav nav-active" : "nav"
              }
              onClick={() => setIsOpen(false)}
            >
              <RxGear />
              <span>Settings</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                isActive ? "nav nav-active" : "nav"
              }
              onClick={() => setIsOpen(false)}
            >
              <RxAvatar />
              <span>Profile</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Menu for larger screens */}
      <div className="hidden lg:flex flex-col row-span-2 border-r border-stone-200 px-10 gap-10">
        <Logo />
        <ul className="flex flex-col gap-4 text-stone-500 text-lg">
          <li>
            <NavLink
              to="dashboard/overview"
              className={({ isActive }) =>
                isActive ? "nav nav-active" : "nav"
              }
            >
              <BiHomeAlt2 />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="transactions"
              className={({ isActive }) =>
                isActive ? "nav nav-active" : "nav"
              }
            >
              <GrTransaction />
              <span>Transactions</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="calendar"
              className={({ isActive }) =>
                isActive ? "nav nav-active" : "nav"
              }
            >
              <CiCalendar />
              <span>Calendar</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="budget"
              className={({ isActive }) =>
                isActive ? "nav nav-active" : "nav"
              }
            >
              <BiCoinStack />
              <span>Budget</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="statistic"
              className={({ isActive }) =>
                isActive ? "nav nav-active" : "nav"
              }
            >
              <VscGraphLine />
              <span>Statistic</span>
            </NavLink>
          </li>

          <li className="pt-[250px]">
            <NavLink
              to="settings"
              className={({ isActive }) =>
                isActive ? "nav nav-active" : "nav"
              }
            >
              <RxGear />
              <span>Settings</span>
            </NavLink>
          </li>
          <li className="pb-[30px]">
            <NavLink
              to="profile"
              className={({ isActive }) =>
                isActive ? "nav nav-active" : "nav"
              }
            >
              <RxAvatar />
              <span>Profile</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
