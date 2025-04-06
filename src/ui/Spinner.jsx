const Spinner = () => {
  return (
    <div
      role="spinner"
      className="min-h-60 flex flex-col bg-white shadow-sm rounded-xl dark:bg-gray-700"
    >
      <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
        <div className="flex justify-center">
          <div
            className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
            role="status"
            aria-label="loading"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
