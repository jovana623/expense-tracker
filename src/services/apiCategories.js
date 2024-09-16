import axios from "axios";

const getToken = () => localStorage.getItem("token");
export async function getCategories() {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/transactions/categories/",
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
