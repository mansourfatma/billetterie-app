// src/pages/Paiement.tsx
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Paiement() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvc, setCvc] = useState("");

  if (!user)
    return (
      <div className="text-center text-gray-300 p-8">
        Veuillez vous connecter avant d’effectuer un paiement.
      </div>
    );

  const handlePayment = (e: any) => {
    e.preventDefault();

    if (!cardNumber || !name || !expDate || !cvc) {
      alert("Merci de remplir toutes les informations de paiement.");
      return;
    }

    // 🧾 Récupération du panier
    const cartKey = `cart_${user.id}`;
    const historyKey = `history_${user.id}`;
    const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");
    const history = JSON.parse(localStorage.getItem(historyKey) || "[]");

    // 🧠 Sauvegarde dans l’historique
    history.push({
      date: new Date().toISOString(),
      items: cart,
    });

    localStorage.setItem(historyKey, JSON.stringify(history));

    // 🗑️ Vide le panier
    localStorage.removeItem(cartKey);

    alert("🎉 Paiement réussi ! Félicitations 🎊");
    navigate("/historique");
  };

  return (
    <div className="container mx-auto p-6 text-white max-w-lg">
      <h2 className="text-2xl font-bold mb-6 text-yellow-400 text-center">
        💳 Paiement sécurisé
      </h2>

      <form
        onSubmit={handlePayment}
        className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 space-y-4 shadow-lg"
      >
        <div>
          <label className="block mb-2 text-sm">Numéro de carte</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm">Nom complet</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Duna Alawi"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-2 text-sm">Date d’expiration</label>
            <input
              type="text"
              value={expDate}
              onChange={(e) => setExpDate(e.target.value)}
              placeholder="MM/AA"
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          <div className="flex-1">
            <label className="block mb-2 text-sm">CVC</label>
            <input
              type="text"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              placeholder="123"
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 text-[#041024] font-semibold py-3 rounded-lg hover:bg-yellow-300 transition"
        >
          Procéder au paiement
        </button>
      </form>
    </div>
  );
}
