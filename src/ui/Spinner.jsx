const Spinner = () => {
  return (
    <main className="h-screen flex items-center justify-center">
      <svg
        className="animate-spin w-32 h-32 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.373A8 8 0 0112 4v4c-3.128 0-5.373 2.245-6 5.373h4zm10 2.254A8 8 0 0112 20v-4c3.128 0 5.373-2.245 6-5.373h-4zm-10 0c.627 3.128 2.872 5.373 6 5.373v4a8 8 0 01-6-12h4z"
        ></path>
      </svg>
    </main>
  );
};

export default Spinner;
