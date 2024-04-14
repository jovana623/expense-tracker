import { AiOutlinePlus } from "react-icons/ai";
import CreateSavingGoalForm from "./CreateSavingGoalForm";
import Modal from "../../ui/Modal";

function AddSavingButton() {
  return (
    <Modal>
      <Modal.OpenButton opens="create-goal">
        <button className="flex items-center gap- text-lightBg px-3 py-2 rounded-md h-">
          <span className="px-0.5 py-0.5 bg-lightBg rounded-full text-green-500">
            {" "}
            <AiOutlinePlus />
          </span>
          <span>Add new saving goal</span>
        </button>
      </Modal.OpenButton>
      <Modal.Window name="create-goal">
        <CreateSavingGoalForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddSavingButton;
