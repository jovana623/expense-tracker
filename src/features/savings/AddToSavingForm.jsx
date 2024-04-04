import { useContext } from "react";
import Button from "../../ui/Button";
import { ModalContext } from "../../ui/Modal";
import { useForm } from "react-hook-form";
import { useCreateSavingPayment } from "./useCreateSavingPayment";
import Spinner from "../../ui/Spinner";

/* eslint-disable react/prop-types */
function AddToSavingForm({ saving }) {
  const { createPayment, isLoading } = useCreateSavingPayment();
  const { handleSubmit, register } = useForm();

  const { close } = useContext(ModalContext);
  function onCancel() {
    close();
  }

  //const { id } = saving;

  function onSubmit() {
    createPayment({
      Amount: 120,
      Date: "2024-03-12",
    });
  }

  if (isLoading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-10 px-5 py-3 w-fit grid grid-cols-2 gap-2 bg-lightBg"
    >
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
          {...register("Amount")}
        ></input>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="Date">Date</label>
        <input
          type="date"
          className="input-field"
          id="Date"
          {...register("Date")}
        ></input>
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
