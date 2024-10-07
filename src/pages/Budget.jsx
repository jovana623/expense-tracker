import LimitsList from "../features/budget/LimitsList";

function Budget() {
  return (
    <div className="grid grid-cols-2">
      <LimitsList />
      <div></div>
    </div>
  );
}

export default Budget;
