import { useUser } from "../authentification/useUser";

function ChangeProfileInfoForm() {
  const { data: user, isLoading } = useUser();

  return (
    <form>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        className="input-field"
        value="test"
        disabled={isLoading}
      />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        className="input-field"
        value={user.user.email}
        disabled={true}
      />
    </form>
  );
}

export default ChangeProfileInfoForm;
