import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import { getTokenFromUrl, api, getCurrentUser } from "./lib/spotify";

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar user={user} />
      <div className="flex-1 ml-64 p-8">
        <h1 className="text-5xl font-bold mb-4">¡Bienvenido de vuelta!</h1>
        <p className="text-2xl text-gray-300">
          ¿Qué quieres escuchar hoy, {user.display_name?.split(" ")[0]}? 
        </p>
      </div>
    </div>
  );
}

export default App;