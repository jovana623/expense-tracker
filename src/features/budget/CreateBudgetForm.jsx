import { useForm } from "react-hook-form";
import { useTypes } from "../type/useTypes";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import { useCreateBudget } from "./useCreateBudget";
import { useUpdateBudget } from "./useUpdateBudget";

/* eslint-disable react/prop-types */
function CreateBudgetForm({ budgetToUpdate = {} }) {
  console.log(budgetToUpdate);
  const { types, isLoading: isLoadingType } = useTypes();
  const { createBudget, isLoading } = useCreateBudget();
  const { updateBudget, isLoading: isUpdating } = useUpdateBudget();

  const { id: editId, ...editValues } = budgetToUpdate;
  const isUpdateSession = Boolean(editId);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: isUpdateSession ? editValues : {},
  });

  if (isLoadingType || isLoading || isUpdating) return <Spinner />;

  function onSubmit(data) {
    const formattedData = {
      type: parseInt(data.type),
      amount: data.amount,
      period: data.period,
    };
    if (isUpdateSession) {
      updateBudget(editId, formattedData);
    } else {
      createBudget(formattedData);
    }
  }

  function onCancel() {
    close();
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-0 sm:m-10 px-10 py-3 w-full bg-lightBg sm:text-base text-xs flex flex-col gap-2"
    >
      <div className="flex flex-col gap-1 col-span-2">
        <label htmlFor="type">Type</label>
        <select className="input-field" {...register("type")}>
          {types.map((type) => (
            <option key={type.name} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1 col-span-2">
        <label htmlFor="amount">Budget</label>
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
      </div>
      <div className="flex flex-col gap-1 col-span-2">
        <label htmlFor="period">Period</label>
        <select className="input-field" id="period" {...register("period")}>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>

      <div className="flex gap-2 col-start-2 mt-4 justify-self-end self-end">
        <Button type="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="primary">
          {isUpdateSession ? "Update budget" : "Add budget"}
        </Button>
      </div>
    </form>
  );
}

export default CreateBudgetForm;
