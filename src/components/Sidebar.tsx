import { Home, Search, Library, Plus, Heart, Globe, ChevronDown } from "lucide-react";

export default function Sidebar({ user }: { user: any }) {
  return (
    <div className="w-60 bg-black h-screen fixed left-0 top-0 flex flex-col overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1ed760] rounded-full flex items-center justify-center">
            <span className="text-black font-black text-xl">M</span>
          </div>
          <span className="text-xl font-bold">MUSICREPO</span>
        </div>
      </div>

      {/* Navegación principal */}
      <nav className="px-3 space-y-1">
        {[
          { icon: Home, label: "Inicio", active: true },
          { icon: Search, label: "Buscar" },
          { icon: Library, label: "Tu biblioteca" },
        ].map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-4 px-3 py-3 rounded-md transition-all ${
              item.active
                ? "text-white font-bold bg-[#282828]"
                : "text-gray-400 hover:text-white hover:bg-[#282828]"
            }`}
          >
            <item.icon size={24} className={item.active ? "text-[#1ed760]" : ""} />
            <span className="text-sm font-bold">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mx-3 my-4 border-t border-white/10" />

      {/* Playlists */}
      <div className="flex-1 overflow-y-auto px-3 pb-20">
        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white transition">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-400 rounded flex items-center justify-center">
              <Plus size={24} />
            </div>
            <span className="text-sm font-bold">Crear playlist</span>
          </button>

          <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white transition">
            <div className="w-12 h-12 bg-gradient-to-br from-green-700 to-green-500 rounded flex items-center justify-center">
              <Heart size={24} className="fill-white" />
            </div>
            <span className="text-sm font-bold">Canciones que te gustan</span>
          </button>
        </div>
      </div>

      <div className="p-4 border-t border-white/10 bg-black">
        <div className="flex items-center gap-3">
          <img
            src={user.images?.[0]?.url || "https://via.placeholder.com/40"}
            alt="Tú"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate-text">{user.display_name}</p>
            <p className="text-xs text-gray-400">Premium</p>
          </div>
          <ChevronDown size={20} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
}