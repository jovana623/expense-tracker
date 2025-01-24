import { createContext, useContext, useState } from "react";
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

function Toggle({ id }) {
  const { openId, open, close, setPosition } = useContext(MenuContext);

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: rect.left - 20,
      y: rect.bottom + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }
  return (
    <button onClick={handleClick}>
      <HiEllipsisVertical />
    </button>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenuContext);
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return createPortal(
    /* eslint-disable-next-line react/no-unknown-property */
    <ul
      ref={ref}
      className="absolute top-[calc(100%+0.5rem)] left-0 z-10 bg-white border border-gray-200 rounded shadow-md z-2"
      style={{ top: position?.y, left: position?.x }}
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
        className="flex items-center justify-center gap-2 px-2 py-1 border-b border-stone-200 text-stone-500"
      >
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

Menu.Toggle = Toggle;
Menu.List = List;
Menu.Button = Button;

export default Menu;
