import axios from "axios";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = "http://127.0.0.1:5173/callback";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

const SCOPES = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "playlist-read-private",
  "user-follow-read",
  "user-top-read",
].join(" ");

const generateCodeVerifier = (): string => {
  const array = new Uint8Array(96);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

const generateCodeChallenge = async (verifier: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

// Generar URL de login
export const loginUrl = async (): Promise<string> => {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  localStorage.setItem("pkce_code_verifier", codeVerifier);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  });

  return `${AUTH_ENDPOINT}?${params.toString()}`;
};

// Exchange code → token
export const getTokenFromUrl = async (): Promise<string | null> => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (!code) return null;

  const codeVerifier = localStorage.getItem("pkce_code_verifier");
  if (!codeVerifier) return null;

  try {
    const response = await axios.post(
      TOKEN_ENDPOINT,
      new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        code_verifier: codeVerifier,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const token = response.data.access_token;
    if (token) {
      localStorage.setItem("spotify_token", token);
      localStorage.removeItem("pkce_code_verifier");
      window.history.replaceState({}, document.title, "/");
    }
    return token;
  } catch (error: any) {
    console.error("Error 400 al hacer exchange:", error.response?.data || error.message);
    return null;
  }
};

// API client
export const api = axios.create({
  baseURL: "https://api.spotify.com/v1",
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("spotify_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getCurrentUser = () => api.get("/me");