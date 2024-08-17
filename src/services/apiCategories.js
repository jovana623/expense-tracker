import axios from "axios";

export async function getCategories() {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/transactions/categories/"
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
