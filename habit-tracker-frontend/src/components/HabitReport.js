import React, { useEffect, useState } from "react";
import api from "../api";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Papa from "papaparse";

const HabitReport = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await api.get("/habits");
        setHabits(response.data);
      } catch (error) {
        console.error("Error al obtener hábitos:", error);
      }
    };

    fetchHabits();
  }, []);

  // 📝 Generar PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Reporte de Hábitos", 20, 10);

    const tableData = habits.map(habit => [
      habit.name,
      habit.description,
      habit.startDate,
      habit.endDate,
      habit.completed ? "✅ Completado" : "❌ Pendiente"
    ]);

    doc.autoTable({
      head: [["Nombre", "Descripción", "Inicio", "Fin", "Estado"]],
      body: tableData,
    });

    doc.save("reporte_habitos.pdf");
  };

  // 📂 Generar CSV
  const generateCSV = () => {
    const csvData = habits.map(habit => ({
      Nombre: habit.name,
      Descripción: habit.description,
      Inicio: habit.startDate,
      Fin: habit.endDate,
      Estado: habit.completed ? "Completado" : "Pendiente",
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "reporte_habitos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h2>📄<span class="subtitles">Reporte de Hábitos</span></h2>
      <button onClick={generatePDF}>📥 Descargar PDF</button>
      <button onClick={generateCSV}>📥 Descargar CSV</button>
    </div>
  );
};

export default HabitReport;
