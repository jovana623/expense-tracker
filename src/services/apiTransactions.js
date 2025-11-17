import axios from "axios";
import API_URL from "../config";

export async function getTransactions(
  time,
  month,
  sortBy,
  search,
  page,
  pageSize,
  type
) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.get(`${API_URL}/transactions/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: { time, month, sortBy, search, page, page_size: pageSize, type },
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
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.get(`${API_URL}/transactions/income/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.get(`${API_URL}/transactions/expense/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: { time, month, sortBy, page, page_size: pageSize },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createTransaction(transactionData) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.post(
      `${API_URL}/transactions/create_transaction/`,
      transactionData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
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
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.patch(
      `${API_URL}/transactions/${id}`,
      { name, date, type, amount, description },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteTransaction(id) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.delete(`${API_URL}/transactions/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getDashboardSummary(time, month) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.get(
      `${API_URL}/transactions/dashboard/summary/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: { time, month },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getDashboardHistory() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.get(
      `${API_URL}/transactions/dashboard/history/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getTypeByMonth(type) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.get(
      `${API_URL}/transactions/spending/month/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.get(`${API_URL}/transactions/statistics/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: { time, month },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getDailyBalance(month) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.get(
      `${API_URL}/transactions/balances/daily/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: { month },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getMonthlyBalance(time, month) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.get(
      `${API_URL}/transactions/balances/monthly/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: { time, month },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
