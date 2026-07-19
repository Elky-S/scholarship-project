import axios from "axios";

const api = axios.create({
  baseURL: "https://scholarship-project-ag8g.onrender.com/api",
  // בהתחברות לרשת:
  // https://scholarship-project-ag8g.onrender.com/api
  // בהתחברות ללוקאלי:
  // http://localhost:5000/api
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // --- הוספת מניעת Cache לכל בקשה ---
  // זה מבטיח שהדפדפן לא יחזיר תשובות ישנות (סטטוס 304)
  config.headers["Cache-Control"] = "no-cache";
  config.headers["Pragma"] = "no-cache";
  config.headers["Expires"] = "0";

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Session expired. Logging out...");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token");

      // חשוב להשתמש ב-href כדי לאפס את כל ה-State של האפליקציה
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
