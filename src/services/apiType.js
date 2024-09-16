import axios from "axios";

const getToken = () => localStorage.getItem("token");

export async function getTypes() {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/transactions/types",
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getType(id) {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/transactions/types/${id}`,
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
