package com.example.backend.service;

import com.example.backend.model.Habit;
import com.example.backend.model.Usuario;
import com.example.backend.repository.HabitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HabitService {

    @Autowired
    private HabitRepository habitRepository;

    // Crear un nuevo hábito
    public Habit createHabit(Habit habit, Usuario user) {
        habit.setUser(user);
        return habitRepository.save(habit);
    }

    // Obtener todos los hábitos de un usuario
    public List<Habit> getHabitsByUser(Usuario user) {
        return habitRepository.findByUser_Id(user.getId());
    }

    // Actualizar un hábito
    public Habit updateHabit(Long id, Habit habitDetails) {
        Habit habit = habitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hábito no encontrado"));
        habit.setName(habitDetails.getName());
        habit.setDescription(habitDetails.getDescription());
        habit.setStartDate(habitDetails.getStartDate());
        habit.setEndDate(habitDetails.getEndDate());
        habit.setCompleted(habitDetails.isCompleted());
        return habitRepository.save(habit);
    }

    // Eliminar un hábito
    public void deleteHabit(Long id) {
        Habit habit = habitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hábito no encontrado"));
        habitRepository.delete(habit);
    }
}