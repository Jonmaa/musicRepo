export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string; width?: number; height?: number }[];
  };
  preview_url: string | null;
  duration_ms?: number;
  uri?: string;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: { url: string; width?: number; height?: number }[];
  owner: { display_name: string };
  tracks: { total: number; href: string };
}