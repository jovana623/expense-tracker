import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "../authentification/useUpdateUser";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 sm:space-y-4 h-full flex flex-col"
    >
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 w-full">
          <label
            htmlFor="email"
            className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-0.5"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            disabled={true}
            className="input-field text-gray-700 bg-gray-100 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500 cursor-not-allowed"
            {...register("email")}
          />
          <label className="mt-1.5 inline-block px-2 py-1 text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-500 dark:border-indigo-400 rounded-md cursor-pointer hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors">
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
      <div className="flex-grow">
        <label
          htmlFor="username"
          className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-0.5"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          className="input-field bg-gray-50 dark:bg-gray-700 dark:border-gray-500 dark:text-gray-200"
          {...register("username", {
            required: "Username can't be empty",
            minLength: { value: 3, message: "Min. 3 characters" },
          })}
        />
      </div>

      <div className="flex flex-col w-full mt-auto">
        <Button type="primary" className="w-full py-1.5 sm:py-2 text-sm">
          {isUpdating ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

export default ChangeProfileInfoForm;
