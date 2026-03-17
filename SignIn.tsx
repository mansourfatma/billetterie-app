import { useForm } from "react-hook-form";
import apiClient from "../api/apiClient";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { user, setUser, logout } = useAuth();

  // 🔹 Connexion utilisateur
  async function onSubmit(values: any) {
    try {
      const res = await apiClient.post("/auth/signin", {
        email: values.email,
        password: values.password,
      });

      const token = res.data?.data?.access_token;
      const userData = res.data?.data?.user;

      if (token) {
        localStorage.setItem("wc_token", token);
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      if (userData) {
        localStorage.setItem("wc_user", JSON.stringify(userData));
        setUser(userData);
      }

      alert(`✅ Connexion réussie ! Bienvenue ${userData.firstname} 🎉`);
      reset();
      navigate("/matches");
    } catch (err: any) {
      console.error("❌ Erreur connexion:", err);
      alert("Erreur de connexion. Vérifie ton email ou ton mot de passe.");
    }
  }

  // 🔹 Si l'utilisateur est déjà connecté
  if (user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-b from-[#020a1d] via-[#061437] to-[#0b1e4e] text-white px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-yellow-400 drop-shadow-lg">
          Bienvenue, {user.firstname} 👋
        </h1>

        <p className="text-gray-300 mb-6 text-center">
          Heureux de te revoir sur la plateforme World Cup 2026 !
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/matches")}
            className="bg-yellow-400 text-[#041024] font-semibold py-2 px-6 rounded-lg hover:bg-yellow-300 transition"
          >
            Voir les matchs
          </button>

          <button
            onClick={logout}
            className="bg-white/10 border border-white/20 font-semibold py-2 px-6 rounded-lg hover:bg-red-500 hover:text-white transition"
          >
            Déconnexion
          </button>
        </div>
      </div>
    );
  }

  // 🔹 Formulaire de connexion
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] bg-gradient-to-b from-[#020a1d] via-[#061437] to-[#0b1e4e] text-white px-4">
      {/* 🌍 Titre principal */}
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-yellow-400 drop-shadow-lg">
        Bienvenue à la World Cup 2026 🏆
      </h1>

      {/* 🧊 Box de connexion */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-yellow-400">
          Connexion
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("email")}
            placeholder="Email"
            type="email"
            required
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
          />

          <input
            {...register("password")}
            placeholder="Mot de passe"
            type="password"
            required
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 text-[#041024] font-semibold py-2 rounded-lg hover:bg-yellow-300 transition"
          >
            Se connecter
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-300">
          Pas encore de compte ?{" "}
          <Link
            to="/signup"
            className="text-yellow-400 hover:underline font-semibold"
          >
            Créez-en un ici
          </Link>
        </p>
      </div>
    </div>
  );
}
