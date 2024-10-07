import { useForm } from "react-hook-form";
import { useTypes } from "../type/useTypes";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import { useCreateBudget } from "./useCreateBudget";

function CreateBudgetForm() {
  const { register, handleSubmit, reset } = useForm();
  const { types, isLoading: isLoadingType } = useTypes();
  const { createBudget, isLoading } = useCreateBudget();

  if (isLoadingType || isLoading) return <Spinner />;

  function onSubmit(data) {
    const formattedData = {
      type: parseInt(data.typeId),
      amount: data.amount,
      period: "Monthly",
    };
    createBudget(formattedData);
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
        <label htmlFor="typeId">Type</label>
        <select className="input-field" {...register("typeId")}>
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1 col-span-2">
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
      </div>

      <div className="flex gap-2 col-start-2 mt-4 justify-self-end self-end">
        <Button type="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="primary">Add budget</Button>
      </div>
    </form>
  );
}

export default CreateBudgetForm;
