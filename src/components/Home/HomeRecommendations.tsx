import { Play } from "lucide-react";
import type { SpotifyTrack } from "../../types";

interface Props {
  onPlay: (track: SpotifyTrack) => void;
}

const featuredTracks: SpotifyTrack[] = [
  {
    id: "1",
    name: "Blinding Lights",
    artists: [{ name: "The Weeknd" }],
    album: {
      name: "After Hours",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36" }],
    },
    preview_url: "https://p.scdn.co/mp3-preview/83090a4db6899eaca689ae35f69126dbe65d94c9?cid=null",
  },
  {
    id: "2",
    name: "Shape of You",
    artists: [{ name: "Ed Sheeran" }],
    album: {
      name: "÷ (Deluxe)",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96" }],
    },
    preview_url: "https://p.scdn.co/mp3-preview/09c4e6e0e66e4b77b3d3e2b5c9e8f8e8f8e8f8e8?cid=null",
  },
  {
    id: "3",
    name: "bad guy",
    artists: [{ name: "Billie Eilish" }],
    album: {
      name: "WHEN WE ALL FALL ASLEEP...",
      images: [{ url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.albumoftheyear.org%2Falbum%2F137995-when-we-all-fall-asleep-where-do-we-go.jpg&f=1&nofb=1&ipt=c2244d07f5464ee239ff4be04a7a4f33af4be8835c062f28cac528887f9f3522" }],
    },
    preview_url: "https://p.scdn.co/mp3-preview/2fxmhks0bKna65hJk1fG3b_3b7e8f9a2b3c4d5e6f7g8h9i0j1k2l3m4n5o?cid=null",
  },
  {
    id: "4",
    name: "Levitating",
    artists: [{ name: "Dua Lipa" }],
    album: {
      name: "Future Nostalgia",
      images: [{ url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.wonderlandmagazine.com%2Fuploads%2F2020%2F03%2FDUA_LIPA_FUTURE_NOSTALGIA_ALBUM_ARTWORK_200117.jpg&f=1&nofb=1&ipt=4b124423d0160447b97d28c17514f9043ac3e3c7785293cda848f3296d644d14" }],
    },
    preview_url: "https://p.scdn.co/mp3-preview/5nNvuor5vXbktQCmoB5J4f_5e87b2e6b2f8e8f8e8f8e8f8e8f8e8f8e8f8?cid=null",
  },
  {
    id: "5",
    name: "Stay",
    artists: [{ name: "The Kid LAROI" }, { name: "Justin Bieber" }],
    album: {
      name: "Stay",
      images: [{ url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fis1-ssl.mzstatic.com%2Fimage%2Fthumb%2FMusic125%2Fv4%2Fe8%2Feb%2Fcc%2Fe8ebcc8d-6293-6e7f-7cc5-defa2bdbd4bd%2F886449399895.jpg%2F1200x1200bf-60.jpg&f=1&nofb=1&ipt=be685784f437c075473fd4b63787382f437b146179790aba6c6f89e0d868e4d4" }],
    },
    preview_url: "https://p.scdn.co/mp3-preview/6f6f5e4d3c2b1a0987654321fedcba9876543210?cid=null",
  },
  {
    id: "6",
    name: "As It Was",
    artists: [{ name: "Harry Styles" }],
    album: {
      name: "Harry's House",
      images: [{ url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.pitchfork.com%2Fphotos%2F623b686c6597466fa9d6e32d%2Fmaster%2Fw_1280%252Cc_limit%2FHarry-Styles-Harrys-House.jpeg&f=1&nofb=1&ipt=1603ec2a9918ea4da0e188bcb9e7267d8701ed65053ebedf7f0ac1dfb3c318cb" }],
    },
    preview_url: "https://p.scdn.co/mp3-preview/5f6e7d8c9b0a1f2e3d4c5b6a7f8e9d0c1b2a3f4e?cid=null",
  },
];

export default function HomeRecommendations({ onPlay }: Props) {
  return (
    <div className="p-8 pt-20">
      <h1 className="text-5xl font-bold mb-12">¡Hola de nuevo!</h1>
      <p className="text-2xl text-gray-400 mb-10">Escucha estos temazos ahora mismo</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {featuredTracks.map((track) => (
          <button
            key={track.id}
            onClick={() => onPlay(track)}
            className="group relative bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-all hover:scale-105 shadow-xl"
          >
            <img
              src={track.album.images[0].url}
              alt={track.name}
              className="w-full aspect-square object-cover"
            />
            <div className="p-4">
              <p className="font-bold text-sm truncate">{track.name}</p>
              <p className="text-sm text-gray-400 truncate">
                {track.artists.map((a) => a.name).join(", ")}
              </p>
            </div>

            <div className="absolute bottom-20 right-4 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
              <div className="w-14 h-14 bg-[#1ed760] rounded-full flex items-center justify-center shadow-2xl">
                <Play size={28} className="text-black fill-black ml-1" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}