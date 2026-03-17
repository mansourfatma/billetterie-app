// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../api/apiClient";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  // 🔹 Connexion automatique si token + user local
  useEffect(() => {
    const token = localStorage.getItem("wc_token");
    const userData = localStorage.getItem("wc_user");

    if (token && userData) {
      // 🟢 Configure Axios pour envoyer automatiquement le token
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(JSON.parse(userData));
    } else if (token) {
      // 🔁 Si on a le token mais pas les infos utilisateur, on récupère /auth/me
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      apiClient
        .get("/auth/me")
        .then((res) => {
          const userInfo = res.data?.data;
          setUser(userInfo);
          localStorage.setItem("wc_user", JSON.stringify(userInfo));
        })
        .catch(() => {
          logout(); // en cas d’erreur (token expiré, etc.)
        });
    }
  }, []);

  // 🔹 Connexion manuelle (appelée depuis Login.tsx)
  const login = async (email: string, password: string) => {
    try {
      const res = await apiClient.post("/auth/signin", { email, password });
      const { access_token, user } = res.data;

      // 🟢 Sauvegarde le token et les infos utilisateur
      localStorage.setItem("wc_token", access_token);
      localStorage.setItem("wc_user", JSON.stringify(user));

      // 🟢 Configure Axios pour les futures requêtes
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      setUser(user);
      return true;
    } catch (err) {
      console.error("Erreur de connexion:", err);
      return false;
    }
  };

  // 🔹 Déconnexion complète
  const logout = () => {
    localStorage.removeItem("wc_token");
    localStorage.removeItem("wc_user");
    delete apiClient.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
