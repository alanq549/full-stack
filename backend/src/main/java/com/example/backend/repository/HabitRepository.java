package com.example.backend.repository;

import com.example.backend.model.Habit;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HabitRepository extends JpaRepository<Habit, Long> {
    List<Habit> findByUser_Id(Long userId); // Buscar hábitos por ID de usuario
}