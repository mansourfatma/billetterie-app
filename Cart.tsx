import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Cart() {
  const { user } = useAuth();
  const [cart, setCart] = useState<any[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    if (user) {
      const key = `cart_${user.id}`;
      const data = JSON.parse(localStorage.getItem(key) || "[]");
      setCart(data);
    }
  }, [user]);

  const handleClearCart = () => {
    if (user) {
      const key = `cart_${user.id}`;
      localStorage.removeItem(key);
      setCart([]);
      alert("Panier vidé !");
    }
  };

  if (!user)
    return <div className="text-center text-gray-300 p-8">Connectez-vous pour voir votre panier.</div>;

  if (cart.length === 0)
    return <div className="text-center text-gray-400 p-8">🛒 Panier vide</div>;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-6 text-white">
      <h2 className="text-2xl font-bold mb-6 text-yellow-400">🛒 Votre Panier</h2>

      <div className="space-y-3">
        {cart.map((item, i) => (
          <div key={i} className="bg-white/10 border border-white/10 rounded-xl p-4">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold text-yellow-400">{item.matchName}</p>
                <p className="text-sm text-gray-400">{item.category}</p>
                <p className="text-sm text-gray-500">{item.stadium}</p>
              </div>
              <p className="font-bold">{item.price} €</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right font-bold text-lg">
        Total : <span className="text-yellow-400">{total} €</span>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={handleClearCart}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition"
        >
          Vider le panier
        </button>

        <button
          onClick={() => navigate("/paiement")}
          className="bg-yellow-400 text-[#041024] font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition"
        >
          Procéder au paiement
        </button>
        <button
          onClick={() => navigate("/historique")}
          className="bg-white/10 border border-white/20 text-yellow-400 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-[#041024] transition"
        >
          Voir mon historique
        </button>


      </div>
    </div>
  );
}
