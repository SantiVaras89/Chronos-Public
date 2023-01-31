-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: db_chronos
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `assignment`
--

DROP TABLE IF EXISTS `assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employeeId` int NOT NULL,
  `projectId` int NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `start_time` varchar(255) DEFAULT NULL,
  `end_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3c77991f00a4f9147f976a4e2db` (`projectId`),
  KEY `FK_5f46fdabab5b7cc7cf64704a842` (`employeeId`),
  CONSTRAINT `FK_3c77991f00a4f9147f976a4e2db` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`),
  CONSTRAINT `FK_5f46fdabab5b7cc7cf64704a842` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignment`
--

LOCK TABLES `assignment` WRITE;
/*!40000 ALTER TABLE `assignment` DISABLE KEYS */;
INSERT INTO `assignment` VALUES (1,7,2,'2023-01-30 00:00:00','2023-01-30 00:00:00','9','18'),(2,8,2,'2023-01-30 00:00:00','2023-01-30 00:00:00','9','18'),(3,9,2,'2023-01-30 00:00:00','2023-01-30 00:00:00','9','18'),(4,11,1,'2023-01-30 00:00:00','2023-01-30 00:00:00','9','18');
/*!40000 ALTER TABLE `assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calendar_event`
--

DROP TABLE IF EXISTS `calendar_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calendar_event` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `start` varchar(255) NOT NULL,
  `end` varchar(255) DEFAULT NULL,
  `holiday` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendar_event`
--

LOCK TABLES `calendar_event` WRITE;
/*!40000 ALTER TABLE `calendar_event` DISABLE KEYS */;
INSERT INTO `calendar_event` VALUES (1,'Año Nuevo','2023-01-01',NULL,1),(2,'Carnaval','2023-02-20',NULL,1),(3,'Carnaval','2023-02-21',NULL,1),(4,'Día Nacional de la Memoria por la Verdad y la Justicia','2023-03-24',NULL,1),(5,'Día del Veterano y de los Caídos en la Guerra de Malvinas','2023-04-02',NULL,1),(6,'Pascuas Judías','2023-04-05',NULL,1),(7,'Jueves Santo','2023-04-06',NULL,1),(8,'Pascuas Judías','2023-04-06',NULL,1),(9,'Viernes Santo','2023-04-07',NULL,1),(10,'Pascuas Judías','2023-04-07',NULL,1),(11,'Domingo de Pascua','2023-04-09',NULL,1),(12,'Pascuas Judías','2023-04-11',NULL,1),(13,'Pascuas Judías','2023-04-12',NULL,1),(14,'Último Día del Pésaj','2023-04-13',NULL,1),(15,'Día de acción por la tolerancia y el respeto entre los pueblos','2023-04-24',NULL,1),(16,'Día del Trabajo','2023-05-01',NULL,1),(17,'Conmemoración de General Don Martín Miguel de Güemes','2023-06-17',NULL,1),(18,'Paso a la Inmortalidad del General Manuel Belgrano','2023-06-20',NULL,1),(19,'Primer Gobierno Patrio','2023-05-25',NULL,1),(20,'Fiesta del Sacrificio','2023-06-29',NULL,1),(21,'Día de la Independencia','2023-07-09',NULL,1),(22,'Año Nuevo Islámico','2023-07-19',NULL,1),(23,'Paso a la Inmortalidad del General José de San Martín','2023-08-21',NULL,1),(24,'Año Nuevo Judío','2023-09-16',NULL,1),(25,'Año Nuevo Judío','2023-09-17',NULL,1),(26,'Día del Perdón','2023-09-25',NULL,1),(27,'Día de la Soberanía Nacional','2023-11-20',NULL,1),(28,'Inmaculada Concepción de María','2023-12-08',NULL,1),(29,'Navidad','2023-12-25',NULL,1),(30,'Culminación del Ayuno','2023-04-21',NULL,1),(31,'Puente Turístico','2023-05-26',NULL,1),(32,'Puente Turístico','2023-06-19',NULL,1),(33,'Puente Turístico','2023-10-13',NULL,1),(34,'Día del Respeto a la Diversidad Cultural','2023-10-16',NULL,1);
/*!40000 ALTER TABLE `calendar_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `cuit` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (1,'FYSGROUP','30111111115'),(2,'PHILIPS ARGENTINA S.A.','30500527230');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client_referent`
--

DROP TABLE IF EXISTS `client_referent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client_referent` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clientId` int NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3a5d4e97f844b6d25e2c1aa0531` (`clientId`),
  CONSTRAINT `FK_3a5d4e97f844b6d25e2c1aa0531` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_referent`
--

LOCK TABLES `client_referent` WRITE;
/*!40000 ALTER TABLE `client_referent` DISABLE KEYS */;
/*!40000 ALTER TABLE `client_referent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `alias` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'FIT Software & Consulting SA','FIT'),(2,'SIBCO Consultores SRL','SIBCO');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `companyId` int DEFAULT NULL,
  `dni` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_26c3d513e0832e5abbbdd3d2a88` (`companyId`),
  CONSTRAINT `FK_26c3d513e0832e5abbbdd3d2a88` FOREIGN KEY (`companyId`) REFERENCES `company` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'Admin','Admin','admin@chronos.com',NULL,NULL),(2,'Emilce','Busquet','emilce.busquet@fysgroup.com.ar',2,'34110326'),(3,'Gonzalo','Cocina','gonzalo.cocina@fysgroup.com.ar',2,'22644594'),(4,'Pablo','Kuschniroff','pablo.kuschniroff@fysgroup.com.ar',1,'20.006.659'),(5,'Guelmy','Diaz Blanco','guelmy.diaz.blanco@fysgroup.com.ar',1,'19076504'),(6,'Maria Cecilia','Bello','cecilia.bello@fysgroup.com.ar',1,'25226704'),(7,'Agustin Andres','Coppola','agustin.coppola@fysgroup.com.ar',1,'37123164'),(8,'Freddy Jose','Moreno Berrios ','freddy.moreno@fysgroup.com.ar',1,'95850720'),(9,'Candela','Del Pos','candela.delpos@fysgroup.com.ar',1,'39850437'),(10,'Marta Elisa ','Ardito','marta.ardito@sibco-consultores.com.ar',2,'21484165'),(11,'User','User','dora.massaccesi@fysgroup.com.ar',1,'111111111');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `id` int NOT NULL AUTO_INCREMENT,
  `eventTypeId` int NOT NULL,
  `employeeId` int NOT NULL,
  `projectId` int NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `period` varchar(255) NOT NULL,
  `hours` decimal(4,2) NOT NULL,
  `half_value` decimal(4,2) DEFAULT NULL,
  `full_value` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3b674f340d59a5fc144f2229763` (`eventTypeId`),
  KEY `FK_32673ce9cac769b629b0dcaae44` (`employeeId`),
  KEY `FK_3dde39f7b276bbc735a0f762ead` (`projectId`),
  CONSTRAINT `FK_32673ce9cac769b629b0dcaae44` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`id`),
  CONSTRAINT `FK_3b674f340d59a5fc144f2229763` FOREIGN KEY (`eventTypeId`) REFERENCES `event_type` (`id`),
  CONSTRAINT `FK_3dde39f7b276bbc735a0f762ead` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_type`
--

DROP TABLE IF EXISTS `event_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_type`
--

LOCK TABLES `event_type` WRITE;
/*!40000 ALTER TABLE `event_type` DISABLE KEYS */;
INSERT INTO `event_type` VALUES (1,'Horas Extra','1'),(2,'Vacaciones','1'),(3,'Día de estudio','1'),(4,'Licencia por enfermedad','1');
/*!40000 ALTER TABLE `event_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id` int NOT NULL AUTO_INCREMENT,
  `companyId` int DEFAULT NULL,
  `clientId` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_816f608a9acf4a4314c9e1e9c66` (`clientId`),
  KEY `FK_17c18aa92afa5fa328e9e181fe8` (`companyId`),
  CONSTRAINT `FK_17c18aa92afa5fa328e9e181fe8` FOREIGN KEY (`companyId`) REFERENCES `company` (`id`),
  CONSTRAINT `FK_816f608a9acf4a4314c9e1e9c66` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,1,1,'TESTINGCRONOS','2023-01-25 00:00:00','2033-01-25 00:00:00'),(2,1,2,'PHILIPS','2023-01-27 00:00:00','2023-11-30 00:00:00');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin'),(2,'User');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `login_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `roleId` int NOT NULL,
  `employeeId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_ab4a80281f1e8d524714e00f38` (`employeeId`),
  KEY `FK_c28e52f758e7bbc53828db92194` (`roleId`),
  CONSTRAINT `FK_ab4a80281f1e8d524714e00f38f` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`id`),
  CONSTRAINT `FK_c28e52f758e7bbc53828db92194` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Admin','Admin','1',1,1),(2,'ebusquet','Fys2023','1',1,2),(3,'gcocina','qep0o3cp','1',1,3),(4,'pkuschniroff','k8stnchf','1',1,4),(5,'gdiazbla','52k2ugwn','1',1,5),(6,'cbello','jbx0gzx7','1',1,6),(7,'acoppola','k12qggqq','1',2,7),(8,'Fmberrios','sv8pk9xi','1',2,8),(9,'cdelpos','07gxl30e','1',2,9),(10,'mardito','epvvdm1s','1',1,10),(11,'user','user','1',2,11);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-31 10:05:44
