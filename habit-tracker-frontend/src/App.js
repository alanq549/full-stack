import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import HabitsView from "./components/HabitsView"; // Nuevo componente
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/habits"
          element={
            <ProtectedRoute>
              <HabitsView /> {/* Usar el nuevo componente */}
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;