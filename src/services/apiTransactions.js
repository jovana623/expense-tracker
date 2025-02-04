import axios from "axios";
import API_URL from "../config";

export async function getTransactions(
  time,
  month,
  sortBy,
  search,
  page,
  pageSize
) {
  try {
    const response = await axios.get(`${API_URL}/transactions/`, {
      params: { time, month, sortBy, search, page, page_size: pageSize },
    });
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
    const response = await axios.get(`${API_URL}/transactions/income/`, {
      params: { time, month, sortBy, page, page_size: pageSize },
    });
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
    const response = await axios.get(`${API_URL}/transactions/expense/`, {
      params: { time, month, sortBy, page, page_size: pageSize },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createTransaction(transactionData) {
  try {
    const response = await axios.post(
      `${API_URL}/transactions/create_transaction/`,
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
    const response = await axios.patch(`${API_URL}/transactions/${id}`, {
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
    const response = await axios.delete(`${API_URL}/transactions/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getIncomeSummary() {
  try {
    const response = await axios.get(`${API_URL}/transactions/income/monthly/`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getExpenseSummary() {
  try {
    const response = await axios.get(
      `${API_URL}/transactions/expense/monthly/`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getTypeByMonth(type) {
  try {
    const response = await axios.get(
      `${API_URL}/transactions/spending/month/`,
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
    const response = await axios.get(`${API_URL}/transactions/statistics/`, {
      params: { time, month },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getDailyBalance(month) {
  try {
    const response = await axios.get(
      `${API_URL}/transactions/daily-balances/`,
      { params: { month } }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getMonthlyBalance(time, month) {
  try {
    const response = await axios.get(
      `${API_URL}/transactions/monthly-balances`,
      { params: { time, month } }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
