import { useEffect, useState } from "react";
import { api } from "../../lib/spotify";
import type { SpotifyPlaylist } from "../../types";

interface Props {
  onSelectPlaylist: (playlist: SpotifyPlaylist) => void;
}

export default function PlaylistsGrid({ onSelectPlaylist }: Props) {
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/me/playlists", { params: { limit: 50 } })
      .then((res) => setPlaylists(res.data.items))
      .catch(() => setPlaylists([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-400">Cargando tus playlists...</div>;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Tus Playlists</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {playlists.map((pl) => (
          <button
            key={pl.id}
            onClick={() => onSelectPlaylist(pl)}
            className="group relative overflow-hidden rounded-lg hover:scale-105 transition-all"
          >
            <img
              src={pl.images[0]?.url || "https://via.placeholder.com/300"}
              alt={pl.name}
              className="w-full aspect-square object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <div className="w-16 h-16 bg-[#1ed760] rounded-full flex items-center justify-center shadow-2xl">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="black">
                  <path d="M8 5v14l11-7L8 5z" />
                </svg>
              </div>
            </div>
            <div className="p-4 bg-[#181818] rounded-b-lg">
              <p className="font-bold truncate">{pl.name}</p>
              <p className="text-sm text-gray-400">{pl.tracks.total} canciones</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}