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
/*!40000 ALTER TABLE `delay` DISABLE KEYS */;
/*!40000 ALTER TABLE `delay` ENABLE KEYS */;

-- Volcando datos para la tabla line.delay_type: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `delay_type` DISABLE KEYS */;
INSERT INTO `delay_type` (`id`, `code`, `description`) VALUES
	(1771134, '004', 'Falta de Insumos'),
	(52079567, '003', 'Accidente de Trabajo'),
	(65126132, '002', 'Corte de Energía'),
	(73759871, '001', 'Salida a Fumar');
/*!40000 ALTER TABLE `delay_type` ENABLE KEYS */;

-- Volcando datos para la tabla line.line: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `line` DISABLE KEYS */;
INSERT INTO `line` (`id`, `name`) VALUES
	(39673680, 'Linea 1'),
	(88863561, 'Linea 2');
/*!40000 ALTER TABLE `line` ENABLE KEYS */;

-- Volcando datos para la tabla line.line_work_station_configurations: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `line_work_station_configurations` DISABLE KEYS */;
INSERT INTO `line_work_station_configurations` (`line_id`, `work_station_configurations_id`) VALUES
	(39673680, 49429987),
	(39673680, 96805858),
	(39673680, 98797841),
	(39673680, 98955181),
	(88863561, 32156444),
	(88863561, 50008293);
/*!40000 ALTER TABLE `line_work_station_configurations` ENABLE KEYS */;

-- Volcando datos para la tabla line.manufacturing_order: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `manufacturing_order` DISABLE KEYS */;
INSERT INTO `manufacturing_order` (`id`, `code`, `date`, `status`, `line_id`) VALUES
	(45891034, '00001', '2017-02-02 09:22:05', 0, 39673680),
	(94679896, '00002', '2017-02-02 09:38:18', 0, 88863561);
/*!40000 ALTER TABLE `manufacturing_order` ENABLE KEYS */;

-- Volcando datos para la tabla line.manufacturing_order_custom_product: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `manufacturing_order_custom_product` DISABLE KEYS */;
INSERT INTO `manufacturing_order_custom_product` (`id`, `description`) VALUES
	(12974929, 'Living'),
	(41038931, 'Comedor');
/*!40000 ALTER TABLE `manufacturing_order_custom_product` ENABLE KEYS */;

-- Volcando datos para la tabla line.manufacturing_order_custom_product_manufacturing_order_products: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `manufacturing_order_custom_product_manufacturing_order_products` DISABLE KEYS */;
INSERT INTO `manufacturing_order_custom_product_manufacturing_order_products` (`manufacturing_order_custom_product_id`, `manufacturing_order_products_id`) VALUES
	(12974929, 78724236),
	(41038931, 39488685);
/*!40000 ALTER TABLE `manufacturing_order_custom_product_manufacturing_order_products` ENABLE KEYS */;

-- Volcando datos para la tabla line.manufacturing_order_manufacturing_order_custom_products: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `manufacturing_order_manufacturing_order_custom_products` DISABLE KEYS */;
INSERT INTO `manufacturing_order_manufacturing_order_custom_products` (`manufacturing_order_id`, `manufacturing_order_custom_products_id`) VALUES
	(45891034, 41038931),
	(94679896, 12974929);
/*!40000 ALTER TABLE `manufacturing_order_manufacturing_order_custom_products` ENABLE KEYS */;

-- Volcando datos para la tabla line.manufacturing_order_product: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `manufacturing_order_product` DISABLE KEYS */;
INSERT INTO `manufacturing_order_product` (`id`, `height`, `quantity`, `width`, `product_id`) VALUES
	(39488685, 1, 1, 1, 82556410),
	(78724236, 1, 1, 1, 17893444);
/*!40000 ALTER TABLE `manufacturing_order_product` ENABLE KEYS */;

-- Volcando datos para la tabla line.product: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` (`id`, `code`, `description`, `product_type_id`) VALUES
	(17893444, '0045', 'Sistema XXi', 9150849),
	(23949843, '0007', 'Tela Super Romana 60', 74239740),
	(24899657, '0006', 'Tela Romana', 74239740),
	(33103859, '0001', 'Roler 40', 9150849),
	(78809679, '002', 'Roler 50', 9150849),
	(82556410, '1001', 'Motor Roler 40', 70086131);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;

-- Volcando datos para la tabla line.product_type: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `product_type` DISABLE KEYS */;
INSERT INTO `product_type` (`id`, `code`, `description`, `has_height`, `has_width`, `name`) VALUES
	(9150849, '002', 'Sistema', NULL, b'1', 'Sistema'),
	(70086131, '003', 'Motor', NULL, NULL, 'Motor'),
	(74239740, '001', 'Tela', b'1', b'1', 'Tela'),
	(86510642, '004', 'Guía', b'1', b'0', 'Guía');
/*!40000 ALTER TABLE `product_type` ENABLE KEYS */;

-- Volcando datos para la tabla line.role: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` (`id`, `description`, `name`) VALUES
	(8661781, 'Usuario', 'Usuario');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;

