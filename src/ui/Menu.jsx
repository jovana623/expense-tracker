import { createContext, useContext, useEffect, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { createPortal } from "react-dom";

const MenuContext = createContext();

/* eslint-disable react/prop-types */
function Menu({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenuContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function Toggle({ id, icon: Icon = HiEllipsisVertical }) {
  const { openId, open, close, setPosition } = useContext(MenuContext);

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.scrollX + rect.left,
      y: rect.bottom + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }
  return (
    <button
      onClick={handleClick}
      data-testid="menu-toggle"
      className="p-2 rounded-full 
                 text-stone-600 dark:text-gray-300
                 hover:bg-inherit dark:hover:bg-inherit
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800
                 transition-colors duration-150 ease-in-out"
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenuContext);
  const refFromHook = useOutsideClick(close, true);

  const [dynamicStyle, setDynamicStyle] = useState({ opacity: 0 });

  useEffect(() => {
    if (openId === id && position && refFromHook.current) {
      const listElement = refFromHook.current;
      const listWidth = listElement.offsetWidth;
      const viewportWidth = window.innerWidth;

      let calculatedLeft = position.x;

      if (position.x + listWidth > viewportWidth) {
        calculatedLeft = viewportWidth - listWidth - 8;
        if (calculatedLeft < 8) calculatedLeft = 8;
      }

      setDynamicStyle({
        top: `${position.y}px`,
        left: `${calculatedLeft}px`,
        opacity: 1,
      });
    } else {
      setDynamicStyle({ opacity: 0 });
    }
  }, [openId, id, position, refFromHook]);

  if (openId !== id) return null;

  return createPortal(
    <ul
      ref={refFromHook}
      className="absolute z-50 mt-1 
                 bg-white dark:bg-gray-800 
                 rounded-lg shadow-xl
                 ring-1 ring-black ring-opacity-5 dark:ring-gray-700
                 p-1
                 transition-opacity duration-100 ease-out"
      style={dynamicStyle}
    >
      {children}
    </ul>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenuContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        onClick={handleClick}
        className="flex items-center px-3 py-2 text-sm text-left text-gray-700 dark:text-gray-200
                   hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700
                   rounded-md transition-colors duration-150 ease-in-out"
      >
        {icon && (
          <span className="mr-3 text-gray-500 dark:text-gray-400 flex-shrink-0">
            {icon}
          </span>
        )}
        <span className="whitespace-nowrap">{children}</span>
      </button>
    </li>
  );
}

Menu.Toggle = Toggle;
Menu.List = List;
Menu.Button = Button;

export default Menu;
