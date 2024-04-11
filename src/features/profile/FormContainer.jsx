/* eslint-disable react/prop-types */
function FormContainer({ children }) {
  return (
    <div className="w-[40%] m-auto my-10 bg-lightBg px-6 py-4 shadow rounded-md">
      {children}
    </div>
  );
}

export default FormContainer;
