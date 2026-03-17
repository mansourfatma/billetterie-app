const API_KEY = "74413ff800aba312e4f50edc615b5829"; // ⚠️ Pas de guillemets manquants
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeather(city: string) {
  try {
    const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=fr`;
    console.log("🌍 URL météo :", url); // 👈 pour vérifier l’URL finale
    const res = await fetch(url);

    if (!res.ok) {
      const text = await res.text();
      console.error("⚠️ Réponse brute de l’API :", text);
      throw new Error(`Erreur HTTP ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("❌ Erreur météo :", err);
    return null;
  }
}
