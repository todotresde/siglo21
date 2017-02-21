SET foreign_key_checks = 0;
-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.6.24 - MySQL Community Server (GPL)
-- SO del servidor:              Win32
-- HeidiSQL Versión:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
-- Volcando datos para la tabla line.delay: ~0 rows (aproximadamente)

-- Volcando datos para la tabla line.role: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` (`id`, `description`, `name`) VALUES
	(8661781, 'Usuario', 'Usuario');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;

-- Volcando datos para la tabla line.user: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `email`, `name`, `password`, `username`) VALUES
	(3419337, 'bsalas@gmail.com', 'Beatriz Salas', '$2a$10$F.ZPeeF19OWYL9nj/cVLpOzm1274mew.PWJZKGt6QMJwXqWvv8AVe', 'bsalas'),
	(17578568, 'cglaeano@gmail.com', 'Carina Galaeano', '$2a$10$3KjMgcdQGTS5CBBf0uz3quLtvucdRhdsfrz1F8jPDDMiUnQTrB2fu', 'cgaleano'),
	(27306787, 'lgaray@gmail.com', 'Leonardo Garay', '$2a$10$.lUp4mjFoYDJn5NODGeHLedB01cqJVZ5oO8FalqkmPIK1E1inK6PG', 'lgaray');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Volcando datos para la tabla line.user_roles: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` (`user`, `roles`) VALUES
	(27306787, 8661781),
	(17578568, 8661781),
	(3419337, 8661781);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;


SET foreign_key_checks = 1;