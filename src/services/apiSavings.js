import axios from "axios";

export async function getSavings() {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/savings/");
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getSaving(id) {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/savings/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function creatSaving(savingData) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/savings/",
      savingData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateSaving(id, savingData) {
  try {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/savings/${id}`,
      savingData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteSaving(id) {
  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/savings/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
