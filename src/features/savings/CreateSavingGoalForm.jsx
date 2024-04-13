import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useCreateSaving } from "./useCreateSaving";
import Spinner from "../../ui/Spinner";
import { useContext } from "react";
import { ModalContext } from "../../ui/Modal";
import { useUser } from "../authentification/useUser";
import { useUpdateSaving } from "./useUpdateSaving";

/* eslint-disable react/prop-types */
function CreateSavingGoalForm({ savingToUpdate = {} }) {
  const { updateSaving, isLoading: isUpdating } = useUpdateSaving();
  const { createSaving, isLoading } = useCreateSaving();
  const { data: user, isLoading: isLoadingUser } = useUser();

  const { id: editId, ...editValues } = savingToUpdate;
  const isUpdateSession = Boolean(editId);

  const { register, handleSubmit } = useForm({
    defaultValues: isUpdateSession ? editValues : {},
  });

  const { close } = useContext(ModalContext);

  function onSubmit(data) {
    if (isUpdateSession) {
      updateSaving({
        id: editId,
        name: data.name,
        amount: savingToUpdate.amount,
        goal: data.goal,
        target_Date: data.target_Date,
        description: data.description,
        userId: user.user.id,
      });
    } else {
      createSaving({
        name: data.name,
        goal: data.goal,
        target_Date: data.target_Date,
        description: data.description,
        userId: user.user.id,
      });
    }
  }

  function onCancel() {
    close();
  }

  if (isLoading || isLoadingUser || isUpdating) return <Spinner />;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-10 px-5 py-3 w-fit grid grid-cols-2 gap-2 bg-lightBg"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className="input-field"
        ></input>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="goal">Goal</label>
        <input
          type="number"
          className="input-field"
          id="goal"
          {...register("goal")}
        ></input>
      </div>

      <div className="col-span-2 flex flex-col gap-1">
        <label htmlFor="target_Date">Target Date</label>
        <input
          type="date"
          className="input-field"
          id="target_Date"
          {...register("target_Date")}
        ></input>
      </div>

      <div className="col-span-2 flex flex-col gap-1">
        <label htmlFor="description">Description</label>
        <textarea
          className="input-field"
          type="textarea"
          id="description"
          {...register("description")}
        ></textarea>
      </div>

      <div className="flex gap-2 col-start-2 mt-4">
        <Button type="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="primary">
          {isUpdateSession ? "Update saving goal" : "Add new goal"}
        </Button>
      </div>
    </form>
  );
}

export default CreateSavingGoalForm;
