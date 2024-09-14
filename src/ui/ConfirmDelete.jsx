import { useContext } from "react";
import Button from "./Button";
import { ModalContext } from "./Modal";

/* eslint-disable react/prop-types */
function ConfirmDelete({ nameModal, onConfirm }) {
  const { close } = useContext(ModalContext);

  function handleConfirm() {
    onConfirm();
    close();
  }

  return (
    <div className="px-2 py-2 flex flex-col gap-3">
      <h2 className="font-semibold text-xl">Delete {nameModal}</h2>
      <p>Are you sure you want to delete this {nameModal} permanently?</p>
      <div className="flex justify-end gap-2">
        <Button type="secondary" onClick={close}>
          Cancel
        </Button>
        <Button type="danger" onClick={handleConfirm}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
