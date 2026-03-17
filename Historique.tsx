import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function Historique() {
  const { user } = useAuth();
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const key = `history_${user.id}`;
      const data = JSON.parse(localStorage.getItem(key) || "[]");
      setHistory(data);
    }
  }, [user]);

  if (!user)
    return <div className="text-center text-gray-300 p-8">Veuillez vous connecter.</div>;

  if (history.length === 0)
    return <div className="text-center text-gray-400 p-8">Aucun historique trouvé.</div>;

  return (
    <div className="container mx-auto p-6 text-white">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">🕓 Historique de vos paiements</h2>

      <div className="space-y-4">
        {history.map((entry, i) => (
          <div
            key={i}
            className="bg-white/10 border border-white/10 rounded-xl p-4 backdrop-blur-md"
          >
            <p className="text-sm text-gray-400 mb-2">
              🗓️ {new Date(entry.date).toLocaleString()}
            </p>

            {entry.items.map((ticket: any, j: number) => (
              <div key={j} className="flex justify-between items-center">
                <span>
                  {ticket.matchName} — <strong>{ticket.category}</strong>
                </span>
                <span className="font-bold">{ticket.price} €</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
