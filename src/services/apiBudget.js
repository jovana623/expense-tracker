import axios from "axios";
import API_URL from "../config";

export async function getBudgets() {
  try {
    const response = await axios.get(`${API_URL}/transactions/budget/`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getBudget(id) {
  try {
    const response = await axios.get(`${API_URL}/transactions/budget/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function createBudget(budgetData) {
  try {
    const response = await axios.post(
      `${API_URL}/transactions/budget/create/`,
      budgetData
    );
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getUsedBudget() {
  try {
    const response = await axios.get(`${API_URL}/transactions/budget/used/`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function deleteBudget(id) {
  try {
    const response = await axios.delete(`${API_URL}/transactions/budget/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function updateBudget(id, amount, period) {
  try {
    const response = await axios.patch(`${API_URL}/transactions/budget/${id}`, {
      amount,
      period,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
