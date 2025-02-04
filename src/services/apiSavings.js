import axios from "axios";
import API_URL from "../config";

export async function getSavings() {
  try {
    const response = await axios.get(`${API_URL}/savings/`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getSaving(id) {
  try {
    const response = await axios.get(`${API_URL}/savings/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createSaving(savingData) {
  try {
    const response = await axios.post(
      `${API_URL}/savings/create_saving`,
      savingData
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
    const response = await axios.patch(`${API_URL}/savings/${id}`, {
      name,
      goal,
      target_date,
      description,
      color,
    });
    return response.data;
  } catch (error) {
    console.error("Update Saving Error: ", error);
    throw new Error(error.response?.data || error.message);
  }
}

export async function deleteSaving(id) {
  try {
    const response = await axios.delete(`${API_URL}/savings/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateSavingStatus(id, status) {
  try {
    const response = await axios.patch(`${API_URL}/savings/${id}`, { status });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
