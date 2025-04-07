import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";

/* eslint-disable react/prop-types */
function AddForm({ title, children }) {
  return (
    <Modal>
      <Modal.OpenButton opens="create-goal">
        <button className="flex items-center gap-2 bg-green-500 text-white px-3 py-2 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 hover:bg-green-600">
          <span className="bg-white rounded-full p-1 text-green-500">
            <AiOutlinePlus className="text-lg" />
          </span>
          <span className="font-medium text-xs">Add {title}</span>
        </button>
      </Modal.OpenButton>
      <Modal.Window name="create-goal">{children}</Modal.Window>
    </Modal>
  );
}

export default AddForm;
