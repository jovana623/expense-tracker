import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../../ui/Modal";
import CreateBudgetForm from "./CreateBudgetForm";

function AddBudget() {
  return (
    <Modal>
      <Modal.OpenButton opens="create_budget">
        <button className="flex items-center gap-2 bg-green-500 text-lightBg px-3 py-2 rounded-md hover:bg-green-600">
          <span className="px-0.5 py-0.5 bg-lightBg rounded-full text-green-500">
            {" "}
            <AiOutlinePlus />
          </span>
          <span>Add budget</span>
        </button>
      </Modal.OpenButton>
      <Modal.Window name="create_budget">
        <CreateBudgetForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddBudget;
