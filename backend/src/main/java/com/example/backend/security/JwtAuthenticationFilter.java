package com.example.backend.security;

import com.example.backend.util.JwtUtil;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

                // Excluir la ruta de login del filtro
    if (request.getRequestURI().equals("/api/auth/login")) {
        chain.doFilter(request, response);
        return;
    }
        // Extraer el token de la cabecera "Authorization"
        String token = request.getHeader("Authorization");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // Eliminar "Bearer " del token
            System.out.println("Token recibido: " + token);
            System.out.println("Token recibido en el filtro: " + token);

            // Extraer el nombre de usuario del token
            String username = jwtUtil.extractUsername(token);
            System.out.println("Username extraído del token: " + username);

            // Validar el token
            if (username != null && jwtUtil.validateToken(token, username)) {
                System.out.println("Token válido para el usuario: " + username);

                // Establecer el contexto de seguridad
                SecurityContextHolder.getContext().setAuthentication(
    new UsernamePasswordAuthenticationToken(username, null, List.of(() -> "ROLE_USER"))
);
            } else {
                System.out.println("Token inválido o expirado");
            }
        }

        // Continuar con la cadena de filtros
        chain.doFilter(request, response);
    }
}






