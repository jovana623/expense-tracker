import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

export async function getTransactions(
  time,
  month,
  sortBy,
  search,
  page,
  pageSize
) {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/transactions/",
      {
        params: { time, month, sortBy, search, page, page_size: pageSize },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getIncomeTransactions(
  time,
  month,
  sortBy,
  page,
  pageSize
) {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/transactions/income/",
      {
        params: { time, month, sortBy, page, page_size: pageSize },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching income transactions:",
      error.response?.data || error.message
    );
    throw new Error(error.message);
  }
}

export async function getExpenseTransactions(
  time,
  month,
  sortBy,
  page,
  pageSize
) {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/transactions/expense/",
      {
        params: { time, month, sortBy, page, page_size: pageSize },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createTransaction(transactionData) {
  try {
    const response = await axiosInstance.post(
      "/transactions/create_transaction/",
      transactionData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateTransaction(id, transactionData) {
  try {
    const response = await axiosInstance.put(
      `/transactions/${id}`,
      transactionData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteTransaction(id) {
  try {
    const response = await axiosInstance.delete(`/transactions/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
