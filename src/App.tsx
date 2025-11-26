import { useEffect, useState } from "react";
import Login from "./pages/Login";
import { getTokenFromUrl, getCurrentUser } from "./lib/spotify";

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    const init = async () => {
      setLoading(true);

      // 1. Si hay ?code= en la URL → hacemos el exchange
      if (window.location.search.includes("code=")) {
        const token = await getTokenFromUrl();
        if (token) {
          // Ya tenemos token → recargamos para limpiar la URL
          window.location.href = "http://127.0.0.1:5173/";
          return;
        }
      }

      // 2. Si ya tenemos token guardado → carga usuario
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
        <p className="text-white text-xl">Inicializando...</p>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-green-500 mb-4">¡Login OK! 🎉</h1>
        <p className="text-3xl mt-4">Bienvenido, {user.display_name}</p>
        {user.images?.[0] && (
          <img
            src={user.images[0].url}
            alt="Perfil"
            className="w-48 h-48 rounded-full mx-auto mt-8 border-4 border-green-500 shadow-lg"
          />
        )}
        <p className="text-gray-400 mt-8 text-lg">
          Token activo. ¡Ahora el sidebar + reproductor!
        </p>
      </div>
    </div>
  );
}

export default App;