# MUSICREPO – Tu Spotify Clone Personal

**MUSICREPO** es un clon completo y funcional de Spotify creado con **React + Vite + TypeScript + Tailwind CSS** que te permite:

- Iniciar sesión con tu cuenta real de Spotify (OAuth PKCE)  
- Buscar canciones y artistas en tiempo real  
- Ver y navegar por tus playlists personales  
- Reproducir previsualizaciones de 30 segundos de canciones reales (no funciona) 
- Disfrutar de un diseño 100 % fiel al Spotify oficial (2025)  
- Reproductor siempre visible con controles completos (play/pause, progreso, volumen)  
- Navegación con sidebar: Inicio · Buscar · Tus playlists  

### Tecnologías usadas

- **React + TypeScript** – Código moderno y tipado  
- **Vite** – Build 
- **Tailwind CSS** – Diseño idéntico al Spotify oficial  
- **Spotify Web API** – Búsqueda, playlists y datos reales  
- **Lucide React** – Iconos elegantes  
- **Axios** – Peticiones HTTP  
- **LocalStorage** – Persistencia del token  

### Funcionalidades principales

- Login seguro con tu cuenta Spotify  
- Buscador en tiempo real (con debounce)  
- Tus playlists reales con portadas y canciones  
- Inicio con canciones destacadas  (varias de ellas sin carátula)
- Reproductor en la parte inferior  
- Responsive completo (móvil + desktop)  
- Diseño muy similar a Spotify (fuente, colores, hover play, etc.)

### Cómo usarlo

1. Clona el repositorio  
2. `npm install`  
3. Crea un archivo `.env` en la raíz con tu Client ID de Spotify:
   ```env
   VITE_SPOTIFY_CLIENT_ID=tu_client_id_aqui
   ```
4. npm run dev
5. Abre http://127.0.0.1:5173
6. Conecta con Spotify → ¡y disfruta de tu propio Spotify!