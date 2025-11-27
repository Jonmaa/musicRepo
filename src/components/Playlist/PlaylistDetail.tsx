import { useEffect, useState } from "react";
import { Play, Clock, Heart, ArrowLeft } from "lucide-react";
import { api } from "../../lib/spotify";
import type { SpotifyTrack, SpotifyPlaylist } from "../../types";

interface Props {
  playlist: SpotifyPlaylist;
  onBack: () => void;
  onPlay: (track: SpotifyTrack, list: SpotifyTrack[]) => void;
}

export default function PlaylistDetail({ playlist, onBack, onPlay }: Props) {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/playlists/${playlist.id}/tracks`, { params: { limit: 100 } })
      .then((res) => {
        // Mostramos TODAS las canciones (incluso sin preview)
        const items = res.data.items
          .map((i: any) => i.track)
          .filter((track: any) => track && track.id); // solo válidas
        setTracks(items);
      })
      .catch(() => setTracks([]))
      .finally(() => setLoading(false));
  }, [playlist.id]);

  const cover = playlist.images[0]?.url || "https://via.placeholder.com/300";
  const totalMin = tracks.reduce((acc, t) => acc + (t.duration_ms || 0), 0) / 60000;

  return (
    <div className="min-h-screen">
      {/* Botón atrás (arreglado para no superponerse al sidebar) */}
      <button
        onClick={onBack}
        className="fixed top-4 left-64 z-50 bg-black/80 backdrop-blur-xl p-3 rounded-full text-white hover:scale-110 transition-all shadow-2xl border border-white/10"
      >
        <ArrowLeft size={28} />
      </button>

      {/* Header playlist */}
      <div className="bg-gradient-to-b from-[#1ed760]/30 to-[#121212] pt-20 pb-10">
        <div className="flex items-end gap-8 px-8">
          <img src={cover} alt={playlist.name} className="w-64 h-64 shadow-2xl rounded" />
          <div>
            <p className="text-sm font-bold uppercase">Playlist</p>
            <h1 className="text-8xl font-black my-4 leading-none">{playlist.name}</h1>
            <p className="text-gray-300 text-lg mb-4 max-w-2xl">
              {playlist.description || "Sin descripción"}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="font-bold">{playlist.owner.display_name}</span>
              <span>•</span>
              <span>{playlist.tracks.total} canciones</span>
              <span>•</span>
              <span>{Math.round(totalMin)} min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controles + lista */}
      <div className="px-8 py-6">
        <div className="flex items-center gap-8 mb-8">
          <button className="w-16 h-16 bg-[#1ed760] rounded-full flex items-center justify-center hover:scale-105 transition">
            <Play size={32} className="text-black fill-black ml-1" />
          </button>
          <button className="text-gray-400 hover:text-white">
            <Heart size={36} />
          </button>
        </div>

        {/* Cabecera */}
        <div className="grid grid-cols-12 text-sm text-gray-400 font-bold px-4 border-b border-white/10 pb-3">
          <div className="col-span-1">#</div>
          <div className="col-span-6">Título</div>
          <div className="col-span-3">Álbum</div>
          <div className="col-span-2 text-right">
            <Clock size={18} />
          </div>
        </div>

        {/* Lista de canciones */}
        <div className="mt-4">
          {loading && <p className="text-gray-400 py-10 text-center">Cargando canciones...</p>}

          {!loading &&
            tracks.map((track, index) => (
              <button
                key={track.id}
                onClick={() => track.preview_url && onPlay(track, tracks)} // <- pasamos lista completa
                className={`w-full p-3 rounded transition group grid grid-cols-12 items-center text-left ${
                  track.preview_url ? "hover:bg-white/10 cursor-pointer" : "opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="col-span-1 text-gray-400">{index + 1}</div>
                <div className="col-span-6 flex items-center gap-4">
                  <img
                    src={track.album.images[0]?.url || "https://via.placeholder.com/40"}
                    alt=""
                    className="w-10 h-10 rounded"
                  />
                  <div>
                    <p className="font-medium text-white">{track.name}</p>
                    <p className="text-sm text-gray-400">
                      {track.artists.map((a: any) => a.name).join(", ")}
                    </p>
                  </div>
                </div>
                <div className="col-span-3 text-sm text-gray-400 truncate">{track.album.name}</div>
                <div className="col-span-2 text-right text-sm text-gray-400">
                  {Math.floor((track.duration_ms || 0) / 60000)}:
                  {String(Math.floor(((track.duration_ms || 0) % 60000) / 1000)).padStart(2, "0")}
                </div>
              
                {track.preview_url && (
                  <div className="opacity-0 group-hover:opacity-100 transition">
                    <div className="w-10 h-10 bg-[#1ed760] rounded-full flex items-center justify-center">
                      <Play size={18} className="text-black fill-black ml-1" />
                    </div>
                  </div>
                )}
              </button>
            ))}

        </div>
      </div>
    </div>
  );
}