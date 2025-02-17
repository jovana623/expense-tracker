import axios from "axios";
import API_URL from "../../config";

export async function loginUser(credentials) {
  try {
    const response = await axios.post(`${API_URL}/users/token/`, credentials);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function registerUser(userData) {
  try {
    const response = await axios.post(`${API_URL}/users/register/`, userData);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function logoutUser() {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");

    if (!refreshToken || !accessToken) throw new Error("No tokens found");

    await axios.post(
      `${API_URL}/users/logout/`,
      { refresh: refreshToken },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getCurrentUser() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.get(`${API_URL}/users/me/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
