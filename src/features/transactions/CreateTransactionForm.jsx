import { useType } from "../type/useType";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { ModalContext } from "../../ui/Modal";
import { useCreateTransaction } from "./useCreateTransaction";
import { useUpdateTransaction } from "./useUpdateTransaction";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { useCategories } from "../category/useCategories";

/* eslint-disable react/prop-types */
function CreateTransactionForm({ transactionToUpdate = {} }) {
  const { createTransaction, isLoading: isCreating } = useCreateTransaction();
  const { updateTransaction, isLoading } = useUpdateTransaction();
  const { types, isLoading: isLoadingType } = useType();
  const { categories, isLoading: isLoadingCategory } = useCategories();

  const { id: editId, ...editValues } = transactionToUpdate;
  const isUpdateSession = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isUpdateSession ? editValues : {},
  });

  function onError() {
    console.log(errors);
  }

  const { errors } = formState;
  const { close } = useContext(ModalContext);

  function onSubmit(data) {
    const formattedData = {
      name: data.name,
      date: data.date,
      type: parseInt(data.typeId),
      amount: parseFloat(data.amount),
      description: data.description,
    };
    if (isUpdateSession) {
      updateTransaction(editId, formattedData);
    } else {
      createTransaction(formattedData);
    }
  }

  function onCancel() {
    close();
    reset();
  }

  const isWorking = isCreating || isLoading;

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="m-10 px-5 py-3 w-fit grid grid-cols-2 gap-2 bg-lightBg"
    >
      {isLoadingType || isLoadingCategory ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              disabled={isWorking}
              {...register("name", {
                required: "This field is required",
              })}
              className="input-field"
            ></input>
            <p className="text-xs text-red-500">{errors?.name?.message}</p>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="amount">Amount</label>
            <input
              type="text"
              className="input-field"
              id="amount"
              {...register("amount", {
                required: "This field is required",
                min: {
                  value: 0,
                  message: "Amount can't be less than 0",
                },
              })}
            ></input>
            <p className="text-xs text-red-500">{errors?.amount?.message}</p>
          </div>

          <div className="flex flex-col gap-1 col-span-2">
            <label htmlFor="category">Category</label>
            <select className="input-field" {...register("category")}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 col-span-2">
            <label htmlFor="typeId">Type</label>
            <select className="input-field" {...register("typeId")}>
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-red-500">{errors?.typeId?.message}</p>
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
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="input-field"
              id="date"
              {...register("date", { required: "This field is required" })}
            />
            <p className="text-xs text-red-500">{errors?.date?.message}</p>
          </div>
          <div className="flex gap-2 col-start-2 mt-4">
            <Button type="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="primary">
              {isUpdateSession ? "Update transaction" : "Add transaction"}
            </Button>
          </div>
        </>
      )}
    </form>
  );
}
export default CreateTransactionForm;
