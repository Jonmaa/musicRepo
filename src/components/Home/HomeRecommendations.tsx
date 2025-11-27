import { Play } from "lucide-react";
import type { SpotifyTrack } from "../../types";

interface Props {
  onPlay: (track: SpotifyTrack, list: SpotifyTrack[]) => void;
}

const featuredTracks: SpotifyTrack[] = [
  {
    id: "1",
    name: "Blinding Lights",
    artists: [{ name: "The Weeknd" }],
    album: {
      name: "After Hours",
      images: [
        {
          url: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
        },
      ],
    },
    preview_url:
      "https://p.scdn.co/mp3-preview/83090a4db6899eaca689ae35f69126dbe65d94c9?cid=null",
  },
  {
    id: "2",
    name: "Shape of You",
    artists: [{ name: "Ed Sheeran" }],
    album: {
      name: "÷ (Deluxe)",
      images: [
        {
          url: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
        },
      ],
    },
    preview_url: "DEMO_PREVIEW_URL_2",
  },
  {
    id: "3",
    name: "Levitating",
    artists: [{ name: "Dua Lipa" }],
    album: {
      name: "Future Nostalgia",
      images: [
        {
          url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.wonderlandmagazine.com%2Fuploads%2F2020%2F03%2FDUA_LIPA_FUTURE_NOSTALGIA_ALBUM_ARTWORK_200117.jpg&f=1&nofb=1&ipt=4b124423d0160447b97d28c17514f9043ac3e3c7785293cda848f3296d644d14",
        },
      ],
    },
    preview_url: "DEMO_PREVIEW_URL_3",
  },
  {
    id: "4",
    name: "Watermelon Sugar",
    artists: [{ name: "Harry Styles" }],
    album: {
      name: "Fine Line",
      images: [
        {
          url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.nme.com%2Fwp-content%2Fuploads%2F2019%2F12%2FApprovedPromoImage_TimWalker_jpg.jpg&f=1&nofb=1&ipt=bf16a417b4a5c44b5c45f2637fa2eb6da3a6dc2ddd17d69106bb7d100c53d411",
        },
      ],
    },
    preview_url: "DEMO_PREVIEW_URL_4",
  },
  {
    id: "5",
    name: "Peaches",
    artists: [{ name: "Justin Bieber" }],
    album: {
      name: "Justice",
      images: [
        {
          url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fis1-ssl.mzstatic.com%2Fimage%2Fthumb%2FMusic115%2Fv4%2Fe0%2F92%2Fda%2Fe092da2d-9f6d-11dc-7843-2021e95a2b61%2F21UMGIM17518.rgb.jpg%2F1200x1200bf-60.jpg&f=1&nofb=1&ipt=3909c372e46b49b5c2736e9b0282c42f6af69b4a99d33319a095f0a7f4b58405",
        },
      ],
    },
    preview_url: "DEMO_PREVIEW_URL_5",
  },
  {
    id: "6",
    name: "FEAR",
    artists: [{ name: "NF" }],
    album: {
      name: "FEAR",
      images: [
        {
          url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthestroudcourier.com%2Fwp-content%2Fuploads%2F2025%2F11%2Foriginal-E0BAC058-27CD-4BE3-A4A7-9033C7E09549-674x600.jpeg&f=1&nofb=1&ipt=e47012bf9ff2dedadc2b27fdc0e616c0ffd3666af4d05499d1c3dc12022aeaa5",
        },
      ],
    },
    preview_url: "DEMO_PREVIEW_URL_6",
  }
];

export default function HomeRecommendations({ onPlay }: Props) {
  return (
    <div className="p-8 pt-20">
      <h1 className="text-5xl font-bold mb-12">¡Hola de nuevo!</h1>
      <p className="text-2xl text-gray-400 mb-10">
        Escucha estos temazos ahora mismo
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {featuredTracks.map((track) => (
          <button
            key={track.id}
            onClick={() => onPlay(track, featuredTracks)}
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
