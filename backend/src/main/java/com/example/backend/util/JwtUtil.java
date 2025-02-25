package com.example.backend.util;

import io.jsonwebtoken.Jwts;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    private final SecretKey secretKey;

    @Autowired
    public JwtUtil(SecretKey secretKey) {
        this.secretKey = secretKey;
    }

    // Método para generar el token
    public String generateToken(String username) {
        System.out.println("Generando token para el usuario: " + username);
        String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // Expira en 1 hora
                .signWith(secretKey) // Usar la clave secreta inyectada
                .compact();
        System.out.println("Token generado: " + token);
        return token;
    }

    // Método para extraer el username del token
    public String extractUsername(String token) {
        try {
            System.out.println("Extrayendo username del token: " + token);
            String username = Jwts.parserBuilder()
                    .setSigningKey(secretKey) // Usar la clave secreta inyectada
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
            System.out.println("Username extraído: " + username);
            return username;
        } catch (Exception e) {
            System.out.println("Error al extraer el username del token: " + e.getMessage());
            return null;
        }
    }

    // Método para verificar si el token está vencido
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Método para extraer la fecha de expiración
    private Date extractExpiration(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey) // Usar la clave secreta inyectada
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
    }

    // Método para validar el token
    public boolean validateToken(String token, String username) {
        try {
            System.out.println("Validando token para el usuario: " + username);
            String extractedUsername = extractUsername(token);
            boolean isTokenValid = (username.equals(extractedUsername) && !isTokenExpired(token));
             System.out.println("Token válido: " + isTokenValid);
            return isTokenValid;
        } catch (Exception e) {
            System.out.println("Error al validar el token: " + e.getMessage());
            return false;
        }
    }
}









