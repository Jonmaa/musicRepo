import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/Search/SearchBar";
import PlayerBar from "./components/Player/PlayerBar";
import { getTokenFromUrl, getCurrentUser } from "./lib/spotify";
import type { SpotifyTrack } from "./types";

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentPlaying, setCurrentPlaying] = useState<SpotifyTrack | null>(null);

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
        <p className="text-white text-2xl">Cargando SpotyVibe...</p>
      </div>
    );
  }

  if (!user) return <Login />;

  return (
    <div className="min-h-screen bg-[#121212] text-white flex">
      <Sidebar user={user} />
      <div className="flex-1 ml-60 pb-32">
        <div className="p-8 pt-12">
          <h1 className="text-5xl font-bold mb-10">Buscar</h1>
          <SearchBar onPlay={(track) => setCurrentPlaying(track)} />
        </div>
      </div>
      <PlayerBar initialTrack={currentPlaying} />
    </div>
  );
}

export default App;