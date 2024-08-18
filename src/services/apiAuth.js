import axios from "axios";

export async function login({ email, password }) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/users/login/",
      { email, password },
      { withCredentials: true }
    );
    return response.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Login failed");
  }
}

export async function register({ username, email, password }) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/users/register/",
      { username, email, password },
      { withCredentials: true }
    );
    return response.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Register failed");
  }
}

export async function logout() {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/users/logout/"
    );
    return response.user.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Logout failed");
  }
}
