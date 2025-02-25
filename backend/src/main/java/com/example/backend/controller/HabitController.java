package com.example.backend.controller;

import com.example.backend.model.Habit;
import com.example.backend.model.Usuario;
import com.example.backend.service.HabitService;
import com.example.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/habits")
public class HabitController {

    @Autowired
    private HabitService habitService;

    @Autowired
    private UsuarioService usuarioService;

    // Crear un nuevo hábito
    @PostMapping
    public ResponseEntity<Habit> createHabit(@RequestBody Habit habit) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Usuario user = usuarioService.buscarPorUsernameOEmail(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Habit newHabit = habitService.createHabit(habit, user);
        return ResponseEntity.ok(newHabit);
    }

    // Obtener todos los hábitos del usuario actual
    @GetMapping
public ResponseEntity<List<Habit>> getHabitsByUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String username = authentication.getName();
    System.out.println("Usuario autenticado en GET: " + username);        
    System.out.println("Usuario autenticado: " + username);
    Usuario user = usuarioService.buscarPorUsernameOEmail(username)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    List<Habit> habits = habitService.getHabitsByUser(user);
    System.out.println("Hábitos encontrados: " + habits.size());
    System.out.println("Hábitos: " + habits); // Depuración
    return ResponseEntity.ok(habits);
}

    // Actualizar un hábito
    @PutMapping("/{id}")
    public ResponseEntity<Habit> updateHabit(@PathVariable Long id, @RequestBody Habit habitDetails) {
        Habit updatedHabit = habitService.updateHabit(id, habitDetails);
        return ResponseEntity.ok(updatedHabit);
    }

    // Eliminar un hábito
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHabit(@PathVariable Long id) {
        habitService.deleteHabit(id);
        return ResponseEntity.noContent().build();
    }
}