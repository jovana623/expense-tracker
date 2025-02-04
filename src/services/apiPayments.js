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
    const response = await axios.delete(`${API_URL}/savings/payments/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createPayment(paymentData) {
  try {
    const response = await axios.post(
      `${API_URL}/savings/create_payment`,
      paymentData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
