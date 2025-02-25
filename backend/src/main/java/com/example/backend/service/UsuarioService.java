package com.example.backend.service;

import com.example.backend.model.Usuario;
import com.example.backend.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class UsuarioService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // REGISTRO DE USUARIO
    public Usuario registrarUsuario(String username, String email, String password) {
        if (usuarioRepository.findByUsername(username).isPresent() ||
            usuarioRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("El usuario o correo ya existen.");
        }

        Usuario usuario = new Usuario();
        usuario.setUsername(username);
        usuario.setEmail(email);
        usuario.setPassword(passwordEncoder.encode(password)); // Encriptar contraseña

        return usuarioRepository.save(usuario);
    }

    // AUTENTICACIÓN DEL USUARIO
    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        System.out.println("Buscando usuario con identificador: " + identifier);
        Usuario usuario = buscarPorUsernameOEmail(identifier)
                .orElseThrow(() -> {
                    System.out.println("Usuario no encontrado para el identificador: " + identifier);
                    return new UsernameNotFoundException("Usuario no encontrado");
                });
    
        System.out.println("Usuario encontrado: " + usuario.getUsername());
        System.out.println("Contraseña almacenada (encriptada): " + usuario.getPassword());
    
        // Verifica manualmente si la contraseña coincide (solo para debugging)
        boolean passwordMatches = passwordEncoder.matches("1234", usuario.getPassword());
        System.out.println("¿La contraseña coincide? " + passwordMatches);
    
        return new User(usuario.getUsername(), usuario.getPassword(), Collections.emptyList());
    }


    public Optional<Usuario> buscarPorUsernameOEmail(String identifier) {
        System.out.println("Buscando usuario por username o email: " + identifier);
        Optional<Usuario> byUsername = usuarioRepository.findByUsername(identifier);
        Optional<Usuario> byEmail = usuarioRepository.findByEmail(identifier);
    
        if (byUsername.isPresent()) {
            System.out.println("Usuario encontrado por username: " + byUsername.get().getUsername());
            return byUsername;
        } else if (byEmail.isPresent()) {
            System.out.println("Usuario encontrado por email: " + byEmail.get().getEmail());
            return byEmail;
        } else {
            System.out.println("Usuario no encontrado");
            return Optional.empty();
        }
    }


}