import { useForm } from "react-hook-form";
import { useCreateTransaction } from "./useCreateTransaction";
import { useContext } from "react";
import { ModalContext } from "../../ui/Modal";
import { useCategories } from "../dashboard/useCategories";

import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { useType } from "../dashboard/useType";
import { useUpdateTransaction } from "../dashboard/useUpdateTransactions";

/* eslint-disable react/prop-types */
function CreateTransactionForm({ transactionToUpdate = {} }) {
  const { createTransaction, isLoading: isCreating } = useCreateTransaction();
  const { updatedTransaction, isLoading: isUpdating } = useUpdateTransaction();
  const { categories, isLoading: isLoadingCategories } = useCategories();
  const { type, isLoading: isLoadingType } = useType();

  const { id: updateId, ...updateValues } = transactionToUpdate;

  const isUpdateSession = Boolean(updateId);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: isUpdateSession ? updateValues : {},
  });

  const { close } = useContext(ModalContext);

  function onSubmit(data) {
    if (isUpdateSession) {
      updatedTransaction(
        { newTransaction: { ...data }, id: updateId },
        {
          onSuccess: () => {
            reset();
            close();
          },
        }
      );
      console.log(data);
    } else {
      createTransaction({ newTransaction: data });
    }
  }

  function onCancel() {
    close();
  }

  const isWorking = isCreating || isUpdating;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-10 px-5 py-3 w-fit grid grid-cols-2 gap-2 bg-lightBg"
    >
      {isLoadingCategories || isLoadingType ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-col gap-1">
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              id="Name"
              disabled={isWorking}
              {...register("Name")}
              className="input-field"
            ></input>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="Amount">Amount</label>
            <input
              type="number"
              className="input-field"
              id="Amount"
              {...register("Amount")}
            ></input>
          </div>

          <div className="flex flex-col gap-1 col-span-2">
            <label htmlFor="Category">Category</label>
            <select className="input-field" {...register("CategoryId")}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.Name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 col-span-2">
            <label htmlFor="Type">Type</label>
            <select className="input-field" {...register("TypeId")}>
              {type.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.Name}
                </option>
              ))}
            </select>
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

          <div className="col-span-2 flex flex-col gap-1">
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
