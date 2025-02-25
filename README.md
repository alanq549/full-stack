# full stack

como crear la bd y su estructura :
requiere crear un user
username:alan
password:1234

/// cree un archivo "habit_tracker.sql" y agrege lo siguiente y por ultimo lo importa:


-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-02-2025 a las 20:08:24
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `habit_tracker`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habits`
--

CREATE TABLE `habits` (
  `id` bigint(20) NOT NULL,
  `completed` bit(1) NOT NULL,
  `description` varchar(255) NOT NULL,
  `end_date` datetime(6) NOT NULL,
  `name` varchar(255) NOT NULL,
  `start_date` datetime(6) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `habits`
--

INSERT INTO `habits` (`id`, `completed`, `description`, `end_date`, `name`, `start_date`, `user_id`) VALUES
(7, b'0', 'dfajfo;adfj', '2025-02-23 00:00:00.000000', 'sjsnflka', '2025-03-08 00:00:00.000000', 2),
(8, b'1', 'dfkskjf;asjfjasdk;fjlas;djf', '2025-02-23 00:00:00.000000', 'fasdjf;ajdf', '2025-02-23 00:00:00.000000', 2),
(9, b'0', 'fasdknfklasn;fansf', '2025-02-23 00:00:00.000000', 'dfdlskfmlas;kfasfdaf', '2025-02-23 00:00:00.000000', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `password`, `username`) VALUES
(1, '', '$2a$10$DvxHTJirfk3LdK560Ykm5ueTzmKyajLk0TsZemAWg63/vbwvOqGw6', 'alan quintana'),
(2, 'alanqff@gmail.com', '$2a$10$E9lCRzUx5A041c4t/BQjSeNMcifHfMe6Hhvqtwt2ChN/dPpJ.VoKG', 'alanQ');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `habits`
--
ALTER TABLE `habits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKfcedux1a1fx49xh714wlsng5k` (`user_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKldv0v52e0udsh2h1rs0r0gw1n` (`nombre`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKkfsp0s1tflm1cwlj8idhqsad0` (`email`),
  ADD UNIQUE KEY `UKm2dvbwfge291euvmk6vkkocao` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `habits`
--
ALTER TABLE `habits`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `habits`
--
ALTER TABLE `habits`
  ADD CONSTRAINT `FKfcedux1a1fx49xh714wlsng5k` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
