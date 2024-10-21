import CreateBudgetForm from "../features/budget/CreateBudgetForm";
import Limits from "../features/budget/Limits";
import AddForm from "../ui/AddForm";

function Budget() {
  return (
    <div className="w-[90%] m-auto py-2 sm:px-7 sm:w-full sm:m-0">
      <AddForm title="budget">
        <CreateBudgetForm />
      </AddForm>
      <Limits />
    </div>
  );
}

export default Budget;
