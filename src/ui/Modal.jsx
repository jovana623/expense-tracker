import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";

export const ModalContext = createContext();

/* eslint-disable react/prop-types */
function Modal({ children }) {
  const [openModal, setOpenModal] = useState("");

  const close = () => setOpenModal();
  const open = (modal) => setOpenModal(modal);

  return (
    <ModalContext.Provider value={{ openModal, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function OpenButton({ children, opens }) {
  const { open } = useContext(ModalContext);

  return <div onClick={() => open(opens)}>{children}</div>;
}

function Window({ children, name }) {
  const { openModal, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);

  if (name !== openModal) return null;

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 backdrop-blur-sm z-50 transition-all duration-500">
      <div
        ref={ref}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                  bg-lightBg flex flex-col p-5 rounded-md 
                  w-[90%] max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[600px] overflow-y-scroll dark:bg-gray-700"
      >
        <button
          onClick={close}
          className="self-end font-bold dark:text-lightBg"
        >
          <HiXMark />
        </button>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.OpenButton = OpenButton;
Modal.Window = Window;

export default Modal;
