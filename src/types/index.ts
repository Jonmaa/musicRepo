export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string; width?: number; height?: number }[];
  };
  preview_url: string | null;
  uri?: string;
}

export interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
  tracks: { total: number };
}

export interface Props {
  onPlay: (track: SpotifyTrack) => void;
}