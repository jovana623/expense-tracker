import { useContext } from "react";
import { useCreateSavingPayment } from "./useCreateSavingPayment";
import { useForm } from "react-hook-form";
import { ModalContext } from "../../ui/Modal";

import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import { useType } from "../type/useType";

/* eslint-disable react/prop-types */
function AddPayment({ saving }) {
  const { createPayment, isLoading } = useCreateSavingPayment();
  const { type, isLoading: isLoadingType } = useType(16);

  const { handleSubmit, register, formState } = useForm();

  const { errors } = formState;
  const { close } = useContext(ModalContext);

  function onCancel() {
    close();
  }

  console.log(type);

  function onSubmit(data) {
    const formattedData = {
      amount: data.amount,
      date: data.date,
      saving: saving.id,
    };
    createPayment(formattedData);
    close();
  }

  function onError(errors) {
    console.log(errors);
  }

  if (isLoading || isLoadingType) return <Spinner />;

  return (
    <form
      key={saving.id}
      onSubmit={handleSubmit(onSubmit, onError)}
      className="m-0 sm:m-10 px-5 py-3 w-fit grid grid-cols-2 gap-2 bg-lightBg sm:text-base text-xs dark:bg-gray-700"
    >
      <div className="flex flex-col gap-1 col-span-2">
        <label htmlFor="name" className="dark:text-lightBg">
          Saving name
        </label>
        <input
          type="text"
          id="name"
          disabled={true}
          className="input-field"
          defaultValue={saving.name}
          {...register("name")}
        ></input>
      </div>

      <div className="flex flex-col gap-1 sm:col-span-1 col-span-2">
        <label htmlFor="amount" className="dark:text-lightBg">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          className="input-field"
          {...register("amount", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Amount should be at least 1",
            },
            max: {
              value: saving.goal - saving.amount,
              message: `You only need ${
                saving.goal - saving.amount
              }€ to reach the goal`,
            },
          })}
        ></input>
        <p className="text-xs text-red-500">{errors?.amount?.message}</p>
      </div>
      <div className="flex flex-col gap-1 sm:col-span-1 col-span-2">
        <label htmlFor="date" className="dark:text-lightBg">
          Date
        </label>
        <input
          type="date"
          className="input-field"
          id="date"
          {...register("date", {
            required: "This field is required",
          })}
        ></input>
        <p className="text-xs text-red-500">{errors?.Date?.message}</p>
      </div>

      <div className="flex gap-2 col-start-2 mt-4 justify-self-end self-end ">
        <Button type="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="primary">Add payment</Button>
      </div>
    </form>
  );
}

export default AddPayment;
