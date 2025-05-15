import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useCreateThread } from "./useCreateThread";

function NewSupportRequestForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { createThread, isLoading } = useCreateThread();

  const onSubmitHandler = (data) => {
    createThread(data);
    reset();
  };

  const handleTextareaInput = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="space-y-4 p-6 bg-white dark:bg-gray-700 rounded-lg max-w-lg mx-auto"
    >
      <div>
        <label htmlFor="subject" className="dark:text-lightBg">
          Subject
        </label>

        <input
          type="text"
          id="subject"
          className="input-field"
          {...register("subject", {
            required: "Subject is required",
            minLength: {
              value: 3,
              message: "Subject must be at least 3 characters",
            },
          })}
          disabled={isLoading}
        />

        {errors.subject && (
          <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="dark:text-lightBg">
          Message
        </label>

        <textarea
          id="message"
          rows={4}
          className=" px-4 py-3 shadow-md border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white focus:shadow-md w-full border-stone-200 bg-white text-gray-800 duration-300 dark:bg-gray-800 dark:text-white dark:border-stone-600"
          {...register("message", {
            required: "Message is required",
            minLength: {
              value: 10,
              message: "Message must be at least 10 characters",
            },
          })}
          onInput={handleTextareaInput}
          disabled={isLoading}
          style={{ maxHeight: "200px", overflowY: "auto" }}
        ></textarea>

        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="secondary" className="w-full sm:w-auto">
          Cancel
        </Button>
        <Button type="primary" className="w-full sm:w-auto">
          Create request
        </Button>
      </div>
    </form>
  );
}

export default NewSupportRequestForm;
