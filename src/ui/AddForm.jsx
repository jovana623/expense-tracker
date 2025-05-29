import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";

/* eslint-disable react/prop-types */
function AddForm({ title, children }) {
  return (
    <Modal>
      <Modal.OpenButton opens="create-goal">
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl
                     bg-gradient-to-br from-green-500 to-emerald-600 text-white
                     shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out
                     hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-green-400
                     dark:from-green-600 dark:to-emerald-700 dark:shadow-md dark:hover:shadow-lg"
        >
          <span
            className="rounded-full p-1
                       bg-white bg-opacity-20 text-white"
          >
            <AiOutlinePlus className="text-lg" />
          </span>
          <span className="font-semibold text-sm">Add {title}</span>
        </button>
      </Modal.OpenButton>
      <Modal.Window name="create-goal">{children}</Modal.Window>
    </Modal>
  );
}

export default AddForm;
