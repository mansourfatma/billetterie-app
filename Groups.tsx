import { useEffect, useState } from "react";
import { getGroups } from "../api/groupService";
import { getTeams } from "../api/teamService";

export default function Groups() {
  const [groups, setGroups] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState("all");

  useEffect(() => {
    (async () => {
      try {
        const g = await getGroups();
        const t = await getTeams();
        setGroups(g.data || g);
        setTeams(t.data || t);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-400 text-lg">
        Chargement des groupes...
      </div>
    );

  // 🔹 Filtrage si un groupe est sélectionné
  const filteredGroups =
    selectedGroup === "all"
      ? groups
      : groups.filter((g) => g.name === selectedGroup);

  return (
    <div className="container">
      <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
        🏆 Groupes de la Coupe du Monde
      </h2>

      {/* 🎛️ Filtre par groupe */}
      <div className="flex justify-center mb-8">
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-gray-200 focus:ring-2 focus:ring-yellow-400"
        >
          <option value="all">Tous les groupes</option>
          {groups.map((g) => (
            <option key={g.id} value={g.name}>
              Groupe {g.name}
            </option>
          ))}
        </select>
      </div>

      {/* 🧩 Affichage des groupes */}
      {filteredGroups.length === 0 ? (
        <div className="text-center text-gray-400 bg-white/5 py-10 rounded-xl">
          Aucun groupe trouvé.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGroups.map((g) => {
            const groupTeams = teams.filter((t) => t.groupId === g.id);

            return (
              <div
                key={g.id}
                className="card relative overflow-hidden border border-white/10 hover:border-yellow-400/30 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
                  Groupe {g.name}
                </h3>

                {groupTeams.length === 0 ? (
                  <div className="text-gray-500 text-center py-6">
                    Aucune équipe.
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {groupTeams.map((t) => (
                      <li
                        key={t.id}
                        className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-2 hover:bg-white/10 transition"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={`/flags/flag_${t.code.toUpperCase()}.png`}
                            alt={t.name}
                            className="flag w-10 h-7 animate-float rounded-md"
                            onError={(e) => {
                              const img = e.currentTarget;
                              img.onerror = null;
                              img.src = `/flags/flag_${t.code.toUpperCase()}.svg`;
                            }}
                          />
                          <span className="font-semibold">{t.name}</span>
                        </div>
                        <span className="text-sm text-gray-400">
                          {t.confederation}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Effet visuel subtil */}
                <div className="absolute inset-0 rounded-2xl border border-yellow-400/10 pointer-events-none" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
