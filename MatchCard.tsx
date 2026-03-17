import { useState } from "react";
import TicketModal from "./TicketModal";
import { useAuth } from "../context/AuthContext";

export default function MatchCard({ match }: any) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  function handleOpen() {
    if (!user) {
      alert("Veuillez vous connecter avant de réserver un billet.");
      return;
    }
    setOpen(true);
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        {/* 🔹 Infos du match */}
        <div>
          <h3 className="font-bold text-lg flex items-center gap-2">
            {/* 🏁 Drapeau équipe domicile */}
            <img
              src={`/flags/flag_${match.homeTeam.code.toUpperCase()}.png`}
              alt={match.homeTeam.name}
              className="w-6 h-4 object-cover rounded-sm"
              onError={(e) => {
                const img = e.currentTarget;
                img.onerror = null;
                img.src = `/flags/flag_${match.homeTeam.code.toUpperCase()}.svg`;
              }}
            />
            {match.homeTeam.name}

            <span className="text-gray-500 mx-2">vs</span>

            {/* 🏁 Drapeau équipe extérieure */}
            <img
              src={`/flags/flag_${match.awayTeam.code.toUpperCase()}.png`}
              alt={match.awayTeam.name}
              className="w-6 h-4 object-cover rounded-sm"
              onError={(e) => {
                const img = e.currentTarget;
                img.onerror = null;
                img.src = `/flags/flag_${match.awayTeam.code.toUpperCase()}.svg`;
              }}
            />
            {match.awayTeam.name}
          </h3>

          <div className="text-sm text-gray-600">
            {new Date(match.date).toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">
            {match.stadium.name} — {match.stadium.city}
          </div>
        </div>

        {/* 🔹 Bouton Réserver */}
        <div className="flex flex-col items-end gap-2">
          <div className="text-sm">Stage: {match.stage || "—"}</div>
          <button
            onClick={handleOpen}
            className="bg-fifaBlue text-white px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            Voir / Réserver
          </button>
        </div>
      </div>

      {/* 🔹 Modal de réservation */}
      {open && <TicketModal match={match} onClose={() => setOpen(false)} />}
    </div>
  );
}
