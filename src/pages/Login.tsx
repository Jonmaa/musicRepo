import { Music } from "lucide-react";
import { loginUrl } from "../lib/spotify";

export default function Login() {
  const handleLogin = async () => {
    const url = await loginUrl();
    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-black flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-8">
          <div className="p-8 bg-green-500 rounded-full">
            <Music size={80} className="text-black" />
          </div>
        </div>
        <h1 className="text-6xl font-bold text-white mb-4">MUSICREPO</h1>
        <p className="text-xl text-gray-300 mb-10">
          Tu música, tu vibe.
        </p>
        <button
          onClick={handleLogin}
          className="inline-block px-12 py-6 bg-green-500 text-black text-xl font-bold rounded-full hover:bg-green-400 transition transform hover:scale-105 shadow-lg"
        >
          CONECTAR CON SPOTIFY
        </button>
      </div>
    </div>
  );
}