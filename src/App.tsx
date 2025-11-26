// src/App.tsx
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/Search/SearchBar";
import PlaylistsGrid from "./components/Playlist/PlaylistsGrid";
import PlayerBar from "./components/Player/PlayerBar";
import { getTokenFromUrl, getCurrentUser } from "./lib/spotify";
import type { SpotifyTrack } from "./types";
import { Search as SearchIcon, ListMusic } from "lucide-react";

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentPlaying, setCurrentPlaying] = useState<SpotifyTrack | null>(null);
  const [activeView, setActiveView] = useState<"home" | "search" | "playlists">("home");

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      if (window.location.search.includes("code=")) {
        const token = await getTokenFromUrl();
        if (token) {
          window.location.href = "http://127.0.0.1:5173/";
          return;
        }
      }

      const savedToken = localStorage.getItem("spotify_token");
      if (savedToken) {
        try {
          const response = await getCurrentUser();
          setUser(response.data);
        } catch (err) {
          console.error("Token inválido", err);
          localStorage.removeItem("spotify_token");
        }
      }

      setLoading(false);
    };

    init();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-3xl font-bold">Cargando SpotyVibe...</p>
      </div>
    );
  }

  if (!user) return <Login />;

  return (
    <div className="min-h-screen bg-[#121212] text-white flex">
      {/* Sidebar */}
      <Sidebar
        user={user}
        onNavigate={setActiveView}
        activeView={activeView}
      />

      {/* Contenido principal */}
      <div className="flex-1 ml-60 pb-32 overflow-y-auto">
        {/* Vista Inicio */}
        {activeView === "home" && (
          <div className="p-12 pt-24 text-center">
            <h1 className="text-6xl font-bold mb-6">
              ¡Hola de nuevo, {user.display_name?.split(" ")[0] || "amigo"}!
            </h1>
            <p className="text-2xl text-gray-400">
              ¿Qué quieres escuchar hoy?
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <button
                onClick={() => setActiveView("search")}
                className="bg-white/10 hover:bg-white/20 p-10 rounded-xl transition backdrop-blur"
              >
                <SearchIcon size={48} className="mx-auto mb-4 text-[#1ed760]" />
                <p className="text-xl font-bold">Buscar</p>
              </button>
              <button
                onClick={() => setActiveView("playlists")}
                className="bg-white/10 hover:bg-white/20 p-10 rounded-xl transition backdrop-blur"
              >
                <ListMusic size={48} className="mx-auto mb-4 text-[#1ed760]" />
                <p className="text-xl font-bold">Tus Playlists</p>
              </button>
            </div>
          </div>
        )}

        {/* Vista Buscar */}
        {activeView === "search" && (
          <div className="p-8 pt-20">
            <h1 className="text-5xl font-bold mb-12">Buscar</h1>
            <SearchBar onPlay={(track) => setCurrentPlaying(track)} />
          </div>
        )}

        {/* Vista Playlists */}
        {activeView === "playlists" && (
          <div className="p-8 pt-20">
            <PlaylistsGrid onPlay={(track) => setCurrentPlaying(track)} />
          </div>
        )}
      </div>

      {/* Reproductor siempre visible */}
      <PlayerBar initialTrack={currentPlaying} />
    </div>
  );
}

export default App;