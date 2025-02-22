import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import { useUpdateUser } from "../authentification/useUpdateUser";
import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
function ChangeProfileInfoForm({ user, isLoading }) {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: user,
  });

  const { updateUser, isLoading: isUpdating } = useUpdateUser();
  const [selectedFile, setSelectedFile] = useState();
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  if (isLoading) return <Spinner />;
  console.log(user);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setValue("avatar", file);
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
    }
  }

  const avatarUrl =
    avatarPreview ||
    (user?.avatar ? `http://localhost:8000${user.avatar}` : "/anon-user.png");

  function onSubmit(data) {
    const formData = new FormData();
    formData.append("username", data.username);
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }
    updateUser(formData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-lg font-medium">Profile Information</h2>
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <input
            type="email"
            id="email"
            disabled={true}
            className="input-field bg-gray-100"
            {...register("email")}
          ></input>
          <label className="text-green-500 text-sm mt-2 cursor-pointer">
            Change Avatar
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Change Username</h3>
        <input
          type="text"
          id="username"
          className="input-field bg-gray-50"
          {...register("username", {
            required: "Username can't be empty",
          })}
        ></input>
      </div>

      <div className="flex flex-col w-full">
        <Button type="primary" className="w-full">
          {isUpdating ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}

export default ChangeProfileInfoForm;
