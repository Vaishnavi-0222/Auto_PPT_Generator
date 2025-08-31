import axios from "axios";

const API_BASE = "http://localhost:8000"; // backend URL

export async function generatePPT(data) {
  const formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }
  const res = await axios.post(`${API_BASE}/generate`, formData, {
    responseType: "blob",
  });
  return res.data;
}
