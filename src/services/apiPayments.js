import axios from "axios";
import API_URL from "../config";

export async function getPayments() {
  try {
    const response = await axios.get(`${API_URL}/savings/payments/`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deletePayment(id) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.delete(`${API_URL}/savings/payments/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createPayment(paymentData) {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) throw new Error("No access token found");
  try {
    const response = await axios.post(
      `${API_URL}/savings/create_payment`,
      paymentData,
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
