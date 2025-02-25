import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importar useNavigate para redirección
import api from "../api"; // Importar el módulo de API
import "../styles/Login.css"
import GradientText from "../components/TextAnimations/GradientText/GradientText.jsx";
import 'animate.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook para redirección
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { username, password });
      const token = response.data.token;
      localStorage.setItem("token", token); // Guardar el nuevo token en el localStorage
      console.log("Nuevo token guardado:", token); // Depuración
      setError("");
      navigate("/habits"); // Redirigir al usuario a la página de hábitos
    } catch (err) {
      setError("Usuario o contraseña incorrecta.");
    }
  };
  
  return (
    <div class="container  animate__animated animate__zoomIn">
      <GradientText
  colors={["#6A0DAD", "#B833FF", "#D77BFF", "#7A00A3", "#6A0DAD"]}
  animationSpeed={3}
  showBorder={false}
  className="custom-class"
>
<h2>Iniciar Sesión</h2>     
</GradientText>
     

      <form onSubmit={handleLogin}>
        <div class="form-log">
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            placeholder="username o email"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>
        ¿No tienes una cuenta? <Link class="linkR" to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
};



export default Login;