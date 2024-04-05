import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useCreateSaving } from "./useCreateSaving";
import Spinner from "../../ui/Spinner";
import { useContext } from "react";
import { ModalContext } from "../../ui/Modal";

function CreateSavingGoalForm() {
  const { register, handleSubmit } = useForm();

  const { createSaving, isLoading } = useCreateSaving();

  const { close } = useContext(ModalContext);

  function onSubmit(data) {
    createSaving({ ...data });
  }

  function onCancel() {
    close();
  }

  if (isLoading) return <Spinner />;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-10 px-5 py-3 w-fit grid grid-cols-2 gap-2 bg-lightBg"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="Name">Name</label>
        <input
          type="text"
          id="Name"
          {...register("Name")}
          className="input-field"
        ></input>
      </div>
      <div className="hidden">
        <label htmlFor="Amount">Amount</label>
        <input
          type="number"
          className="input-field"
          id="Amount"
          value={0}
          {...register("Amount", {
            transform: (value) => parseFloat(value),
          })}
        ></input>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="Goal">Goal</label>
        <input
          type="number"
          className="input-field"
          id="Goal"
          {...register("Goal")}
        ></input>
      </div>

      <div className="col-span-2 flex flex-col gap-1">
        <label htmlFor="Target_Date">Target Date</label>
        <input
          type="date"
          className="input-field"
          id="Date"
          {...register("Target_Date")}
        ></input>
      </div>

      <div className="col-span-2 flex flex-col gap-1">
        <label htmlFor="Description">Description</label>
        <textarea
          className="input-field"
          type="textarea"
          id="Description"
          {...register("Description")}
        ></textarea>
      </div>

      <div className="hidden">
        <label htmlFor="Status">Status</label>
        <input
          type="text"
          className="input-field"
          id="Status"
          value="In progress"
          {...register("Status")}
        ></input>
      </div>

      <div className="flex gap-2 col-start-2 mt-4">
        <Button type="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="primary">Add new goal</Button>
      </div>
    </form>
  );
}

export default CreateSavingGoalForm;
