import axios from "axios";
import API_URL from "../config";

export async function getTypes() {
  try {
    const response = await axios.get(`${API_URL}/transactions/types`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getType(id) {
  try {
    const response = await axios.get(`${API_URL}/transactions/types/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createType(typeData) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.post(
      `${API_URL}/transactions/create_type/`,
      typeData,
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

export async function deleteType(id) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.delete(
      `${API_URL}/transactions/types/${id}/update/`,
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

export async function updateType(id, name, category, color) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.patch(
      `${API_URL}/transactions/types/${id}/update/`,
      { name, category, color },
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
