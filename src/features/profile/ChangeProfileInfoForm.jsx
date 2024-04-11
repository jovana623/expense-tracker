import { useUser } from "../authentification/useUser";
import Button from "../../ui/Button";

function ChangeProfileInfoForm() {
  const { data: user, isLoading } = useUser();

  return (
    <form className="grid grid-cols-[2fr_3fr] gap-y-4 items-center">
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
      <label htmlFor="avatar">Upload avatar</label>
      <div className="relative">
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <button className="bg-green-500 hover:cursor-pointer text-white  py-2 px-4 rounded-md ">
          Choose File
        </button>
      </div>

      <div className="col-span-2 justify-self-end flex items-center gap-3">
        <Button>Cancel</Button>
        <Button type="primary">Confirm</Button>
      </div>
    </form>
  );
}

export default ChangeProfileInfoForm;
