import axios from "axios";

export async function getPayments() {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/savings/payments/"
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deletePayment(id) {
  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/savings/payments/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createPayment(id, paymentData) {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/savings/create_payment/${id}`,
      paymentData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
