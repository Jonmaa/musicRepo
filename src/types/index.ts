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