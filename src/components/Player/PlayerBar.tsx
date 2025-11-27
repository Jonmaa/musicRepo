import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  Shuffle,
  Repeat,
} from "lucide-react";
import type { SpotifyTrack } from "../../types";

interface PlayerBarProps {
  initialTrack?: SpotifyTrack | null;
}

export default function PlayerBar({ initialTrack }: PlayerBarProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Detecta nueva canción y reproduce automáticamente
  useEffect(() => {
    if (!initialTrack) return;

    if (!initialTrack.preview_url) {
      alert(`"${initialTrack.name}" no tiene preview disponible`);
      return;
    }

    setCurrentTrack(initialTrack);
    setIsPlaying(true);
    setProgress(0);
  }, [initialTrack]);

  // Reproduce o pausa cuando cambia currentTrack o isPlaying
  useEffect(() => {
    if (!audioRef.current || !currentTrack?.preview_url) return;

    audioRef.current.pause();
    audioRef.current.load();

    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrack, isPlaying]); 

  // Actualiza el volumen cuando cambia
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]); 



  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setProgress(value);
    if (audioRef.current && currentTrack?.preview_url) {
      audioRef.current.currentTime = (value / 100) * 30;
    }
  };

  if (!currentTrack) return null;

  const coverUrl =
    currentTrack.album.images.find((img) => img.width === 64)?.url ||
    currentTrack.album.images[0]?.url ||
    "https://via.placeholder.com/64";

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.preview_url || undefined}
        onTimeUpdate={(e) => {
          const audio = e.target as HTMLAudioElement;
          if (audio.duration) {
            setProgress((audio.currentTime / 30) * 100);
          }
        }}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Barra inferior */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-black/40 to-black border-t border-white/10 backdrop-blur-lg z-50">
        <div className="flex items-center justify-between h-full px-4">
          {/* Izquierda */}
          <div className="flex items-center gap-4 w-80">
            <img src={coverUrl} alt="cover" className="w-14 h-14 rounded shadow-lg" />
            <div className="truncate">
              <p className="font-semibold text-sm truncate max-w-48">
                {currentTrack.name}
              </p>
              <p className="text-xs text-gray-400 truncate max-w-48">
                {currentTrack.artists.map((a) => a.name).join(", ")}
              </p>
            </div>
            <button className="ml-4">
              <Heart size={18} className="text-gray-400 hover:text-white transition" />
            </button>
          </div>

          {/* Centro */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-6">
              <button className="text-gray-400 hover:text-white">
                <Shuffle size={20} />
              </button>
              <button className="text-gray-400 hover:text-white">
                <SkipBack size={24} />
              </button>
              <button
                onClick={togglePlay}
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-105 transition"
              >
                {isPlaying ? (
                  <Pause size={24} className="text-black fill-black" />
                ) : (
                  <Play size={24} className="text-black fill-black ml-1" />
                )}
              </button>
              <button className="text-gray-400 hover:text-white">
                <SkipForward size={24} />
              </button>
              <button className="text-gray-400 hover:text-white">
                <Repeat size={20} />
              </button>
            </div>

            {/* Progreso */}
            <div className="flex items-center gap-3 text-xs">
              <span>
                0:{Math.floor((progress / 100) * 30).toString().padStart(2, "0")}
              </span>
              <div className="relative w-96 h-1 bg-white/20 rounded-full overflow-hidden">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleProgress}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                />
                <div
                  className="absolute top-0 left-0 h-full bg-white transition-all"
                  style={{ width: `${progress}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"
                  style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
                />
              </div>
              <span>0:30</span>
            </div>
          </div>

          {/* Derecha - Volumen */}
          <div className="flex items-center gap-3 w-80 justify-end">
            <Volume2 size={20} className="text-gray-400" />
                        
            <div className="relative w-32 h-1 bg-white/20 rounded-full">
              {/* Input invisible */}
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
          
              {/* Barra rellena */}
              <div
                className="absolute top-0 left-0 h-full bg-white rounded-full"
                style={{ width: `${volume}%` }}
              />
          
              {/* 🔥 Círculo del slider */}
              <div
                className="absolute top-1/2 w-4 h-4 bg-white rounded-full shadow-lg"
                style={{
                  left: `${volume}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
