import React, { useState } from "react";
import CreateHabit from "./CreateHabit";
import HabitList from "./HabitList";
import "../styles/HabitsView.css";
import HabitStats from "./HabitStats"; // Importar el nuevo componente
import HabitReport from "./HabitReport";
import Dock from "./Dock/Dock.jsx";
import { VscSettingsGear, VscHome, VscArchive, VscAccount } from "react-icons/vsc";

const items = [
  { icon: <VscHome size={26} />, label: 'Home', onClick: () => alert('Home!') },
  { icon: <VscArchive size={26} />, label: 'Archive', onClick: () => alert('Archive!') },
  { icon: <VscAccount size={26} />, label: 'Profile', onClick: () => alert('Profile!') },
  { icon: <VscSettingsGear size={26} />, label: 'Settings', onClick: () => alert('Settings!') },
];
  const HabitsView = () => {
    const [refresh, setRefresh] = useState(false);
  
    const handleHabitUpdated = () => {
      setRefresh(!refresh); // Forzar actualización
    };
  
  return (
    <div className="container2">
      <h1 id="title1" className="animate__animated">Mis Hábitos</h1>
      <div style={{ display: "flex", gap: "0" }}>
        <div id="mis-hb" style={{ flex: 1 }}>
          <h2 id="title2">Crear nuevo hábito</h2>
          <CreateHabit onHabitCreated={handleHabitUpdated} />
        </div>
        <div id="list-h" style={{ flex: 2 }}>
          <h2 id="title3">Lista de hábitos</h2>
          <HabitList refresh={refresh} onHabitUpdated={handleHabitUpdated} />
        </div>
      </div>
      <div>
      <HabitStats />
      </div>
      <div>
      <HabitReport />
      </div>
      <Dock class="animate__animated animate__rollOut"
items={items}
panelHeight={68}
baseItemSize={50}
magnification={70}
/>
    </div>
  );
};



export default HabitsView;