import apiClient from "./apiClient";

export async function getTeams() {
  try {
    const res = await apiClient.get("/teams");
    if (res.data?.success && Array.isArray(res.data.data)) {
      return res.data.data;
    }
    return res.data?.data || res.data;
  } catch (err) {
    console.error("❌ Erreur récupération équipes :", err);
    return [];
  }
}
