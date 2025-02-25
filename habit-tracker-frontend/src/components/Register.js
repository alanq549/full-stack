import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api"; // Importar el módulo de API
import "../styles/Login.css"
import GradientText from "../components/TextAnimations/GradientText/GradientText.jsx";


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook para redirección

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", {
        username,
        email,
        password,
      });
      alert("Usuario registrado exitosamente");
      setError("");
      navigate("/login"); // Redirigir al usuario a la página de login
    } catch (err) {
      setError("Error al registrar el usuario");
    }
  };

  return (
    <div class="container animate__animated animate__zoomIn">
           <GradientText
        colors={["#6A0DAD", "#B833FF", "#D77BFF", "#7A00A3", "#6A0DAD"]}
        animationSpeed={3}
        showBorder={false}
        className="custom-class"
      ><h2>Registro</h2></GradientText>
      <form onSubmit={handleRegister}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Registrarse</button>
      </form>
      <p>
        ¿Ya tienes una cuenta? <Link class="linkR" to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
};

export default Register;