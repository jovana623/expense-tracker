import { NavLink } from "react-router-dom";
import LoginForm from "../features/authentification/LoginForm";

function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-md xl:max-w-md">
        <h1 className="text-center mb-10 font-semibold text-4xl">Tracker</h1>
        <h3 className="text-center font-semibold text-xl mb-5">
          Log in to your account{" "}
        </h3>
        <LoginForm />
        <p className="text-xs text-center">
          You do not have account?{" "}
          <NavLink to="/register" className="text-blue-500">
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
