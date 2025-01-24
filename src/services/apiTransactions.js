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

export async function updateTransaction(
  id,
  name,
  date,
  type,
  amount,
  description
) {
  try {
    const response = await axiosInstance.patch(`/transactions/${id}`, {
      name,
      date,
      type,
      amount,
      description,
    });
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

export async function getIncomeSummary() {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/transactions/income/monthly/"
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getExpenseSummary() {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/transactions/expense/monthly/"
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getTypeByMonth(type) {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/transactions/spending/month/",
      {
        params: { type },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getTransactionStatistic(time, month) {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/transactions/statistics/",
      { params: { time, month } }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
