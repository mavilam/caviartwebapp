-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 19, 2017 at 07:10 PM
-- Server version: 10.1.26-MariaDB
-- PHP Version: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `caviartdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `actores`
--

CREATE TABLE `actores` (
  `VideoUrl` varchar(150) COLLATE utf8_spanish_ci NOT NULL,
  `Nombre` varchar(75) COLLATE utf8_spanish_ci NOT NULL,
  `Edad` int(2) NOT NULL,
  `Personaje` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `Descripcion` varchar(300) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `actores`
--

INSERT INTO `actores` (`VideoUrl`, `Nombre`, `Edad`, `Personaje`, `Descripcion`) VALUES
('https://www.youtube.com/embed/qHPEUqtMDVc?autoplay=1;rel=0;showinfo=0;autohide=1', 'Alex Gómez', 24, 'Chris Maloney', 'Expresivo y con ganas de comerse el mundo. Luchará contra cualquier adversidad');

-- --------------------------------------------------------

--
-- Table structure for table `frases`
--

CREATE TABLE `frases` (
  `Id` int(11) NOT NULL,
  `Frase` varchar(150) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `frases`
--

INSERT INTO `frases` (`Id`, `Frase`) VALUES
(1, '\"Fuma, fuma, fuma de esa hierba\"'),
(2, '\"No existen preguntas sin respuesta, sólo preguntas mal formuladas\"'),
(3, '\"Es toda una experiencia vivir con miedo, eso es lo que significa ser un esclavo\"'),
(4, '\"Enterramos nuestros pecados, lavamos nuestras conciencias\"'),
(5, '\"Siempre digo la verdad, incluso cuando miento digo la verdad\"');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `Id` int(6) NOT NULL,
  `Titulo` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `ImgPreviaUrl` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `VideoUrl` varchar(150) COLLATE utf8_spanish_ci NOT NULL,
  `FechaEstreno` date DEFAULT NULL,
  `Duracion` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Tematica` varchar(250) COLLATE utf8_spanish_ci DEFAULT NULL,
  `Sinopsis` varchar(350) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`Id`, `Titulo`, `ImgPreviaUrl`, `VideoUrl`, `FechaEstreno`, `Duracion`, `Tematica`, `Sinopsis`) VALUES
(1, 'Stop Mannequin Challenge \"COMUNICADO\"', 'https://i.ytimg.com/vi/qHPEUqtMDVc/hqdefault.jpg?sqp=-oaymwEXCPYBEIoBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLD-5bKzmIzuAmRnhDRlYqo_OMcIeg', 'https://www.youtube.com/embed/qHPEUqtMDVc?autoplay=1;rel=0;showinfo=0;autohide=1', '2016-12-16', '00:01:57', 'Fuck Mannequin Challenge', 'Fuck Mannequin Challenge Fuck Mannequin Challenge Fuck Mannequin Challenge Fuck Mannequin Challenge Fuck Mannequin Challenge Fuck Mannequin Challenge Fuck Mannequin Challenge Fuck Mannequin Challenge Fuck Mannequin Challenge');

-- --------------------------------------------------------

--
-- Table structure for table `votacion`
--

CREATE TABLE `votacion` (
  `Titulo` varchar(150) COLLATE utf8_spanish_ci NOT NULL,
  `Valoracion` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `frases`
--
ALTER TABLE `frases`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `frases`
--
ALTER TABLE `frases`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `Id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
