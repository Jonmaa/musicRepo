import { useState, useEffect } from "react";
import { Play, Search as SearchIcon, X } from "lucide-react";
import { api } from "../../lib/spotify";
import type { SpotifyTrack } from "../../types";

interface Props {
  onPlay: (track: SpotifyTrack, list: SpotifyTrack[]) => void;
}

export default function SearchBar({ onPlay }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const timeout = setTimeout(() => {
      setLoading(true);
      api
        .get("/search", {
          params: {
            q: query,
            type: "track",
            limit: 15,
            market: "from_token",
          },
        })
        .then((res) => {
          const tracks = res.data.tracks.items;
          console.log("Resultados totales:", tracks.length);
          setResults(tracks);           // ← Sin filtro, como antes
          console.log("Track encontrado:", tracks.map((t: SpotifyTrack) => ({
            name: t.name,
            preview: t.preview_url
          })));
          setShowResults(true);
        })
        .catch((err) => {
          console.error("Error:", err.response?.data || err.message);
          setResults([]);
        })
        .finally(() => setLoading(false));
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  const clearSearch = () => {
    setQuery("");
    setShowResults(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-12">
      <div className="relative">
        <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={26} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="¿Qué quieres escuchar?"
          className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-4 pl-16 pr-12 text-lg focus:outline-none focus:border-white/50 transition placeholder-gray-400"
        />
        {query && (
          <button onClick={clearSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
            <X size={26} />
          </button>
        )}
      </div>

      {showResults && (
        <div className="absolute top-full mt-2 w-full bg-[#181818] rounded-lg shadow-2xl border border-white/10 max-h-96 overflow-y-auto z-50">
          {loading && <div className="p-8 text-center text-gray-400">Buscando...</div>}

          {!loading && results.length === 0 && (
            <div className="p-8 text-center text-gray-400">No se encontraron resultados</div>
          )}

          {!loading &&
            results.map((track) => (
              <button
                key={track.id}
                onClick={() => {
                  if (track.preview_url) {
                    onPlay(track, results);
                    setShowResults(false);
                  } else {
                    // Alternativa cuando no hay preview_url
                    alert(`"${track.name}" no tiene preview disponible`);
                  }
                }}
                className="w-full p-4 flex items-center gap-4 hover:bg-white/10 transition text-left group"
              >
                <img
                  src={track.album.images[1]?.url || track.album.images[0]?.url}
                  alt="cover"
                  className="w-12 h-12 rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{track.name}</p>
                  <p className="text-sm text-gray-400 truncate">
                    {track.artists.map((a) => a.name).join(", ")}
                  </p>
                </div>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition ${
                    track.preview_url ? "bg-[#1ed760]" : "bg-gray-600"
                  }`}
                >
                  <Play size={20} className="text-black fill-black ml-1" />
                </div>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}