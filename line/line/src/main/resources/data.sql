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

-- Volcando datos para la tabla line.line: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `line` DISABLE KEYS */;
INSERT INTO `line` (`id`, `name`) VALUES
	(54699147, 'Linea 1');
/*!40000 ALTER TABLE `line` ENABLE KEYS */;

-- Volcando datos para la tabla line.line_work_station_configurations: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `line_work_station_configurations` DISABLE KEYS */;
INSERT INTO `line_work_station_configurations` (`line_id`, `work_station_configurations_id`) VALUES
	(54699147, 15018154),
	(54699147, 17503210),
	(54699147, 25857246),
	(54699147, 35503776),
	(54699147, 50299291),
	(54699147, 65146241),
	(54699147, 89778108);
/*!40000 ALTER TABLE `line_work_station_configurations` ENABLE KEYS */;

-- Volcando datos para la tabla line.manufacturing_order: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `manufacturing_order` DISABLE KEYS */;
INSERT INTO `manufacturing_order` (`id`, `code`, `date`, `status`, `line_id`) VALUES
	(51751396, '001', '2017-02-13 00:00:00', 0, 54699147);
/*!40000 ALTER TABLE `manufacturing_order` ENABLE KEYS */;

-- Volcando datos para la tabla line.manufacturing_order_custom_product: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `manufacturing_order_custom_product` DISABLE KEYS */;
INSERT INTO `manufacturing_order_custom_product` (`id`, `description`) VALUES
	(47938585, 'Pieza 2'),
	(64003543, 'Pieza 1');
/*!40000 ALTER TABLE `manufacturing_order_custom_product` ENABLE KEYS */;

-- Volcando datos para la tabla line.manufacturing_order_custom_product_manufacturing_order_products: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `manufacturing_order_custom_product_manufacturing_order_products` DISABLE KEYS */;
INSERT INTO `manufacturing_order_custom_product_manufacturing_order_products` (`manufacturing_order_custom_product_id`, `manufacturing_order_products_id`) VALUES
	(47938585, 27818),
	(47938585, 57244314),
	(47938585, 76683160),
	(64003543, 1122970),
	(64003543, 60017994);
/*!40000 ALTER TABLE `manufacturing_order_custom_product_manufacturing_order_products` ENABLE KEYS */;

-- Volcando datos para la tabla line.manufacturing_order_manufacturing_order_custom_products: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `manufacturing_order_manufacturing_order_custom_products` DISABLE KEYS */;
INSERT INTO `manufacturing_order_manufacturing_order_custom_products` (`manufacturing_order_id`, `manufacturing_order_custom_products_id`) VALUES
	(51751396, 47938585),
	(51751396, 64003543);
/*!40000 ALTER TABLE `manufacturing_order_manufacturing_order_custom_products` ENABLE KEYS */;

-- Volcando datos para la tabla line.manufacturing_order_product: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `manufacturing_order_product` DISABLE KEYS */;
INSERT INTO `manufacturing_order_product` (`id`, `height`, `quantity`, `width`, `product_id`) VALUES
	(27818, NULL, 1, 2, 100),
	(1122970, 1, 1, 2, 14225),
	(57244314, 2, 1, 2, 14225),
	(60017994, NULL, 1, 2, 100),
	(76683160, 1, 2, NULL, 9032);
/*!40000 ALTER TABLE `manufacturing_order_product` ENABLE KEYS */;

-- Volcando datos para la tabla line.trace: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `trace` DISABLE KEYS */;
/*!40000 ALTER TABLE `trace` ENABLE KEYS */;

-- Volcando datos para la tabla line.trace_delays: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `trace_delays` DISABLE KEYS */;
/*!40000 ALTER TABLE `trace_delays` ENABLE KEYS */;

-- Volcando datos para la tabla line.work_station: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `work_station` DISABLE KEYS */;
INSERT INTO `work_station` (`id`, `ip`, `name`, `short_name`) VALUES
	(5228768, '192.168.1.1', 'Puesto 1', 'P1'),
	(14185891, '192.168.1.4', 'Puesto 4', 'P4'),
	(50721177, '192.168.1.6', 'Puesto 6', 'P6'),
	(68194402, '192.168.1.5', 'Puesto 5', 'P5'),
	(68229378, '192.168.1.3', 'Puesto 3', 'P3'),
	(90640557, '192.168.1.2', 'Puesto 2', 'P2');
/*!40000 ALTER TABLE `work_station` ENABLE KEYS */;

-- Volcando datos para la tabla line.work_station_configuration: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `work_station_configuration` DISABLE KEYS */;
INSERT INTO `work_station_configuration` (`id`, `first`, `last`, `next_work_station_id`, `prev_work_station_id`, `work_station_id`) VALUES
	(15018154, b'0', b'0', 68194402, 5228768, 68229378),
	(17503210, b'0', b'0', 68194402, 90640557, 68229378),
	(25857246, b'0', b'1', NULL, 68229378, 68194402),
	(35503776, b'0', b'1', NULL, 14185891, 68194402),
	(50299291, b'1', b'0', 68194402, NULL, 14185891),
	(65146241, b'1', b'0', 68229378, NULL, 5228768),
	(89778108, b'1', b'0', 68229378, NULL, 90640557);
/*!40000 ALTER TABLE `work_station_configuration` ENABLE KEYS */;

-- Volcando datos para la tabla line.work_station_configuration_delays: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `work_station_configuration_delays` DISABLE KEYS */;
/*!40000 ALTER TABLE `work_station_configuration_delays` ENABLE KEYS */;

-- Volcando datos para la tabla line.work_station_configuration_product_types: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `work_station_configuration_product_types` DISABLE KEYS */;
INSERT INTO `work_station_configuration_product_types` (`work_station_configuration_id`, `product_types_id`) VALUES
	(65146241, 1),
	(89778108, 2),
	(15018154, 1),
	(15018154, 2),
	(17503210, 1),
	(17503210, 2),
	(50299291, 7),
	(25857246, 1),
	(25857246, 2),
	(25857246, 7),
	(35503776, 1),
	(35503776, 2),
	(35503776, 3);
/*!40000 ALTER TABLE `work_station_configuration_product_types` ENABLE KEYS */;

-- Volcando datos para la tabla line.work_station_configuration_users: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `work_station_configuration_users` DISABLE KEYS */;
INSERT INTO `work_station_configuration_users` (`work_station_configuration_id`, `users_id`) VALUES
	(65146241, 3419337),
	(89778108, 17578568),
	(15018154, 27306787),
	(17503210, 27306787),
	(50299291, 3419337),
	(25857246, 17578568),
	(35503776, 17578568);
/*!40000 ALTER TABLE `work_station_configuration_users` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;


SET foreign_key_checks = 1;