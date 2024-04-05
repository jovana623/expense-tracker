import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import CreateSavingGoalForm from "../features/savings/CreateSavingGoalForm";

function AddSavingGoal() {
  return (
    <Modal>
      <Modal.OpenButton opens="create-goal">
        <button className="flex items-center gap-2 bg-green-500 text-lightBg px-3 py-2 rounded-md hover:bg-green-600">
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

export default AddSavingGoal;
