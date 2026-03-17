import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Matches from "../pages/Matches";
import Teams from "../pages/Teams";
import Groups from "../pages/Groups";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🏠 Connexion par défaut */}
        <Route path="/" element={<SignIn />} />

        {/* 🆕 Page d'inscription */}
        <Route path="/signup" element={<SignUp />} />

        {/* ⚽ Autres pages */}
        <Route path="/matches" element={<Matches />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/groups" element={<Groups />} />

        {/* 🧩 Si aucune route ne correspond */}
        <Route path="*" element={<h1 style={{ textAlign: "center", color: "white" }}>404 — Page non trouvée 😢</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
