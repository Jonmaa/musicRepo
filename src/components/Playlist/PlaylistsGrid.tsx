import { useEffect, useState } from "react";
import { api } from "../../lib/spotify";
import type { SpotifyTrack, Props, Playlist } from "../../types";
import { Play } from "lucide-react";



export default function PlaylistsGrid({ onPlay }: Props) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [playlistTracks, setPlaylistTracks] = useState<SpotifyTrack[]>([]);

  // Cargar tus playlists
  useEffect(() => {
    api.get("/me/playlists", { params: { limit: 50 } })
      .then(res => {
        setPlaylists(res.data.items);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Cargar canciones de una playlist al hacer clic
  const loadPlaylistTracks = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    api.get(`/playlists/${playlist.id}/tracks`, { params: { limit: 50 } })
      .then(res => {
        const tracks = res.data.items.map((item: any) => item.track).filter((t: any) => t.preview_url);
        setPlaylistTracks(tracks);
      });
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-400">Cargando tus playlists...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Tus Playlists</h1>

      {/* Grid de playlists */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {playlists.map(pl => (
          <button
            key={pl.id}
            onClick={() => loadPlaylistTracks(pl)}
            className="group relative overflow-hidden rounded-lg hover:scale-105 transition"
          >
            <img
              src={pl.images[0]?.url || "https://via.placeholder.com/300"}
              alt={pl.name}
              className="w-full aspect-square object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <div className="w-16 h-16 bg-[#1ed760] rounded-full flex items-center justify-center">
                <Play size={32} className="text-black fill-black ml-1" />
              </div>
            </div>
            <div className="p-4 bg-[#181818] rounded-b-lg">
              <p className="font-bold truncate">{pl.name}</p>
              <p className="text-sm text-gray-400">{pl.tracks.total} canciones</p>
            </div>
          </button>
        ))}
      </div>

      {/* Canciones de la playlist seleccionada */}
      {selectedPlaylist && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">{selectedPlaylist.name}</h2>
          <div className="space-y-2">
            {playlistTracks.length === 0 ? (
              <p className="text-gray-400">No hay previews disponibles en esta playlist</p>
            ) : (
              playlistTracks.map(track => (
                <button
                  key={track.id}
                  onClick={() => onPlay(track)}
                  className="w-full p-4 flex items-center gap-4 hover:bg-white/10 rounded transition group"
                >
                  <img src={track.album.images[0]?.url} alt="cover" className="w-12 h-12 rounded" />
                  <div className="flex-1 text-left">
                    <p className="font-semibold truncate">{track.name}</p>
                    <p className="text-sm text-gray-400 truncate">
                      {track.artists.map(a => a.name).join(", ")}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition">
                    <div className="w-10 h-10 bg-[#1ed760] rounded-full flex items-center justify-center">
                      <Play size={20} className="text-black fill-black ml-1" />
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}