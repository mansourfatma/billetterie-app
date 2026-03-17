import apiClient from "./apiClient";

export async function getGroups() {
  try {
    const res = await apiClient.get("/groups");
    if (res.data?.success && Array.isArray(res.data.data)) {
      return res.data.data;
    }
    return res.data?.data || res.data;
  } catch (err) {
    console.error("❌ Erreur récupération groupes :", err);
    return [];
  }
}
