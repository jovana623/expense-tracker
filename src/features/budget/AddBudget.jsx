import { CiCirclePlus } from "react-icons/ci";
import Modal from "../../ui/Modal";
import CreateBudgetForm from "./CreateBudgetForm";
function AddBudget() {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-5 py-9 flex justify-center items-center">
        <Modal>
          <Modal.OpenButton opens="create_budget">
            <button className="text-2xl">
              <CiCirclePlus />
            </button>
          </Modal.OpenButton>
          <Modal.Window name="create_budget">
            <CreateBudgetForm />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

export default AddBudget;
