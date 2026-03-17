import { useForm } from "react-hook-form";
import apiClient from "../api/apiClient";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  // 🟢 Création de compte
  async function onSubmit(values: any) {
    try {
      const res = await apiClient.post("/auth/signup", values);
      alert("✅ Compte créé avec succès !");
      console.log("🟢 Réponse du backend:", res.data);
      reset();
      navigate("/"); // Retour à la page de connexion
    } catch (err: any) {
      console.error("❌ Erreur inscription:", err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Erreur lors de la création du compte.";
      alert(msg);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] bg-gradient-to-b from-[#020a1d] via-[#061437] to-[#0b1e4e] text-white px-4">
      {/* 🌍 Titre principal */}
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-yellow-400 drop-shadow-lg">
        Rejoignez la World Cup 2026 🌍
      </h1>

      {/* 🧊 Box d'inscription */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-yellow-400">
          Créer un compte
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("firstname")}
            placeholder="Prénom"
            required
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
          />

          <input
            {...register("lastname")}
            placeholder="Nom"
            required
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
          />

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

          <input
            {...register("birthDate")}
            type="date"
            required
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 text-[#041024] font-semibold py-2 rounded-lg hover:bg-yellow-300 transition"
          >
            S'inscrire
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-300">
          Déjà un compte ?{" "}
          <Link
            to="/"
            className="text-yellow-400 hover:underline font-semibold"
          >
            Se connecter ici
          </Link>
        </p>
      </div>
    </div>
  );
}
