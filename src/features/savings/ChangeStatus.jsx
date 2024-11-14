import { useContext } from "react";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { useUpdateStatus } from "./useUpdateStatus";
import { ModalContext } from "../../ui/Modal";

/* eslint-disable react/prop-types */
function ChangeStatus({ saving }) {
  const { savingStatus, isLoading } = useUpdateStatus();
  const { close } = useContext(ModalContext);

  function handleStatusChange(newStatus) {
    savingStatus({ id: saving.id, status: newStatus });
    close();
  }

  if (isLoading) return <Spinner />;
  return (
    <div className="px-2 py-2 flex flex-col gap-3">
      <h2 className="font-semibold text-xl">Change status</h2>
      <p>
        Are you sure you want to{" "}
        {saving.status === "In progress"
          ? "put this saving on hold"
          : "resume this saving"}
        ?
      </p>
      <div className="flex justify-end gap-2">
        <Button type="secondary" onClick={close}>
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={() =>
            handleStatusChange(
              saving.status === "In progress" ? "On hold" : "In progress"
            )
          }
        >
          {saving.status === "In progress" ? "Put on hold" : "Resume"}
        </Button>
      </div>
    </div>
  );
}

export default ChangeStatus;