-- Volcando datos para la tabla line.trace: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `trace` DISABLE KEYS */;
/*!40000 ALTER TABLE `trace` ENABLE KEYS */;

-- Volcando datos para la tabla line.trace_delays: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `trace_delays` DISABLE KEYS */;
/*!40000 ALTER TABLE `trace_delays` ENABLE KEYS */;

-- Volcando datos para la tabla line.user: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `email`, `name`, `password`, `username`) VALUES
	(3419337, 'bsalas@gmail.com', 'Beatriz Salas', '$2a$10$F.ZPeeF19OWYL9nj/cVLpOzm1274mew.PWJZKGt6QMJwXqWvv8AVe', 'bsalas'),
	(17578568, 'cglaeano@gmail.com', 'Carina Galaeano', '$2a$10$3KjMgcdQGTS5CBBf0uz3quLtvucdRhdsfrz1F8jPDDMiUnQTrB2fu', 'cgaleano'),
	(27306787, 'lgaray@gmail.com', 'Leonardo Garay', '$2a$10$.lUp4mjFoYDJn5NODGeHLedB01cqJVZ5oO8FalqkmPIK1E1inK6PG', 'lgaray');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Volcando datos para la tabla line.user_roles: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` (`user_id`, `roles_id`) VALUES
	(27306787, 8661781),
	(17578568, 8661781),
	(3419337, 8661781);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;

-- Volcando datos para la tabla line.work_station: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `work_station` DISABLE KEYS */;
INSERT INTO `work_station` (`id`, `ip`, `name`) VALUES
	(5228768, '192.168.1.1', 'Puesto 1'),
	(14185891, '192.168.1.4', 'Puesto 4'),
	(50721177, '192.168.1.6', 'Puesto 6'),
	(68194402, '192.168.1.5', 'Puesto 5'),
	(68229378, '192.168.1.3', 'Puesto 3'),
	(90640557, '192.168.1.2', 'Puesto 2');
/*!40000 ALTER TABLE `work_station` ENABLE KEYS */;

-- Volcando datos para la tabla line.work_station_configuration: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `work_station_configuration` DISABLE KEYS */;
INSERT INTO `work_station_configuration` (`id`, `first`, `last`, `next_work_station_id`, `prev_work_station_id`, `work_station_id`) VALUES
	(32156444, b'0', b'1', NULL, 5228768, 90640557),
	(49429987, b'1', b'0', 14185891, NULL, 90640557),
	(50008293, b'1', b'0', 90640557, NULL, 5228768),
	(96805858, b'1', b'0', 14185891, NULL, 68229378),
	(98797841, b'0', b'1', NULL, 5228768, 14185891),
	(98955181, b'1', b'0', 14185891, NULL, 5228768);
/*!40000 ALTER TABLE `work_station_configuration` ENABLE KEYS */;

-- Volcando datos para la tabla line.work_station_configuration_delays: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `work_station_configuration_delays` DISABLE KEYS */;
/*!40000 ALTER TABLE `work_station_configuration_delays` ENABLE KEYS */;

-- Volcando datos para la tabla line.work_station_configuration_product_types: ~8 rows (aproximadamente)
/*!40000 ALTER TABLE `work_station_configuration_product_types` DISABLE KEYS */;
INSERT INTO `work_station_configuration_product_types` (`work_station_configuration_id`, `product_types_id`) VALUES
	(98955181, 9150849),
	(49429987, 70086131),
	(96805858, 74239740),
	(98797841, 9150849),
	(98797841, 70086131),
	(98797841, 74239740),
	(50008293, 9150849),
	(32156444, 9150849);
/*!40000 ALTER TABLE `work_station_configuration_product_types` ENABLE KEYS */;

-- Volcando datos para la tabla line.work_station_configuration_users: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `work_station_configuration_users` DISABLE KEYS */;
INSERT INTO `work_station_configuration_users` (`work_station_configuration_id`, `users_id`) VALUES
	(98955181, 3419337),
	(49429987, 17578568),
	(96805858, 27306787),
	(98797841, 27306787),
	(50008293, 17578568),
	(32156444, 3419337);
/*!40000 ALTER TABLE `work_station_configuration_users` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

SET foreign_key_checks = 1;