import { useTypes } from "../type/useTypes";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { ModalContext } from "../../ui/Modal";
import { useCreateTransaction } from "./useCreateTransaction";
import { useUpdateTransaction } from "./useUpdateTransaction";
import { useCategories } from "../category/useCategories";
import { useCurrentUser } from "../authentification/useCurrentUser";

import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";

/* eslint-disable react/prop-types */
function CreateTransactionForm({ transactionToUpdate = {} }) {
  const { createTransaction, isLoading: isCreating } = useCreateTransaction();
  const { updateTransaction, isLoading } = useUpdateTransaction();
  const { types, isLoading: isLoadingType } = useTypes();
  const { categories, isLoading: isLoadingCategory } = useCategories();
  const { data: currentUser, isLoading: isLoadingUser } = useCurrentUser();

  const { id: editId, ...editValues } = transactionToUpdate;
  const isUpdateSession = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isUpdateSession
      ? {
          ...editValues,
          typeId: transactionToUpdate.type?.id,
          category: transactionToUpdate.type.category?.id,
        }
      : {},
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
      user: currentUser.id,
    };
    const updatedData = { id: editId, ...formattedData, user: currentUser.id };
    if (isUpdateSession) {
      updateTransaction(updatedData);
    } else {
      createTransaction(formattedData);
    }
    close();
  }

  function onCancel() {
    close();
    reset();
  }

  const isWorking = isCreating || isLoading || isLoadingUser;

  return (
    <form
      role="form"
      onSubmit={handleSubmit(onSubmit, onError)}
      className="m-0 px-5 py-3 w-full grid grid-cols-2 gap-2 bg-lightBg text-xs dark:bg-gray-700 sm:m-10 sm:text-base sm:w-fit"
    >
      {isLoadingType || isLoadingCategory ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-col gap-1 sm:col-span-1 col-span-2">
            <label htmlFor="name" className="dark:text-lightBg">
              Name
            </label>
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
          <div className="flex flex-col gap-1 sm:col-span-1 col-span-2">
            <label htmlFor="amount" className="dark:text-lightBg">
              Amount
            </label>
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
            <label htmlFor="category" className="dark:text-lightBg">
              Category
            </label>
            <select
              id="category"
              className="input-field"
              {...register("category")}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 col-span-2">
            <label htmlFor="typeId" className="dark:text-lightBg">
              Type
            </label>
            <select id="typeId" className="input-field" {...register("typeId")}>
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-red-500">{errors?.typeId?.message}</p>
          </div>

          <div className="col-span-2 flex flex-col gap-1">
            <label htmlFor="description" className="dark:text-lightBg">
              Description
            </label>
            <textarea
              className="input-field"
              type="textarea"
              id="description"
              {...register("description")}
            ></textarea>
          </div>

          <div className="col-span-2 flex flex-col gap-1">
            <label htmlFor="date" className="dark:text-lightBg">
              Date
            </label>
            <input
              type="date"
              className="input-field"
              id="date"
              {...register("date", { required: "This field is required" })}
            />
            <p className="text-xs text-red-500">{errors?.date?.message}</p>
          </div>
          <div className="col-span-2 flex flex-col gap-2 mt-4 sm:flex-row sm:justify-end">
            <Button
              type="secondary"
              onClick={onCancel}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button type="primary" className="w-full sm:w-auto">
              {isUpdateSession ? "Update transaction" : "Add transaction"}
            </Button>
          </div>
        </>
      )}
    </form>
  );
}
export default CreateTransactionForm;
