import React, { useEffect, useState } from "react";
import api from "../api";
import EditHabit from "./EditHabit";
import AnimatedList from "./AnimatedList/AnimatedList.jsx"; // IMPORTAR AnimatedList

const HabitList = ({ refresh, onHabitUpdated }) => {
  const [habits, setHabits] = useState([]);
  const [error, setError] = useState("");
  const [editingHabit, setEditingHabit] = useState(null); 

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await api.get("/habits");
        setHabits(response.data);
      } catch (err) {
        setError("Error al obtener los hábitos.");
      }
    };

    fetchHabits();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este hábito?")) return;
    try {
      await api.delete(`/habits/${id}`);
      onHabitUpdated();
    } catch (err) {
      setError("Error al eliminar el hábito.");
    }
  };

  return (
    <div class="container2">
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* USAMOS AnimatedList en lugar de <ul> */}
      <AnimatedList
        items={habits.map((habit) => (
          <div key={habit.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span>
              <strong>{habit.name}</strong>: {habit.description} ({habit.completed ? "Completado" : "Pendiente"})
            </span>
            <div>
              <button className="form-B" onClick={() => handleDelete(habit.id)}>❌</button>
              <button className="form-B" onClick={() => setEditingHabit(habit)}>✏️</button>
            </div>
          </div>
        ))}
        onItemSelect={(item, index) => console.log("Hábito seleccionado:", item, index)}
        showGradients={true}
        enableArrowNavigation={true}
        displayScrollbar={true}
      />

      {editingHabit && (
        <EditHabit 
          habit={editingHabit} 
          onHabitUpdated={() => { 
            onHabitUpdated(); 
            setEditingHabit(null); 
          }} 
          onClose={() => setEditingHabit(null)}
        />
      )}
    </div>
  );
};

export default HabitList;
