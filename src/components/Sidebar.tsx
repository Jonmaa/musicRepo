import { Home, Search, ListMusic } from "lucide-react";

interface Props {
  user: any;
  onNavigate: (view: "home" | "search" | "playlists") => void;
  activeView: "home" | "search" | "playlists";
  onClearPlaylist?: () => void; // ← NUEVA PROP
}

export default function Sidebar({ user, onNavigate, activeView, onClearPlaylist }: Props) {
  const menuItems = [
    { id: "home", label: "Inicio", icon: Home },
    { id: "search", label: "Buscar", icon: Search },
    { id: "playlists", label: "Tus playlists", icon: ListMusic },
  ];

  const handleNavigate = (view: "home" | "search" | "playlists") => {
    onClearPlaylist?.();    // ← LIMPIA LA PLAYLIST AL NAVEGAR
    onNavigate(view);
  };

  return (
    <div className="w-60 bg-black h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1ed760] rounded-full flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="black">
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
          </div>
          <span className="text-xl font-bold">SpotyVibe</span>
        </div>
      </div>

      <nav className="px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigate(item.id as any)}
            className={`w-full flex items-center gap-4 px-3 py-3 rounded-md transition-all font-bold text-sm ${
              activeView === item.id
                ? "text-white bg-[#282828]"
                : "text-gray-400 hover:text-white hover:bg-[#282828]"
            }`}
          >
            <item.icon size={24} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <img
            src={user.images?.[0]?.url || "https://via.placeholder.com/40"}
            alt="Tú"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate">{user.display_name}</p>
            <p className="text-xs text-gray-400">Premium</p>
          </div>
        </div>
      </div>
    </div>
  );
}