import axios from "axios";

// Configuración de axios
const api = axios.create({
  baseURL: "http://localhost:8080/api", // URL base del backend
  headers: {
    "Content-Type": "application/json", // Tipo de contenido por defecto
  },
});

// Interceptor para agregar el token JWT a las solicitudes protegidas
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;