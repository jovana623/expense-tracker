import axios from "axios";

export async function getTransactions(time) {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/transactions/",
      {
        params: { time },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getIncomeTransactions(time) {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/transactions/income/",
      { params: { time } }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getExpenseTransactions(time) {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/transactions/expense/",
      { params: { time } }
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
