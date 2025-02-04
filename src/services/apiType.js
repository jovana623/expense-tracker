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
