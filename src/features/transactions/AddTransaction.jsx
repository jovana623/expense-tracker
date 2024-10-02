import Modal from "../../ui/Modal";
import CreateTransactionForm from "./CreateTransactionForm";
import { AiOutlinePlus } from "react-icons/ai";

function AddTransaction() {
  return (
    <div>
      <Modal>
        <Modal.OpenButton opens="transaction-form">
          <button className="flex items-center gap-2 bg-green-500 text-lightBg px-3 py-2 rounded-md hover:bg-green-600">
            <span className="px-0.5 py-0.5 bg-lightBg rounded-full text-green-500">
              {" "}
              <AiOutlinePlus />
            </span>
            <span>Add transaction</span>
          </button>
        </Modal.OpenButton>

        <Modal.Window
          name="transaction-form"
          onClick={(e) => e.stopPropagation()}
        >
          <CreateTransactionForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddTransaction;
