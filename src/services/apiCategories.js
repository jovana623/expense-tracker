import axios from "axios";
import API_URL from "../config";

export async function getCategories() {
  try {
    const response = await axios.get(`${API_URL}/transactions/categories/`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
