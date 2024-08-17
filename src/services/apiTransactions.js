import axios from "axios";

export async function getTransactions() {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/transactions/");
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getIncomeTransactions() {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/transactions/income/"
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getExpenseTransactions() {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/transactions/expense/"
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createTransaction(transactionData) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/transactions/create_transaction/",
      transactionData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateTransaction(id, transactionData) {
  try {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/transactions/${id}`,
      transactionData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteTransaction(id) {
  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/transactions/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
