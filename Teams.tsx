import { useEffect, useState } from "react";
import { getTeams } from "../api/teamService";

export default function Teams() {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConfederation, setSelectedConfederation] = useState("all");

  useEffect(() => {
    (async () => {
      try {
        const r = await getTeams();
        setTeams(r.data || r);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 🔹 Liste des confédérations (dynamique)
  const confederations = Array.from(
    new Set(teams.map((t) => t.confederation))
  );

  // 🔹 Filtrage
  const filteredTeams =
    selectedConfederation === "all"
      ? teams
      : teams.filter((t) => t.confederation === selectedConfederation);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-400 text-lg">
        Chargement des équipes...
      </div>
    );

  return (
    <div className="container">
      <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
        🌍 Équipes participantes
      </h2>

      {/* 🔹 Filtres */}
      <div className="flex justify-center mb-8">
        <select
          value={selectedConfederation}
          onChange={(e) => setSelectedConfederation(e.target.value)}
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-gray-200 focus:ring-2 focus:ring-yellow-400"
        >
          <option value="all">🌐 Toutes les confédérations</option>
          {confederations.map((conf) => (
            <option key={conf} value={conf}>
              {conf}
            </option>
          ))}
        </select>
      </div>

      {/* 🏳️ Grille d’équipes */}
      {filteredTeams.length === 0 ? (
        <div className="text-center text-gray-400 bg-white/5 py-10 rounded-xl">
          Aucune équipe trouvée.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredTeams.map((t) => (
            <div
              key={t.id}
              className="card text-center relative overflow-hidden"
            >
              {/* Drapeau animé */}
              <img
                src={`/flags/flag_${t.code.toUpperCase()}.png`}
                alt={t.name}
                className="flag w-16 h-12 mx-auto mb-3 animate-float rounded-md"
                onError={(e) => {
                  const img = e.currentTarget;
                  img.onerror = null;
                  img.src = `/flags/flag_${t.code.toUpperCase()}.svg`;
                }}
              />

              {/* Nom de l’équipe */}
              <h3 className="text-lg font-semibold text-yellow-400 mb-1">
                {t.name}
              </h3>

              {/* Confédération */}
              <p className="text-sm text-gray-400">{t.confederation}</p>

              {/* Effet décoratif doré */}
              <div className="absolute inset-0 rounded-2xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
