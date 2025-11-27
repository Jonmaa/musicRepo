import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2 } from "lucide-react";
import type { SpotifyTrack } from "../../types";

interface Props {
  trackList: SpotifyTrack[];
  currentIndex: number;
  onTrackChange: (track: SpotifyTrack, index: number) => void;
}

export default function PlayerBar({ trackList, currentIndex, onTrackChange }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const track = trackList[currentIndex];
  const accentColor = "#1ed760"; // Verde del sidebar

  // Cargar la canción actual
  useEffect(() => {
    if (track && audioRef.current) {
      audioRef.current.src = track.preview_url || "";
      audioRef.current.volume = volume / 100;
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
      setCurrentTime(0);
    }
  }, [track]);

  // Actualizar volumen
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  // Actualizar tiempo actual cada 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && isPlaying) setCurrentTime(audioRef.current.currentTime);
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const skipForward = () => {
    if (!trackList.length) return;
    const nextIndex = (currentIndex + 1) % trackList.length;
    onTrackChange(trackList[nextIndex], nextIndex);
  };

  const skipBackward = () => {
    if (!trackList.length) return;
    const prevIndex = (currentIndex - 1 + trackList.length) % trackList.length;
    onTrackChange(trackList[prevIndex], prevIndex);
  };

  const handleEnded = () => {
    if (repeat) audioRef.current?.play();
    else skipForward();
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-white/10 flex items-center justify-between px-6 py-3">
      <audio ref={audioRef} onEnded={handleEnded} />

      {/* Izquierda: info track */}
      <div className="flex items-center gap-4 w-1/3">
        {track?.album.images[0]?.url && (
          <img
            src={track.album.images[0].url}
            alt={track.name}
            className="w-12 h-12 rounded"
          />
        )}
        <div className="truncate">
          <p className="font-semibold truncate">{track?.name || "No track selected"}</p>
          <p className="text-gray-400 text-sm truncate">
            {track?.artists.map((a) => a.name).join(", ")}
          </p>
        </div>
      </div>

      {/* Centro: controles + barra de progreso */}
      <div className="flex flex-col items-center w-1/3">
        <div className="flex items-center gap-6 mb-1">
          <button onClick={() => setShuffle(!shuffle)} className={shuffle ? `text-[${accentColor}]` : "text-gray-400"}>
            <Shuffle />
          </button>
          <button onClick={skipBackward} className="text-gray-400 hover:text-white">
            <SkipBack />
          </button>

          <button
            onClick={togglePlay}
            className={`w-14 h-14 bg-[${accentColor}] rounded-full flex items-center justify-center hover:scale-105 transition`}
          >
            {isPlaying ? <Pause size={28} /> : <Play size={28} />}
          </button>

          <button onClick={skipForward} className="text-gray-400 hover:text-white">
            <SkipForward />
          </button>
          <button onClick={() => setRepeat(!repeat)} className={repeat ? `text-[${accentColor}]` : "text-gray-400"}>
            <Repeat />
          </button>
        </div>

        {/* Barra de progreso con tiempos */}
        <div className="flex items-center gap-2 w-full text-gray-400 text-xs">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={audioRef.current?.duration || 0}
            value={currentTime}
            onChange={(e) => {
              if (audioRef.current) {
                audioRef.current.currentTime = Number(e.target.value);
                setCurrentTime(Number(e.target.value));
              }
            }}
            className={`w-full h-1 bg-white/30 rounded-lg accent-[${accentColor}]`}
          />
          <span>{formatTime(audioRef.current?.duration || 30)}</span>
        </div>
      </div>

      {/* Derecha: volumen */}
      <div className="flex items-center gap-3 w-1/3 justify-end">
        <Volume2 />
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className={`w-24 h-1 bg-white/30 rounded-lg accent-[${accentColor}]`}
        />
      </div>
    </div>
  );
}
