import axios from "axios";

export async function getBudgets() {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/transactions/budget/"
    );
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getBudget(id) {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/transactions/budget/${id}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function createBudget(budgetData) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/transactions/budget/create/",
      budgetData
    );
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getUsedBudget() {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/transactions/budget/used/"
    );
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function deleteBudget(id) {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/transactions/budget/${id}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function updateBudget(id, amount, period) {
  try {
    const response = await axios.patch(
      `http://localhost:8000/api/transactions/budget/${id}`,
      { amount, period }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
