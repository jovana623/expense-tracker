import { useContext } from "react";
import { useCreateSavingPayment } from "../payments/useCreateSavingPayment";
import { useForm } from "react-hook-form";
import { ModalContext } from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import { useCreateExpense } from "../expenses/useCreateExpense";
import { useUser } from "../authentification/useUser";

/* eslint-disable react/prop-types */
function AddToSavingForm({ saving }) {
  const { createPayment, isLoading } = useCreateSavingPayment();
  const { handleSubmit, register, formState } = useForm();
  const { createExpense, isLoading: isCreatingExpense } = useCreateExpense();
  const { data: user, isLoading: isLoadingUser } = useUser();

  const { errors } = formState;
  const { close } = useContext(ModalContext);

  function onCancel() {
    close();
  }

  function onSubmit(data) {
    createPayment({
      amount: data.amount,
      date: data.date,
      savingId: saving.id,
    });
    createExpense({
      name: `${saving.name} payment`,
      typeId: 9,
      amount: data.amount,
      description: `Added ${saving.amount} to ${data.name}`,
      userId: user.user.id,
      date: data.date,
    });
  }

  function onError(errors) {
    console.log(errors);
  }

  if (isLoading || isCreatingExpense || isLoadingUser) return <Spinner />;

  return (
    <form
      key={saving.id}
      onSubmit={handleSubmit(onSubmit, onError)}
      className="m-10 px-5 py-3 w-fit grid grid-cols-2 gap-2 bg-lightBg"
    >
      <div className="flex flex-col gap-1 col-span-2 bg-gray-50">
        <label htmlFor="name">Saving name</label>
        <input
          type="text"
          id="name"
          disabled={true}
          className="input-field"
          defaultValue={saving.name}
          {...register("name")}
        ></input>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="amount">Amount</label>
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
      <div className="flex flex-col gap-1">
        <label htmlFor="date">Date</label>
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
