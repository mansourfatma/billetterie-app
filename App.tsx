// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp"; // ✅ Import ajouté
import Matches from "./pages/Matches";
import Teams from "./pages/Teams";
import Groups from "./pages/Groups";
import Cart from "./pages/Cart";
import Historique from "./pages/Historique";
import Paiement from "./pages/Paiement";




export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-[#020a1d] via-[#061437] to-[#0b1e4e] text-gray-100 flex flex-col">
          {/* ✅ NAVBAR */}
          <nav className="flex justify-between items-center px-8 py-4 backdrop-blur-md bg-white/5 border-b border-white/10 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <span className="font-bold text-lg tracking-wide text-yellow-400">
                WorldCup 2026
              </span>
            </div>

            <div className="flex gap-6">
              <Link to="/" className="hover:text-yellow-400 transition">
                Accueil
              </Link>
              <Link to="/matches" className="hover:text-yellow-400 transition">
                Matches
              </Link>
              <Link to="/teams" className="hover:text-yellow-400 transition">
                Teams
              </Link>
              <Link to="/groups" className="hover:text-yellow-400 transition">
                Groups
              </Link>
            </div>

            <div>
              <Link
                to="/cart"
                className="bg-yellow-400 text-[#041024] px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                Panier
              </Link>
              <Link
                to="/historique"
                className="bg-white/10 border border-white/20 text-yellow-400 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 hover:text-[#041024] transition"
              >
                Historique
              </Link>

            </div>
          </nav>

          {/* ✅ ROUTES */}
          <main className="flex-1 p-6">
            <Routes>
              {/* 🏠 Connexion */}
              <Route path="/" element={<SignIn />} />

              {/* 🆕 Inscription */}
              <Route path="/signup" element={<SignUp />} /> {/* ✅ AJOUTÉ */}

              {/* ⚽ Pages principales */}
              <Route path="/matches" element={<Matches />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/historique" element={<Historique />} />
              <Route path="/paiement" element={<Paiement />} />




              {/* 🚫 Fallback 404 */}
              <Route
                path="*"
                element={
                  <h1 className="text-center text-yellow-400 text-2xl mt-20">
                    404 — Page non trouvée 😢
                  </h1>
                }
              />
            </Routes>
          </main>

          {/* ✅ FOOTER */}
          <footer className="text-center py-6 text-sm text-gray-400">
            © 2025 WorldCup 2026
          </footer>

        </div>
      </Router>
    </AuthProvider>
  );
}
