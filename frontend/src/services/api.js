import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getMessages() {
  const response = await axios.get(`${API_BASE_URL}/api/messages`);
  return response.data;
}

export async function createMessage(name, message) {
  const response = await axios.post(`${API_BASE_URL}/api/messages`, {
    name,
    message
  });

  return response.data;
}