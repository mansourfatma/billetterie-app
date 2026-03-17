// src/api/apiClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://worldcup2026.shrp.dev", // ✅ lien de l’API distante
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ permet d’envoyer le cookie JWT automatiquement
});

// 🧩 Intercepteur (utile si tu veux ajouter un token stocké plus tard)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("wc_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
