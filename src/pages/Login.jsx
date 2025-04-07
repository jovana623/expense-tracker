import { NavLink } from "react-router-dom";
import LoginForm from "../features/authentification/LoginForm";

function Login() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-800 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <h1 className="text-center font-bold text-4xl text-gray-900 dark:text-gray-100">
            Tracker
          </h1>
        </div>
        <h3 className="text-center text-xl font-medium text-gray-700 dark:text-gray-300">
          Sign into your account
        </h3>
        <LoginForm />
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          You do not have account?
          <NavLink
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            {" "}
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
