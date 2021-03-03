-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  sam. 02 jan. 2021 à 20:14
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `jeux_de_societe`
--

-- --------------------------------------------------------

--
-- Structure de la table `jeux`
--

DROP TABLE IF EXISTS `jeux`;
CREATE TABLE IF NOT EXISTS `jeux` (
  `id_jeux` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `joueurs_min` int(11) NOT NULL,
  `joueurs_max` int(11) NOT NULL,
  `duree` int(11) NOT NULL,
  `age_recommande` int(11) NOT NULL,
  `mecanisme` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `mecanisme2` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date_parution` date NOT NULL,
  `editeur` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `commentaire` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `appartient` int(11) NOT NULL,
  PRIMARY KEY (`id_jeux`),
  KEY `fk_membre_jeux` (`appartient`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `jeux`
--

INSERT INTO `jeux` (`id_jeux`, `titre`, `joueurs_min`, `joueurs_max`, `duree`, `age_recommande`, `mecanisme`, `mecanisme2`, `date_parution`, `editeur`, `commentaire`, `appartient`) VALUES
(1, "Plouf Party", 3, 6, 15, 6, "Mémoire", "Bluff", "2018-06-28", "Cocktail Games", "Nope", 1),
(2, "Yogi", 3, 10, 20, 8, "Dextérité", "", "2017-10-01", "Gigamic", "Qui tiendra le plus longtemps?", 1),
(3, "6 qui prend!", 2, 10, 45, 10, "Simultané", NULL, "2007-01-01", "Gigamic", NULL, 2),
(4, "Jet lag", 3, 8, 30, 12, "Questions", NULL, "2018-01-01", "Cocktail Games", NULL, 1),
(5, "Lâche pas la savonette", 3, 6, 15, 16, "Gestion de main", NULL, "2018-07-13", "Don't panic games", NULL, 2),
(6, "Time Bomb", 4, 8, 30, 8, "Bluff", NULL, "2016-11-04", "Iello", NULL, 2),
(7, "Héros à louer", 3, 5, 30, 14, "Gestion de ", NULL, "2014-01-01", "Iello", NULL, 1),
(8, "Secrets", 4, 8, 15, 10, "Rôle caché", NULL, "2017-01-01", "Repos Production", NULL, 1),
(9, "Triple hourra pour le Maître!", 2, 6, 30, 14, "Placement", NULL, "2017-04-01", "Edge Entertainement", NULL, 1),
(10, "Mascarade", 2, 13, 30, 8, "Rôle caché", NULL, "2013-06-01", "Repos Production", NULL, 2),
(11, "Citadelles", 2, 8, 90, 10, "Bluff", NULL, "2000-01-01", "Millenium", NULL, 1),
(12, "Bad News", 3, 10, 30, 18, "Ambiance", NULL, "2019-12-01", "404 éditions", NULL, 1),
(13, "La petite mort", 2, 4, 30, 14, "Gestion de main", NULL, "2018-10-01", "Lumberjack Studio", NULL, 1),
(14, "Bears vs Babies", 2, 4, 15, 7, "Gestion de main", NULL, "2017-06-01", "Auto-édité", NULL, 1),
(15, "Dard Dard", 3, 5, 25, 7, "Gestion de main", NULL, "2018-03-01", "Gigagmic", NULL, 1),
(16, "Poker des cafards", 2, 6, 15, 8, "Bluff", NULL, "2013-02-01", "Gigamic", NULL, 1),
(17, "Scripta", 2, 6, 30, 10, "Réflexion", NULL, "2018-10-01", "Aliadys", NULL, 1),
(18, "Exploding Kittens", 2, 5, 20, 7, "Pioche", NULL, "2015-06-01", "Auto-édité", NULL, 1),
(19, "Mission Calaveras", 3, 6, 25, 12, "Gestion de main", NULL, "2019-03-01", "Gigamic", NULL, 2),
(20, "Intrigue", 3, 5, 45, 12, "Négociation", NULL, "2016-02-01", "Igiari", NULL, 1),
(21, "Galèrapagos", 3, 12, 20, 8, "Semi-coopéraif", NULL, "2017-09-01", "Gigamic", NULL, 1),
(23, "Senators", 3, 5, 40, 10, "Collection", "Enchères", "2018-01-01", "Ferti", "", 2),
(24, "Les Petites Bourgades", 1, 6, 45, 10, "Construction", "", "2020-02-01", "Lucky Duck Games", "", 1),
(25, "Obscurio", 2, 8, 45, 10, "Communication", "Déduction", "2019-09-01", "Libellud", "", 1);

-- --------------------------------------------------------

--
-- Structure de la table `membre`
--

DROP TABLE IF EXISTS `membre`;
CREATE TABLE IF NOT EXISTS `membre` (
  `id_membre` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `prenom` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `telephone` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `adresse` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `date_naissance` date NOT NULL,
  PRIMARY KEY (`id_membre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `membre`
--

INSERT INTO `membre` (`id_membre`, `nom`, `prenom`, `telephone`, `email`, `adresse`, `date_naissance`) VALUES
(1, "Delannois", "Charles", "0476017199", "charles.delannois@live.be", "45A Rue Basse Dottignies", "1990-04-11"),
(2, "Favier", "Marie", "0498735465", "marie.favier@outlook.com", "45A Rue Basse Dottignies", "1992-05-27"),
(3, "Gekiére", "Rémi", "0471077971", "remi.instit@outlook.be", "43 Chaussée de Luingne 43 Herseaux", "1991-05-06");

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `jeux`
--
ALTER TABLE `jeux`
  ADD CONSTRAINT `fk_membre_jeux` FOREIGN KEY (`appartient`) REFERENCES `membre` (`id_membre`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
