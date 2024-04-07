import { useContext } from "react";
import Button from "../../ui/Button";
import { ModalContext } from "../../ui/Modal";
import { useForm } from "react-hook-form";
import { useCreateSavingPayment } from "./useCreateSavingPayment";
import Spinner from "../../ui/Spinner";
import { useUpdateSaving } from "./useUpdateSaving";

/* eslint-disable react/prop-types */
function AddToSavingForm({ saving }) {
  const { createPayment, isLoading } = useCreateSavingPayment();
  const { handleSubmit, register, reset, formState } = useForm();
  const { updateSaving, isLoading: isLoadingUpdate } = useUpdateSaving();

  const { errors } = formState;
  const { close } = useContext(ModalContext);

  function onCancel() {
    close();
  }

  const { id } = saving;

  function onSubmit(data) {
    createPayment({ ...data });
    updateSaving(
      { newAmount: data.Amount, id: data.SavingId, newStatus: saving.Status },
      {
        onSuccess: () => {
          close();
          reset();
        },
      }
    );
  }

  function onError(errors) {
    console.log(errors);
  }

  if (isLoading || isLoadingUpdate) return <Spinner />;

  return (
    <form
      key={saving.id}
      onSubmit={handleSubmit(onSubmit, onError)}
      className="m-10 px-5 py-3 w-fit grid grid-cols-2 gap-2 bg-lightBg"
    >
      <div className="hidden">
        <label htmlFor="SavingId">SavingId</label>
        <input
          type="number"
          id="SavingId"
          className="input-field"
          value={id}
          {...register("SavingId")}
        ></input>
      </div>

      <div className="flex flex-col gap-1 col-span-2 bg-gray-50">
        <label htmlFor="Name">Saving name</label>
        <input
          type="text"
          id="Name"
          disabled={true}
          className="input-field"
          defaultValue={saving.Name}
        ></input>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="Amount">Amount</label>
        <input
          type="number"
          id="Amount"
          className="input-field"
          {...register("Amount", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Amount should be at least 1",
            },
            max: {
              value: saving.Goal - saving.Amount,
              message: `You only need ${
                saving.Goal - saving.Amount
              }€ to reach the goal`,
            },
          })}
        ></input>
        <p className="text-xs text-red-500">{errors?.Amount?.message}</p>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="Date">Date</label>
        <input
          type="date"
          className="input-field"
          id="Date"
          {...register("Date", {
            required: "This field is required",
          })}
        ></input>
        <p className="text-xs text-red-500">{errors?.Date?.message}</p>
      </div>

      <div className="flex gap-2 col-start-2 mt-4">
        <Button type="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="primary">Add payment</Button>
      </div>
    </form>
  );
}

export default AddToSavingForm;
