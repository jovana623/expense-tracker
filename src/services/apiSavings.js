import axios from "axios";
import API_URL from "../config";

export async function getSavings() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.get(`${API_URL}/savings/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getSaving(id) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.get(`${API_URL}/savings/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createSaving(savingData) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.post(
      `${API_URL}/savings/create_saving`,
      savingData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateSaving(
  id,
  name,
  goal,
  target_date,
  description,
  color
) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");

    const response = await axios.patch(
      `${API_URL}/savings/${id}`,
      { name, goal, target_date, description, color },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Update Saving Error: ", error);
    throw new Error(error.response?.data || error.message);
  }
}

export async function deleteSaving(id) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.delete(`${API_URL}/savings/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateSavingStatus(id, status) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.patch(
      `${API_URL}/savings/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
