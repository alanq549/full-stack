import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import api from "../api";

const COLORS = ["#00C49F", "#FF8042"]; // Colores para completado y pendiente

const HabitStats = () => {
  const [habitStats, setHabitStats] = useState({ completed: 0, pending: 0 });
  const [habitTrends, setHabitTrends] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/habits");
        const habits = response.data;

        // Contar hábitos completados y pendientes
        const completed = habits.filter(h => h.completed).length;
        const pending = habits.length - completed;
        setHabitStats({ completed, pending });

        // Agrupar hábitos por semana
        const trends = habits.reduce((acc, habit) => {
          const week = new Date(habit.startDate).toLocaleDateString("es-MX", { week: "numeric" });
          acc[week] = (acc[week] || 0) + 1;
          return acc;
        }, {});

        setHabitTrends(Object.entries(trends).map(([week, count]) => ({ week, count })));
      } catch (error) {
        console.error("Error al obtener estadísticas:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h2 id="title-e" >📊<span class="subtitles">Estadísticas de Hábitos</span></h2>
      
      {/* Gráfico de pastel: Hábitos completados vs. pendientes */}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie dataKey="value" data={[{ name: "Completados", value: habitStats.completed }, { name: "Pendientes", value: habitStats.pending }]} cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
            {["Completados", "Pendientes"].map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Gráfico de barras: Hábitos creados por semana */}
      <ResponsiveContainer width="100%" height={150}>
        <BarChart data={habitTrends}>
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HabitStats;
