import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/Search/SearchBar";
import PlaylistsGrid from "./components/Playlist/PlaylistsGrid";
import PlaylistDetail from "./components/Playlist/PlaylistDetail";
import HomeRecommendations, { featuredTracks } from "./components/Home/HomeRecommendations";
import PlayerBar from "./components/Player/PlayerBar";
import { getTokenFromUrl, getCurrentUser } from "./lib/spotify";
import type { SpotifyTrack, SpotifyPlaylist } from "./types";

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 🎵 Estado global del reproductor
  const [trackList] = useState<SpotifyTrack[]>(featuredTracks);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const [activeView, setActiveView] = useState<"home" | "search" | "playlists">("home");
  const [selectedPlaylist, setSelectedPlaylist] = useState<SpotifyPlaylist | null>(null);

  // 🔄 Inicialización de usuario
  useEffect(() => {
    const init = async () => {
      setLoading(true);

      if (window.location.search.includes("code=")) {
        const token = await getTokenFromUrl();
        if (token) {
          window.location.href = "/";
          return;
        }
      }

      const savedToken = localStorage.getItem("spotify_token");
      if (savedToken) {
        try {
          const response = await getCurrentUser();
          setUser(response.data);
        } catch {
          localStorage.removeItem("spotify_token");
        }
      }

      setLoading(false);
    };

    init();
  }, []);

  // 🔊 Recibe evento al clicar en una canción
  const handlePlay = (track: SpotifyTrack) => {
    const index = trackList.findIndex((t) => t.id === track.id);
    setCurrentIndex(index);
  };

  // ⏭ Siguiente canción
  const handleNext = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex + 1) % trackList.length);
  };

  // ⏮ Canción anterior
  const handlePrev = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex - 1 + trackList.length) % trackList.length);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-3xl">
        Cargando...
      </div>
    );

  if (!user) return <Login />;

  return (
    <div className="min-h-screen bg-[#121212] text-white flex">
      <Sidebar
        user={user}
        onNavigate={setActiveView}
        activeView={activeView}
        onClearPlaylist={() => setSelectedPlaylist(null)}
      />

      <div className="flex-1 ml-60 pb-32 overflow-y-auto">
        {activeView === "home" && (
          <HomeRecommendations onPlay={handlePlay} />
        )}

        {activeView === "search" && !selectedPlaylist && (
          <div className="p-8 pt-20">
            <h1 className="text-5xl font-bold mb-12">Buscar</h1>
            <SearchBar onPlay={(t) => handlePlay(t)} />
          </div>
        )}

        {activeView === "playlists" && !selectedPlaylist && (
          <PlaylistsGrid onSelectPlaylist={setSelectedPlaylist} />
        )}

        {selectedPlaylist && (
          <PlaylistDetail
            playlist={selectedPlaylist}
            onBack={() => setSelectedPlaylist(null)}
            onPlay={(t) => handlePlay(t)}
          />
        )}
      </div>

      <PlayerBar
        track={currentIndex !== null ? trackList[currentIndex] : null}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}

export default App;
