import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex justify-between items-center p-4 bg-fifaBlue text-white">
      <h1 className="text-xl font-bold">🏆 World Cup 2026</h1>
      {user ? (
        <div className="flex items-center gap-4">
          <span>Bienvenue, {user.firstname} 👋</span>
          <button
            onClick={() => {
              logout();
              window.location.href = "/signin"; // 🔹 force la redirection propre
            }}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Déconnexion
          </button>
        </div>
      ) : (
        <a href="/signin" className="underline">
          Connexion
        </a>
      )}
    </header>
  );
}
