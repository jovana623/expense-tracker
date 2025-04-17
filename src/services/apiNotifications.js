import axios from "axios";
import API_URL from "../config";

export async function getNotifications() {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.get(`${API_URL}/notifications/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function markNotificationAsRead(id) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw new Error("No access token found");
    const response = await axios.patch(
      `${API_URL}/notifications/${id}`,
      { is_read: true },
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
