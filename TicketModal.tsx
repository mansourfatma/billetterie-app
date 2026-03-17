import { useState } from "react";
import apiClient from "../api/apiClient";
import { useAuth } from "../context/AuthContext";

export default function TicketModal({ match, onClose }: any) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleReserve() {
    if (!user) {
      alert("Veuillez vous connecter avant de réserver un billet.");
      return;
    }

    try {
      setLoading(true);

      // 🟡 Debug : voir les valeurs envoyées
      console.log("💬 Données envoyées au backend :", {
        userId: user.id,
        matchId: match.id,
        category: "CATEGORY_1", // Par défaut
        quantity: 1,
      });

      // ✅ Prépare les données correctement
      const payload = {
        userId: Number(user.id),
        matchId: Number(match.id),
        category: "CATEGORY_1", // ou "VIP", "CATEGORY_2", etc.
        quantity: 1,
      };

      const res = await apiClient.post("/tickets", payload);

      console.log("🧾 Réponse complète du backend :", res.data);

      if (res.data?.success) {
        alert("✅ Billet réservé avec succès !");
      } else {
        alert(`⚠️ Erreur : ${res.data?.message || "Réservation échouée"}`);
      }
    } catch (err: any) {
      console.error("❌ Erreur réservation:", err);
      alert("Erreur lors de la réservation.");
    } finally {
      setLoading(false);
      onClose();
    }
  }

  return (
    <div className="modal-backdrop fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="modal bg-[#0a1a3a] rounded-2xl p-8 w-full max-w-md border border-white/10">
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">
          Réserver un billet
        </h2>
        <p className="text-gray-300 mb-2">
          {match.homeTeam.name} vs {match.awayTeam.name}
        </p>
        <p className="text-gray-400 mb-6">{match.stadium.name}</p>

        <button
          onClick={handleReserve}
          disabled={loading}
          className="w-full bg-yellow-400 text-[#041024] font-semibold py-2 rounded-lg hover:bg-yellow-300 transition"
        >
          {loading ? "Réservation..." : "Confirmer la réservation"}
        </button>

        <button
          onClick={onClose}
          className="w-full mt-3 bg-white/10 text-gray-300 border border-white/20 py-2 rounded-lg hover:bg-white/20 transition"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
