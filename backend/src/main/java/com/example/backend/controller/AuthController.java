package com.example.backend.controller;

import com.example.backend.model.Usuario;
import com.example.backend.service.UsuarioService;
import com.example.backend.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")  // Permite peticiones desde cualquier lugar
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;  // Maneja autenticaciones en Spring Security

    // REGISTRO DE USUARIO
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Usuario user) {
        try {
            usuarioService.registrarUsuario(user.getUsername(), user.getEmail(), user.getPassword());
            return ResponseEntity.ok("Usuario registrado correctamente en la BD.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // LOGIN Y GENERACIÓN DE TOKEN
    @PostMapping("/login")
public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginRequest) {
    String username = loginRequest.get("username");
    String password = loginRequest.get("password");

    System.out.println("Intento de login con username: " + username);

    try {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(username, password)
        );

        // Usamos la variable authentication para obtener el nombre de usuario
        String authenticatedUsername = authentication.getName();
        System.out.println("Usuario autenticado: " + authenticatedUsername);

        // Generar el token JWT
        String token = jwtUtil.generateToken(authenticatedUsername);
        System.out.println("Token generado: " + token);
        System.out.println("Token generado en loginUser: " + token);

        return ResponseEntity.ok(Map.of("token", token));
    } catch (Exception e) {
        System.out.println("Error durante la autenticación: " + e.getMessage());
        return ResponseEntity.status(401).body("Credenciales incorrectas");
    }
}

    
}
