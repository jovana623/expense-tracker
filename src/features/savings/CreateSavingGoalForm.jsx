import { useForm } from "react-hook-form";
import { useContext } from "react";
import { ModalContext } from "../../ui/Modal";
import { useUpdateSaving } from "./useUpdateSaving";
import { useCreateSaving } from "./useCreateSaving";

import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";

/* eslint-disable react/prop-types */
function CreateSavingGoalForm({ savingToUpdate = {} }) {
  const { updateSaving, isLoading: isUpdating } = useUpdateSaving();
  const { createSaving, isLoading } = useCreateSaving();

  const { id: editId, ...editValues } = savingToUpdate;
  const isUpdateSession = Boolean(editId);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: isUpdateSession ? editValues : {},
  });

  const { errors } = formState;
  const { close } = useContext(ModalContext);

  function onSubmit(data) {
    const formattedData = {
      ...data,
      status: "In progress",
    };
    const updatedData = {
      id: editId,
      name: data.name,
      goal: data.goal,
      target_date: data.target_date,
      description: data.description,
      color: data.color,
    };
    console.log("Updated data:", updatedData);

    if (isUpdateSession) {
      updateSaving(updatedData);
    } else {
      createSaving(formattedData);
    }
    close();
  }

  function onCancel() {
    close();
    reset();
  }

  if (isLoading || isUpdating) return <Spinner />;
  return (
    <form
      role="form"
      data-testid="saving-form"
      onSubmit={handleSubmit(onSubmit)}
      className="m-0 sm:m-10 px-5 py-3 w-fit grid grid-cols-2 gap-2 bg-lightBg sm:text-base text-xs"
    >
      <div className="flex flex-col gap-1 sm:col-span-1 col-span-2">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
          className="input-field"
        ></input>
        <p className="text-xs text-red-500">{errors?.name?.message}</p>
      </div>

      <div className="flex flex-col gap-1 sm:col-span-1 col-span-2">
        <label htmlFor="goal">Goal</label>
        <input
          type="number"
          className="input-field"
          id="goal"
          {...register("goal", { required: "This field is required" })}
        ></input>
        <p className="text-xs text-red-500">{errors?.goal?.message}</p>
      </div>

      <div className="col-span-2 flex flex-col gap-1">
        <label htmlFor="target_date">Target Date</label>
        <input
          type="date"
          className="input-field"
          id="target_date"
          {...register("target_date", { required: "This field is required" })}
          min={new Date().toISOString().split("T")[0]}
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
      <div className="col-span-2 flex flex-col gap-1">
        <label htmlFor="color">Pick a color</label>
        <input
          type="color"
          className="p-1 h-10 block bg-white border border-gray-200 cursor-pointer rounded-lg w-1/2"
          id="color"
          {...register("color")}
        ></input>
      </div>

      <div className="flex gap-2 col-start-2 mt-4 justify-self-end self-end">
        <Button type="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="primary">
          {isUpdateSession ? "Update saving goal" : "Add goal"}
        </Button>
      </div>
    </form>
  );
}

export default CreateSavingGoalForm;
