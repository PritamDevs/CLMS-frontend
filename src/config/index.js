
// export const BACKEND_URL="https://clms-backend-1gkb.onrender.com"

// // export const BACKEND_URL="http://localhost:5505/api"

// config/index.js
// export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// // Optional: fallback for safety
// if (!BACKEND_URL) {
//   console.warn(
//     "VITE_BACKEND_URL is not defined. Defaulting to http://localhost:5505/api"
//   );
// }


// config/index.js
const env = import.meta.env.VITE_FRONTEND_ENV || "development";

export const BACKEND_URL =
  env === "production"
    ? import.meta.env.VITE_BACKEND_URL_PROD
    : import.meta.env.VITE_BACKEND_URL_LOCAL;

console.log("Using backend URL:", BACKEND_URL);
