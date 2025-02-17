import axios from "axios";
import API_URL from "../config";

export async function getBudgets() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.get(`${API_URL}/transactions/budget/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getBudget(id) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.get(`${API_URL}/transactions/budget/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function createBudget(budgetData) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.post(
      `${API_URL}/transactions/budget/create/`,
      budgetData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getUsedBudget() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.get(`${API_URL}/transactions/budget/used/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function deleteBudget(id) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.delete(
      `${API_URL}/transactions/budget/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function updateBudget(id, amount, period) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.patch(
      `${API_URL}/transactions/budget/${id}`,
      {
        amount,
        period,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
