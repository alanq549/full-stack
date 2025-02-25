import React, { useState } from "react";
import api from "../api";
import "../styles/HabitsView.css";

const EditHabit = ({ habit, onHabitUpdated, onClose }) => {
  const [name, setName] = useState(habit.name);
  const [description, setDescription] = useState(habit.description);
  const [startDate, setStartDate] = useState(habit.startDate);
  const [endDate, setEndDate] = useState(habit.endDate);
  const [completed, setCompleted] = useState(habit.completed); // Incluir estado de completado

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/habits/${habit.id}`, { 
        name, 
        description, 
        startDate, 
        endDate, 
        completed // Enviar estado actualizado
      });
      onHabitUpdated();
      onClose();
    } catch (err) {
      alert("Error al actualizar el hábito");
    }
  };

  return (
    <div id="editF">
      <h3>Editar Hábito</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        
        {/* Checkbox para marcar como completado */}
        <div class="Checkbox-f">
        <label>
          <input 
            type="checkbox" 
            checked={completed} 
            onChange={(e) => setCompleted(e.target.checked)} 
          />
          Hábito Completado
        </label>
        </div>
<div clas="form-B2">
    <button type="submit">Guardar Cambios</button>
        <button type="button" onClick={onClose}>Cancelar</button>
</div>
        
      </form>
    </div>
  );
};

export default EditHabit;
