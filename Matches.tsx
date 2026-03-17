import { useEffect, useState } from "react";
import { getAllMatchesAvailability } from "../api/matcheService";
import { getTeams } from "../api/teamService";
import { getGroups } from "../api/groupService";
import apiClient from "../api/apiClient";
import { useAuth } from "../context/AuthContext";
import { getWeather } from "../api/weatherService";


export default function Matches() {
  const [matches, setMatches] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [weatherData, setWeatherData] = useState<Record<number, any>>({});


  useEffect(() => {
    (async () => {
      try {
        // 🧩 Charger toutes les données en parallèle
        const [matchesRes, teamsRes, groupsRes] = await Promise.all([
          getAllMatchesAvailability(),
          getTeams(),
          getGroups(),
        ]);

        const matchesList = matchesRes.data || matchesRes;
        setMatches(matchesList);
        setTeams(teamsRes.data || teamsRes);
        setGroups(groupsRes.data || groupsRes);

        // 🌤️ Charger la météo pour chaque match
        for (const match of matchesList) {
          try {
            const data = await getWeather(match.stadium.city);
            if (data) {
              setWeatherData((prev) => ({
                ...prev,
                [match.id]: data,
              }));
            }
          } catch (err) {
            console.warn(`⚠️ Impossible de charger la météo pour ${match.stadium.city}`);
          }
        }
      } catch (e) {
        console.error("❌ Erreur chargement des données :", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);



  const handleReserve = async (match: any, categoryKey: string) => {
  if (!user) {
    alert("Veuillez vous connecter avant de réserver un billet.");
    return;
  }

  const category = match.categories[categoryKey];
  if (!category) {
    alert("Catégorie invalide !");
    return;
  }

  const payload = {
    matchId: match.id,
    userId: user.id,
    category: categoryKey,
    quantity: 1,
  };

  console.log("💬 Données envoyées au backend :", payload);

  try {
    // 🔹 Envoi au backend
    await apiClient.post("/tickets", payload);

    // 🔹 Ajout dans le panier localStorage (spécifique à l'utilisateur)
    const cartKey = `cart_${user.id}`;
    const existingCart = JSON.parse(localStorage.getItem(cartKey) || "[]");

    const newTicket = {
      matchName: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
      category: categoryKey,
      quantity: 1,
      price: category.price,
      date: match.date,
      stadium: match.stadium.name,
    };

    existingCart.push(newTicket);
    localStorage.setItem(cartKey, JSON.stringify(existingCart));

    alert(`🎟️ Billet ajouté (${categoryKey} — ${category.price} €)`);
  } catch (err: any) {
    console.error("Erreur réservation:", err);
    alert("Erreur: " + (err.response?.data?.message || err.message));
  }
};

  if (loading) return <div className="p-6 text-yellow-400">Chargement...</div>;

  const getFlagPath = (code: string): string => `/flags/flag_${code}.svg`;

  // 🎯 Filtrage combiné
  const filteredMatches = matches.filter((match) => {
    const teamFilter =
      selectedTeam === "all" ||
      match.homeTeam.id === parseInt(selectedTeam) ||
      match.awayTeam.id === parseInt(selectedTeam);

    const groupFilter =
      selectedGroup === "all" ||
      match.homeTeam.groupId === parseInt(selectedGroup) ||
      match.awayTeam.groupId === parseInt(selectedGroup);

    const dateFilter =
      selectedDate === "" ||
      new Date(match.date).toISOString().split("T")[0] === selectedDate;

    return teamFilter && groupFilter && dateFilter;
  });

  return (
    <div className="container mx-auto p-6 text-white">
      <h2 className="text-2xl font-bold mb-6 text-yellow-400">
        ⚽ Matches disponibles
      </h2>

      {/* 🧭 Filtres */}
      <div className="flex flex-wrap gap-6 mb-8 backdrop-blur-md bg-white/10 border border-white/10 rounded-xl p-4 shadow-md">
        {/* Filtre équipe */}
        <div className="flex flex-col">
          <label htmlFor="team" className="text-gray-300 font-semibold mb-1">
            Équipe :
          </label>
          <select
            id="team"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400"
          >
            <option value="all">Toutes les équipes</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filtre groupe */}
        <div className="flex flex-col">
          <label htmlFor="group" className="text-gray-300 font-semibold mb-1">
            Groupe :
          </label>
          <select
            id="group"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400"
          >
            <option value="all">Tous les groupes</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                Groupe {group.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filtre date */}
        <div className="flex flex-col">
          <label htmlFor="date" className="text-gray-300 font-semibold mb-1">
            Date :
          </label>
          <input
            id="date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>

      {/* 🏟️ Liste des matchs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMatches.length === 0 ? (
          <p className="text-center text-gray-400 w-full col-span-3">
            Aucun match ne correspond à vos filtres 😢
          </p>
        ) : (
          filteredMatches.map((match) => (
            <div
              key={match.id}
              className="bg-white/10 border border-white/10 rounded-xl p-4 shadow-lg backdrop-blur-md"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={getFlagPath(match.homeTeam.code)}
                    alt={match.homeTeam.name}
                    className="w-8 h-6 rounded shadow"
                  />
                  <span className="font-bold">{match.homeTeam.name}</span>
                </div>
                <span className="text-yellow-400 font-semibold">VS</span>
                <div className="flex items-center gap-3">
                  <span className="font-bold">{match.awayTeam.name}</span>
                  <img
                    src={getFlagPath(match.awayTeam.code)}
                    alt={match.awayTeam.name}
                    className="w-8 h-6 rounded shadow"
                  />
                </div>
              </div>

              <p className="text-gray-300 mb-1">
                📍 {match.stadium.name} — {match.stadium.city}
              </p>
              {/* 🌤️ Météo du stade */}
              {weatherData[match.id] && (
                <p className="text-sm text-blue-300 mb-3">
                  🌡️ {Math.round(weatherData[match.id].main.temp)}°C — {weatherData[match.id].weather[0].description}
                </p>
              )}

              <p className="text-gray-400 mb-3">
                🗓️ {new Date(match.date).toLocaleDateString()} —{" "}
                {new Date(match.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
           



              {/* 🎫 Catégories avec nombre de places */}
              <div className="space-y-2">
                {["CATEGORY_1", "CATEGORY_2", "CATEGORY_3"].map((key) => {
                  const cat = match.categories?.[key];
                  if (!cat) return null;
                  const label =
                    key === "CATEGORY_1"
                      ? "Catégorie 1"
                      : key === "CATEGORY_2"
                        ? "Catégorie 2"
                        : "Catégorie 3";
                  return (
                    <div
                      key={key}
                      className="flex justify-between items-center bg-white/5 border border-white/10 rounded-lg p-2"
                    >
                      <div>
                        <span className="font-semibold text-yellow-400">
                          {label}
                        </span>{" "}
                        <span className="text-sm text-gray-400">
                          ({cat.availableSeats} places restantes)
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold">{cat.price} €</span>
                        <button
                          onClick={() => handleReserve(match, key)}
                          className="bg-yellow-400 text-[#041024] text-sm font-semibold px-3 py-1 rounded hover:bg-yellow-300 transition"
                        >
                          Ajouter
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
