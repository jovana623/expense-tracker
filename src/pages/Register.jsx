import { NavLink } from "react-router-dom";
import RegisterForm from "../features/authentification/RegisterForm";

function Register() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/4">
        <h1 className="text-center mb-10 font-semibold text-4xl">Tracker</h1>
        <h3 className="text-center font-semibold text-xl mb-5">
          Register your account{" "}
        </h3>
        <RegisterForm />
        <p className="text-xs text-center">
          You already have account?{" "}
          <NavLink to="/login" className="text-blue-500">
            Sign in
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;
