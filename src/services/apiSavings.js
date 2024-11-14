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

export async function createSaving(savingData) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/savings/create_saving",
      savingData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateSaving(id, savingData) {
  console.log("Updating ID:", id);
  console.log("Saving Data:", savingData);

  try {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/savings/${id}`,
      savingData
    );
    return response.data;
  } catch (error) {
    console.error("Update Saving Error: ", error);
    throw new Error(error.response?.data || error.message);
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

export async function updateSavingStatus(id, status) {
  try {
    const response = await axios.patch(
      `http://127.0.0.1:8000/api/savings/${id}`,
      { status }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
