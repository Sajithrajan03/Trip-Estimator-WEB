-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: TripEstimator
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bus_info`
--

DROP TABLE IF EXISTS `bus_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bus_info` (
  `bus_id` int NOT NULL AUTO_INCREMENT,
  `bus_name` varchar(255) NOT NULL,
  `bus_route` int NOT NULL,
  `bus_ac` int NOT NULL,
  `bus_sleeper` int NOT NULL,
  `bus_price` int NOT NULL,
  PRIMARY KEY (`bus_id`),
  UNIQUE KEY `UQ_BUS` (`bus_name`,`bus_route`),
  KEY `FK_BUS_ROUTE` (`bus_route`),
  CONSTRAINT `FK_BUS_ROUTE` FOREIGN KEY (`bus_route`) REFERENCES `route_info` (`route_id`),
  CONSTRAINT `CHK_AC_SLEEPER` CHECK (((`bus_ac` in (0,1)) and (`bus_sleeper` in (0,1))))
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus_info`
--

LOCK TABLES `bus_info` WRITE;
/*!40000 ALTER TABLE `bus_info` DISABLE KEYS */;
INSERT INTO `bus_info` VALUES (1,'IntrCity SmartBus',1,1,1,1800),(2,'A1 Travels',1,1,1,1600),(4,'A1 Travel',1,0,1,900),(5,'Krish Travels',1,0,1,890),(7,'IntrCitySmartBus',1,1,0,960),(10,'A1travels',1,1,0,960),(11,'Krish Travels1',1,0,0,700),(12,'Soumya Tours and Travels',1,0,0,600),(13,'A1 Travels11',6,1,1,1550),(14,'SST LIMOLINER',6,1,1,1400),(15,'Krish Travels',6,0,1,950),(16,'A1 Travels',6,0,1,890),(18,'A1 Travels1',6,1,0,860),(19,'SST LIMOLINER1',6,1,0,900),(20,'Krish Travels1',6,0,0,600),(21,'A1 Travel61',6,0,0,660),(22,'IntrCity SmartBus',7,1,1,1340),(23,'SERA TRAVELS',7,1,1,1449),(24,'Soumya Tours and Travels',7,0,1,649),(25,'KKN Travels',7,0,1,1000),(26,'IntrCity SmartBus7',7,1,0,886),(27,'SERA TRAVELS7',7,1,0,1049),(29,'Soumya Tours and Travels7',7,0,0,449),(30,'KKN Travels7',7,0,0,800),(31,'InterCity smartbus',2,1,1,1386),(32,'A1 Travels',2,1,1,1306),(33,'Soumya Tours and Travels',2,0,1,790),(34,'A1 Travels2',2,1,0,915),(35,'InterCity smartbus2',2,1,0,966),(36,'Soumya Tours and Travels2',2,0,0,549),(37,'V V BUS TRANSPORT2',2,0,0,700),(38,'RAVINA TRAVELS',8,1,1,2399),(39,'SR Tours and Travels',8,1,1,2397),(40,'YAS TOURS AND TRAVELS',8,1,1,2900),(41,'VHB Travels',8,1,1,2440),(42,'RAVINA TRAVELS8',8,1,0,1699),(43,'VHB Travels',3,1,1,1950),(44,'Swamy Ayyappa Travels',3,1,1,2905),(45,'SR Tours and Travels',3,1,1,2397),(46,'RAVINA TRAVELS',3,1,1,2090),(47,'RAVINA TRAVELS',4,1,1,3180),(48,'RAVINA TRAVEL4',4,1,1,3670),(49,'RAVINA TRAVELS9',9,1,1,3199),(50,'RAVINA TRAVELS',9,1,1,3599),(51,'RAVINA TRAVEL9',9,1,1,3780),(52,'KMRL KALAIMKAL',11,1,1,960),(53,'KMRL KALAIMKAL11',11,1,0,740),(54,'InterCitySmartBus',11,1,1,1070),(55,'SPS Travels',11,1,0,538),(56,'SRS Travels',11,0,0,480),(57,'V Kaveri Travels',12,1,1,1990),(58,'Sri Krishna Travels',12,1,1,2650),(59,'InterCitySmaryBus',12,1,0,1039),(60,'Orange Tours and Travels',12,0,0,1050),(61,'Orange Tours and Travels1',12,0,0,1430),(62,'LimoLiner',12,1,1,2200),(63,'LimoLiner',13,1,1,3499),(64,'RAVINA TRAVELS',17,1,1,3299),(65,'RAVINA TRAVELS17',17,1,1,3099),(66,'V2K Travels',15,1,1,1099),(67,'GRS Travels',15,1,1,897),(68,'Jabbar Travels',15,0,1,790),(69,'Jabbar Travels1',15,0,0,450),(70,'Jabbar Tarvels5',15,1,0,690),(71,'RKK Travels',15,1,0,645),(72,'V Kaveri Travels',16,1,1,3500),(73,'Sri Krishna Travels',16,1,1,3450),(74,'SLimoLiner',16,1,1,3650),(75,'InterCitySmaryBus',16,1,0,1950),(76,'Orange Tours and Travels',16,0,0,1500),(77,'Orange Tours and Travels6',16,0,1,2300),(78,'KSM RoadWays',19,1,1,2499),(79,'CMR Express',19,1,1,1690),(80,'BSR Tours and Travels',19,1,1,2180),(81,'November Travels',19,1,0,1640),(82,'Jabbar Travels',19,0,0,825),(83,'KGN India',19,0,1,1099),(84,'KSM Travels',22,1,1,2499),(85,'VSR Tours and Travles',22,1,1,2280),(86,'November Travels',22,1,0,1649),(87,'Bharathi Travels',22,0,0,1500),(88,'Bharathi Travels2',22,0,1,1800),(89,'Kaleswari Travels',22,1,0,1900),(90,'Manish Travels',20,1,1,3100),(91,'Gujarath Travels',20,1,1,2460),(92,'Jai Bajaranga Travels',20,1,1,2800),(93,'BR TRAVELS',20,1,1,4500),(94,'MR Travels',20,1,1,3810),(95,'Sri Durgamba Travels',20,0,1,2360),(96,'Jai Bajaranga Travels1',20,1,0,3500),(97,'BR TRAVELS1',20,1,0,3333),(99,'Sri Durgamba Travels',23,1,1,2100),(100,'Ravina Travels',23,1,1,3800),(101,'National Travels',23,1,1,3800),(102,'Barathi Travels',23,1,1,2900),(103,'SRS Travels',23,1,0,2400),(104,'Anand Travels',23,0,1,1900),(105,'Sangita Travels',25,1,1,2500),(106,'Indian Express',25,1,1,2999),(107,'Orange Tours and Travels',25,0,1,1300),(108,'Tanaaz Travels',25,0,0,1099),(109,'Jabbar Tavels',25,0,0,980),(110,'Jabbar Tavels2',25,0,1,1240),(111,'New Amar Travels',25,1,0,2375),(112,'Shre Ganesh Travels',25,1,0,2000),(113,'LIMOLINER',27,1,1,2400),(114,'Jaguwar KGN Travels',27,1,1,2580),(115,'Citizen Tours and Travels',27,0,1,1600),(116,'Citizen Tours and Travels1',27,0,0,1450),(117,'Citizen Tours and Travels2',27,0,1,1900),(118,'Jabbar Travels',27,0,0,1300),(119,'Orange Tours and Travels',27,0,0,1150),(120,'Orange Tours and Travels2',27,0,1,1490),(121,'Fat Track Tours and Travels',26,0,0,3200),(123,'Fat Track Tours and Travels1',26,0,0,3200);
/*!40000 ALTER TABLE `bus_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_travel_info`
--

DROP TABLE IF EXISTS `car_travel_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car_travel_info` (
  `car_id` int NOT NULL AUTO_INCREMENT,
  `car_name` varchar(255) NOT NULL,
  `car_route` int NOT NULL,
  `car_price` int NOT NULL,
  PRIMARY KEY (`car_id`),
  UNIQUE KEY `UQ_CAR` (`car_name`,`car_route`),
  KEY `FK_CAR_ROUTE` (`car_route`),
  CONSTRAINT `FK_CAR_ROUTE` FOREIGN KEY (`car_route`) REFERENCES `route_info` (`route_id`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_travel_info`
--

LOCK TABLES `car_travel_info` WRITE;
/*!40000 ALTER TABLE `car_travel_info` DISABLE KEYS */;
INSERT INTO `car_travel_info` VALUES (1,'asdf',1,123),(7,'asdf',3,123),(8,'asdf',2,123),(9,'asdf2',2,123),(11,'asdf1',2,123223),(12,'Go Intercity',1,10476),(13,'Sedan Intercity',1,11672),(14,'Hatchback',1,9085),(15,'Sedan',1,10793),(16,'Etios',1,10758),(17,'Go Intercity',6,10476),(18,'Sedan Intercity',6,11672),(19,'Hatchback',6,9085),(20,'Sedan',6,10793),(21,'Etios',6,10758),(23,'Go Intercity',2,10494),(24,'Sedan Intercity',2,10123),(25,'Dzire',2,7521),(27,'Indica',2,6322),(28,'Wagon R',2,6817),(29,'Go Intercity',7,10494),(31,'Sedan Intercity',7,10123),(32,'Dzire',7,7521),(33,'Indica',7,6322),(34,'Wagon R',7,6817),(35,'Wagon R',3,17885),(37,'Etios',3,17944),(38,'Swift',3,16568),(39,'Celerio',3,17905),(40,'Wagon R',8,17885),(42,'Etios',8,17944),(44,'Swift',8,16568),(45,'Celerio',8,17905),(46,'Indica',4,30204),(47,'Dzire',4,31416),(48,'Ertiga',4,34451),(49,'AHA ECONOMY',4,35549),(50,'Indica',9,30204),(51,'Dzire',9,31416),(52,'Ertiga',9,34451),(53,'AHA ECONOMY',9,35549),(54,'Indica',5,53478),(55,'Dzire',5,63316),(56,'Indica',10,53478),(57,'Dzire',10,63316),(58,'Go Intercity',11,5735),(59,'Sedan Intercity',11,5930),(60,'XL Intercity',11,9598),(61,'Dzire',13,22796),(63,'Ertiga',13,37443),(64,'Indica',14,35102),(65,'Dzire',14,35160),(66,'Ertiga',14,43308),(67,'Innova',14,57983),(68,'Dzire',15,26819),(69,'Ertiga',15,39312),(70,'Innova',15,46800),(71,'Dzire',20,18113),(72,'Ertiga',20,25918),(73,'Innova',20,26436),(74,'Dzire',21,26819),(75,'Ertiga',21,39312),(76,'Innova',21,46800),(77,'Dzire',17,21392),(78,'Ertiga',17,24400),(79,'Innova Crysta',17,81223),(80,'Dzire',23,25024),(81,'Ertiga',23,35360),(82,'Innova ',23,42456),(83,'Dzire',29,32713),(84,'Ertiga',29,49313),(85,'Innova',29,54328),(86,'Dzire',18,25421),(87,'Ertiga',18,30843),(88,'Innova',18,73376),(89,'Dzire',24,36988),(90,'Ertiga',24,47192),(91,'Innova',24,53795),(92,'Dzire',30,36619),(93,'Ertiga',30,49313),(94,'Innova',30,82138),(95,'Indica',12,11223),(96,'Dzire',12,11281),(97,'Ertiga',12,16266),(98,'Innova',12,17948),(100,'Dzire',16,11192),(101,'Ertiga',16,14975),(102,'Innova',16,16511),(103,'Dzire',27,12976),(104,'Ertiga',27,16954),(105,'Innova',27,25123),(106,'Dzire',25,12976),(107,'Ertiga',25,17650),(108,'Innova Crysta',25,21152),(109,'Indica',22,7626),(110,'Dzire',22,9608),(111,'Ertiga',22,10081),(112,'Innova',22,15023),(113,'Dzire',19,9323),(114,'Ertiga',19,12179),(115,'Innova',19,12317),(116,'Dzire',28,24630),(117,'Ertiga',28,35448),(118,'Innova',28,59260),(119,'Dzire',26,24630),(120,'Ertiga',26,35448),(121,'Innova',26,41507);
/*!40000 ALTER TABLE `car_travel_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `city_id` int NOT NULL AUTO_INCREMENT,
  `city_name` varchar(255) NOT NULL,
  PRIMARY KEY (`city_id`),
  UNIQUE KEY `city_name` (`city_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (3,'Bangalore'),(2,'Chennai'),(1,'Coimbatore'),(4,'Hyderabad'),(6,'Kolkata'),(5,'Mumbai');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_info`
--

DROP TABLE IF EXISTS `employee_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_info` (
  `emp_id` int NOT NULL AUTO_INCREMENT,
  `emp_email` varchar(255) NOT NULL,
  `emp_password` varchar(255) NOT NULL,
  `emp_name` varchar(255) NOT NULL,
  `emp_gender` char(1) DEFAULT NULL,
  `emp_status` char(1) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  PRIMARY KEY (`emp_id`),
  UNIQUE KEY `emp_email` (`emp_email`),
  CONSTRAINT `CHK_STATUS` CHECK (((`emp_status` = _utf8mb4'0') or (`emp_status` = _utf8mb4'1') or (`emp_status` = _utf8mb4'2') or (`emp_status` = _utf8mb4'3')))
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_info`
--

LOCK TABLES `employee_info` WRITE;
/*!40000 ALTER TABLE `employee_info` DISABLE KEYS */;
INSERT INTO `employee_info` VALUES (1,'root','f3885f9cb664228f06675c7e8caf083c96c33118f5b73a6b23a06fedb195ff42','root','M','1','chennai','Tamilnadu','800'),(2,'approver','f3885f9cb664228f06675c7e8caf083c96c33118f5b73a6b23a06fedb195ff42','approver','M','1','chennai','Tamilnadu','800'),(3,'admin','f3885f9cb664228f06675c7e8caf083c96c33118f5b73a6b23a06fedb195ff42','admin','M','1','chennai','Tamilnadu','800'),(4,'approve','f3885f9cb664228f06675c7e8caf083c96c33118f5b73a6b23a06fedb195ff42','admin','M','2','chennai','Tamilnadu','800'),(5,'a@g.co','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','sajith','M','1','chennai','TN','1233333333'),(6,'12@sadf.c','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','adf','M','2','chennai','','1233333333'),(9,'1s2@sadf.c','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','adfa','M','2','chennai','','1233333333'),(10,'1sd2@sadf.c','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','adfa','M','2','chennai','','1233333333'),(11,'crazygenius07@gmail.com','e3c8f5976101bd22b29eb89c93c37056cb52edd0825c6ec134abdb0694a9f207','GURUPRASATH M','M','1','CHENNAI','Andhra Pradesh','8667315757'),(12,'1a2@d.co','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','roots','M','1','a','ad','1233333333'),(13,'saisajith03@gmail.com','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','SajithTheApplicant','M','1','Coimbatore','Tamil Nadu','6379132066'),(14,'rewards000333@gmail.com','e3c8f5976101bd22b29eb89c93c37056cb52edd0825c6ec134abdb0694a9f207','guru','M','1','CHENNAI','Tamil Nadu','8667315757'),(15,'gmahes.maheswaran1@gmail.com','e3c8f5976101bd22b29eb89c93c37056cb52edd0825c6ec134abdb0694a9f207','Maheswaran','M','1','CHENNAI','Tamil Nadu','8667315757'),(16,'anshika.mishra@sap.com','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Anshika','F','1','Coimbatore','Tamil Nadu','6379132066'),(17,'guruprasathmaheswaran.07@gmail.com','e3c8f5976101bd22b29eb89c93c37056cb52edd0825c6ec134abdb0694a9f207','Guru','M','1','CHENNAI','Tamil Nadu','8667315757'),(18,'isajithrajan@gmail.com','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Sajith','M','1','Coimbatore','Tamil Nadu','8999999999'),(19,'penson003@gmail.com','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Sajith','M','1','Coimbatore','Tamil Nadu','6379132066'),(20,'cb.en.u4cse21052@cb.students.amrita.edu','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f','Sajith','M','1','Coimbatore','Tamil Nadu','6379132066'),(21,'tripestimator07@gmail.com','e3c8f5976101bd22b29eb89c93c37056cb52edd0825c6ec134abdb0694a9f207','Employee','M','2','chennai','tamilnadu','8667315757'),(22,'tripestimator01@gmail.com','e3c8f5976101bd22b29eb89c93c37056cb52edd0825c6ec134abdb0694a9f207','Employee','M','1','Chennai','Tamilnadu','8667315757'),(23,'purushothaman099@gmail.com','e3c8f5976101bd22b29eb89c93c37056cb52edd0825c6ec134abdb0694a9f207','purushothaman','M','1','Chennai','Tamilnadu','8667315757');
/*!40000 ALTER TABLE `employee_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flight_info`
--

DROP TABLE IF EXISTS `flight_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flight_info` (
  `flight_id` int NOT NULL AUTO_INCREMENT,
  `flight_name` varchar(255) NOT NULL,
  `flight_route` int NOT NULL,
  `flight_economy_price` int DEFAULT NULL,
  `flight_premium_price` int DEFAULT NULL,
  `flight_business_class_price` int DEFAULT NULL,
  PRIMARY KEY (`flight_id`),
  UNIQUE KEY `UQ_FLIGHT` (`flight_name`,`flight_route`),
  KEY `FK_ROUTE_ID` (`flight_route`),
  CONSTRAINT `FK_ROUTE_ID` FOREIGN KEY (`flight_route`) REFERENCES `route_info` (`route_id`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flight_info`
--

LOCK TABLES `flight_info` WRITE;
/*!40000 ALTER TABLE `flight_info` DISABLE KEYS */;
INSERT INTO `flight_info` VALUES (1,'Indigo',1,3852,4325,8210),(2,'Air India',1,3799,5325,18659),(3,'Vistara',1,8416,11731,48585),(4,'AirAsia India',1,7633,9800,15980),(5,'AirAsia India',6,7265,11940,49381),(6,'Vistara',6,8347,11865,49081),(7,'Indigo',6,6575,12950,45099),(8,'Air India',6,6694,12760,45630),(9,'Air India',2,7604,14320,23970),(10,'Vistara',2,6487,8106,11834),(11,'Indigo',2,8585,15392,53446),(12,'AirAsia India',2,6914,9930,14300),(13,'AirAsia India',7,7354,11940,46740),(14,'Air India',7,15121,26911,67027),(15,'Vistara',7,8284,11870,46015),(16,'Indigo',7,7541,14670,55092),(17,'Indigo',3,5269,7579,11254),(18,'Air India',3,7222,34563,37755),(19,'Vistara',3,7788,11519,43377),(20,'AirAsia India',3,10260,15903,23780),(21,'AirAsia India',8,4469,11541,42337),(22,'Vistara',8,8147,11480,43230),(23,'Indigo',8,5565,15790,39200),(24,'Air India',8,7303,16625,44934),(25,'Air India',5,8673,11310,30315),(26,'Vistara',5,10623,14474,62473),(27,'Indigo',5,9831,10356,14031),(28,'AirAsia India',5,7823,15733,23025),(29,'AirAsia India',10,9920,15637,58065),(30,'Air India',10,16988,33780,56725),(31,'Vistara',10,25467,32970,54920),(32,'Indigo',10,10950,16720,48699),(33,'Indigo',4,3543,4016,8215),(34,'Vistara',4,3851,6255,20256),(35,'AirAsia India',4,3707,5795,17011),(36,'Air India',4,3769,5879,10560),(37,'Air India',9,4153,8202,14954),(38,'Indigo',9,4817,5080,9279),(39,'Vistara',9,4250,6699,23961),(40,'AirAsia India',9,4220,6269,25236),(41,'AirAsia India',11,3420,6789,19560),(42,'Indigo',11,1962,2277,6162),(43,'Vistara',11,3500,9715,22107),(44,'Air India',11,1969,6494,18715),(45,'Air India',15,1868,6676,18897),(46,'Vistara',15,3282,10911,19730),(47,'AirAsia India',15,2862,5490,9785),(48,'Indigo',15,1882,2197,6082),(49,'Indigo',12,2660,3212,7018),(50,'Air India',12,3374,7647,19799),(51,'Vistara',12,8733,11613,22423),(52,'AirAsia India',12,4585,6799,9599),(53,'AirAsia India',16,3565,5679,11435),(54,'Vistara',16,4785,7785,13665),(55,'Indigo',16,2543,3094,6900),(56,'Air India',16,2797,5045,8761),(57,'Air India',14,6814,17526,30999),(58,'Indigo',14,6582,7133,10940),(59,'Vistara',14,8495,14550,23676),(60,'AirAsia India',14,7893,15740,20920),(61,'AirAsia India',18,6052,9730,14699),(62,'Vistara',18,8603,10703,15273),(63,'Indigo',18,6122,7408,11215),(64,'Air India',18,7037,11099,15274),(65,'Air India',13,5326,7838,23809),(66,'Indigo',13,4163,5392,9067),(67,'Vistara',13,5297,7731,15016),(68,'AirAsia India',13,6743,7922,16789),(69,'AirAsia India',19,5670,8660,14937),(70,'Indigo',19,3352,4035,7710),(71,'Air India',19,4151,7236,16229),(72,'Vistara',19,3778,5301,11133),(74,'AirAsia India',17,3895,756,12580),(75,'Vistara',17,4948,6471,12787),(76,'Indigo',17,3788,5135,8810),(77,'Air India',17,5185,7489,23460),(78,'Vistara',22,3666,5458,13173),(79,'AirAsia India',22,4205,7116,15625),(80,'Indigo',22,3357,4040,7715),(81,'Air India',22,3549,7472,16465),(82,'Indigo',21,6332,7015,10690),(83,'Air India',21,9668,14510,19701),(84,'Vistara',21,6608,10915,15762),(85,'AirAsia India',21,7665,12999,16957),(86,'Vistara',24,6701,9216,21990),(87,'AirAsia India',24,7548,10539,16450),(88,'Indigo',24,6122,7225,10900),(89,'Air India',24,9540,12250,21642),(90,'Indigo',20,4205,4598,8405),(91,'Air India',20,5012,7348,21191),(92,'Vistara',20,3799,5636,12447),(93,'AirAsia India',20,4850,8630,17895),(95,'Vistara',23,3790,6257,18427),(96,'AirAsia India',23,3400,5695,15872),(97,'Indigo',23,3260,3785,7460),(98,'Air India',23,4061,7367,20660),(99,'Indigo',26,5210,5892,9567),(100,'Air India',26,10556,12652,15665),(101,'Vistara',26,9288,12139,17781),(102,'AirAsia India',26,8293,10550,13110),(103,'Vistara',28,9594,13883,18786),(104,'AirAsia India',28,5989,9342,17890),(105,'Indigo',28,5125,5807,9482),(106,'Air India',28,9514,11504,12586),(107,'Indigo',25,3370,4060,8050),(108,'Air India',25,4112,7558,11616),(109,'Vistara',25,3799,6335,9656),(110,'AirAsia India',25,4511,9500,16259),(111,'Vistara',27,3790,6257,9970),(112,'AirAsia India',27,4231,7891,10326),(113,'Indigo',27,3549,4160,8150),(114,'Air India',27,3600,8053,11662),(115,'Indigo',29,6460,7520,11327),(116,'Air India',29,5908,7461,12020),(117,'Vistara',29,6700,12549,17973),(118,'AirAsia India',29,6585,9830,15600),(119,'Vistara',30,7335,10852,15746),(120,'AirAsia India',30,5700,9641,13654),(121,'Indigo',30,5366,6516,10332),(122,'Air India',30,6268,9775,1230);
/*!40000 ALTER TABLE `flight_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_info`
--

DROP TABLE IF EXISTS `food_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_info` (
  `food_expense_id` int NOT NULL AUTO_INCREMENT,
  `food_expense_city` int NOT NULL,
  `food_price_veg` int NOT NULL,
  `food_price_nonveg` int NOT NULL,
  PRIMARY KEY (`food_expense_id`),
  KEY `FK_FOOD_CITY` (`food_expense_city`),
  CONSTRAINT `FK_FOOD_CITY` FOREIGN KEY (`food_expense_city`) REFERENCES `cities` (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_info`
--

LOCK TABLES `food_info` WRITE;
/*!40000 ALTER TABLE `food_info` DISABLE KEYS */;
INSERT INTO `food_info` VALUES (1,1,900,1300),(2,2,1100,1500),(3,3,1300,1700),(4,4,1100,1600),(5,5,1300,1900),(6,6,1200,1750);
/*!40000 ALTER TABLE `food_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotel_info`
--

DROP TABLE IF EXISTS `hotel_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotel_info` (
  `hotel_id` int NOT NULL AUTO_INCREMENT,
  `hotel_name` varchar(255) NOT NULL,
  `hotel_address` varchar(255) NOT NULL,
  `hotel_city` int NOT NULL,
  `hotel_rating` int NOT NULL,
  `hotel_standard_price` int NOT NULL,
  `hotel_deluxe_price` int NOT NULL,
  `hotel_suite_price` int NOT NULL,
  PRIMARY KEY (`hotel_id`),
  UNIQUE KEY `UQ_HOTEL` (`hotel_name`,`hotel_address`),
  KEY `FK_HOTEL_CITY` (`hotel_city`),
  CONSTRAINT `FK_HOTEL_CITY` FOREIGN KEY (`hotel_city`) REFERENCES `cities` (`city_id`),
  CONSTRAINT `CHK_RATING` CHECK ((`hotel_rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=158 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotel_info`
--

LOCK TABLES `hotel_info` WRITE;
/*!40000 ALTER TABLE `hotel_info` DISABLE KEYS */;
INSERT INTO `hotel_info` VALUES (1,'Radhe Suits','Hitech City,Hyderabad,500081',4,4,2800,3700,7400),(2,'Treebo Trend The Rise','Hitech City,Hyderabad,500081',4,3,2766,4599,6549),(3,'Hotel_V','Hitech City,Hyderabad,500081',4,4,3789,5980,10200),(4,'Wild wings premium hotel','Gachibowli,Hyderabad,500032',4,3,2799,3500,7980),(5,'SwanSuites,Gachibowli','Gachibowli,Hyderabad,500032',4,4,3470,4800,8700),(6,'Palladium Luxury Suites','Gachibowli,Hyderabad,500032',4,4,3500,4430,9835),(7,'The Balcany Hotel','Madhapur,Hyderabad,500081',4,5,2500,4800,9650),(9,'Western Suites','Madhapur,Hyderabad,500081',4,5,3700,5300,14600),(10,'Ashray-Vinatke Homes','Madhapur,Hyderabad,500081',4,3,2600,3500,6500),(11,'Flagship,New Kamakshi Hotel','Kukatpally,Hyderabad,500072',4,3,2072,3400,6900),(12,'Treebo Trend The Rise','Kukatpally,Hyderabad,500072',4,4,2120,3408,5900),(13,'AR stay INN','Kukatpally,Hyderabad,500072',4,4,2890,3780,8987),(15,'Brio Hotel','Salt Lake City',6,3,3976,4196,4472),(16,'FabHotel Candlewood Park','New Town',6,3,1997,2347,3850),(18,'Poiisse','Tangra',6,3,2413,2641,2874),(19,'The Fern Residency','Chinar Park',6,3,3330,4309,5070),(20,'Ritulvy','East Kolkata Township',6,3,2531,3055,3495),(21,'Ethnotel','Dum Dum',6,3,3211,3639,4211),(23,'Stayotel','Dum Dum',6,3,3014,4070,4976),(24,'The Maureen Kolkata','Baguiati',6,3,2526,2728,3166),(25,'Casa Broadway','Gariahat',6,3,1416,1876,2189),(26,'Park Prime Kolkata','Ballygunge',6,3,3092,3650,4797),(27,'The Astor','Park Street Area',6,4,5464,6093,6303),(28,'Lemon Tree Premier','New Town',6,4,2822,4291,7071),(29,'Airport City Hotel','Birati',6,4,3803,5071,7038),(30,'Golden Tulip Kolkata','Salt Lake City',6,4,3085,4639,5588),(31,'Kenilworth Hotel','Park Street Area',6,4,8211,9220,11821),(32,'Monotel Luxury Business Hotel ','Salt Lake City',6,4,3639,4060,4993),(34,'Fairfield by Marriott','New Town',6,4,5000,6500,8999),(35,'The Sonnet','Salt Lake City',6,4,3710,4637,4946),(36,'Hotel Senses','Salt Lake City',6,4,3240,3772,4568),(37,'Hotel Aauris','Park Street Area',6,4,3849,4619,5773),(38,'ITC Royal Bengal','Tangra',6,5,10925,15000,22500),(39,'Hyatt Regency','Salt Lake City',6,5,6440,10500,25950),(40,'The Altair','Salt Lake City',6,5,5232,5650,5971),(41,'The Park Kolkata','New Market Area',6,5,4945,5694,7858),(42,'Hotel Hindusthan International (HHI)','Bhowanipore',6,5,4658,5148,5450),(43,'JW Marriott Hotel Kolkata','Tangra',6,5,9500,12500,17450),(44,'Vivanta Kolkata, EM Bypass','East Kolkata Township',6,5,6500,7500,10500),(45,'Taj Bengal','Alipore',6,5,12000,14500,20400),(46,'The Oberoi Grand','New Market Area',6,5,10800,11700,14000),(47,'Pride Plaza Hotel','New Town',6,5,3000,5000,14180),(48,'AR Residency','T - Nagar',2,3,1686,1894,2066),(49,'Mount Kailash Suites','Mount road',2,3,1988,2388,2559),(50,'Olive Serviced Appartment','Perungudi',2,3,1591,1767,2139),(51,'Venture Park','Thoraipakkam',2,3,1262,1840,2178),(52,'UPAR','T - Nagar',2,3,1973,2100,2412),(53,'Ginger','Vadapalani',2,3,2132,2432,3243),(54,'Grand Cascade ','Poongavanapuram',2,3,2033,2660,3289),(55,'Mermaid Resorts & Banquets ','Kelambakkam',2,4,2139,3535,5793),(56,'Raaj Bhaavan Clarks Inn','Thoraipakkam',2,4,2292,3318,4656),(57,'Raj Park','Teynampet',2,4,2134,3374,4666),(58,'The Pride Hotel','Kilpauk',2,4,2399,3939,6500),(59,'Four Points by Sheraton','Sholinganallur',2,4,3099,4743,7184),(60,'Fairfield by Marriott','Mahindra World City',2,4,3270,5270,6875),(61,'Bloom Hub','Guindy',2,4,3185,4790,5869),(62,'Hyatt Regency','Teynampet',2,5,8499,9499,10498),(63,'Taj Club House','Royapettah',2,5,8000,10300,14000),(64,'The Park','Nungambakkam',2,5,7502,9129,11687),(65,'The Accord Metropolitan','T - Nagar',2,5,9275,11726,15059),(66,'Welcomhotel','Cathedral Road',2,5,9545,12333,15333),(67,'Holiday Inn','OMR',2,5,8766,10432,12682),(68,'Vivanta ','Sholinganallur',2,5,7583,9100,16083),(69,'Radisson Blu','Near Chennai Airport',2,5,9783,14290,18980),(70,'Trident','Meenambakkam',2,5,9750,15250,19000),(71,'Taj Coromandel','Nungambakkam',2,5,11590,16340,20457),(72,'Green Park ','Vadapalani',2,5,10642,16378,19378),(74,'The Altruist Business Hotel','Whitefield',3,3,2793,3163,4047),(76,'TS Royal Grand','Bommasandra',3,3,2185,2653,3901),(77,'Shivas Gateway','Near Bangalore Airport',3,3,2603,3067,4309),(78,'Sanctum Suites','Armane Nagar',3,3,2465,2635,2919),(79,'JP CORDIAL','Majestic',3,3,2511,2604,2883),(80,'FabHotel Prime Mayuri Residency ','Yadavanahalli',3,3,1988,2119,2660),(81,'Innistique by Inventrees','YadThanisandraavanahalli',3,3,2426,2798,3420),(82,'Hotel Urban Jade ','Indiranagar',3,3,2030,2328,2948),(83,'La Sara Gateway','Bommasandra',3,3,2041,2495,3024),(84,'FabExpress The Trinity Woods','Ulsoor',3,3,1476,1528,1666),(85,'Hotel Ramanashree Richmond Circle','Sampangi Rama Nagar',3,4,3255,4649,6349),(86,'Olive Serviced Apartments','HSR Layout',3,4,3170,3823,4705),(87,'Clarks Inn','Near Bangalore Airport',3,4,2754,4276,5627),(88,'Holiday Inn Express','Yeshwantpur',3,4,3950,4249,4799),(89,'Bloom Hotel','Brookefield',3,4,3850,4600,5000),(90,'Halcyon Hotel Residencies','Koramangala',3,4,2541,4662,6635),(91,'Kingston Hotel','Rajajinagar',3,4,3751,4130,5036),(92,'Ginger Bangalore','Domlur Layout',3,4,3399,4369,5239),(93,'Peninsula Suites','Whitefield',3,4,4524,5574,6699),(94,'The Fern Residency','Yeshwanthpur',3,4,4383,4762,5745),(95,'The Leela Bhartiya City','Tirumanahalli',3,5,11000,13750,22000),(96,'Sterlings mac Hotel','Kodihalli',3,5,7698,9531,17376),(97,'Hotel Royal Orchid','Domlur Layout',3,5,8460,10350,15500),(98,'Vivanta Bengaluru','Residency Road',3,5,10333,14333,16253),(99,'The Chancery Pavilion','Ashok Nagar',3,5,7812,9114,15810),(100,'Taj M G Road','Sivanchetti Gardens',3,5,9000,17000,25000),(101,'Oakwood Residence','Whitefield',3,5,9090,12574,18635),(102,'The Zuri','Whitefield',3,5,7383,10293,14093),(103,'HOTEL CHENTHUR PARK','Near Coimbatore Airport',1,3,2659,3191,4254),(104,'SBS Grand','Peelamedu',1,3,1842,2014,2804),(105,'Treebo Trend Vinayak Inn','Gopalapuram',1,3,2191,2462,3081),(106,'The Arcadia','Peelamedu',1,3,3201,3524,3890),(107,'Hotel Alankar Grande','Ram Nagar',1,3,2266,2434,2742),(108,'Ranis Grand','Near Coimbatore Train Station',1,3,1835,1977,2669),(109,'M.K Residency','Ram Nagar',1,3,2735,3009,3829),(110,'SPS GRAND INN','Ram Nagar',1,3,2061,2143,2800),(111,'Hotel CAG Pride','Siddhapudur',1,4,3128,3911,4536),(112,'Gokulam Park','Chinniyampalayam',1,4,4164,4414,5145),(115,'Zone Connect','Nehru Nagar West',1,4,2831,3167,3973),(116,'Lemon Tree Hotel','Kalapatti',1,4,3166,3767,5473),(117,'IKON','R.S. Puram',1,4,3812,4212,5400),(118,'Townhouse 1123 Four Season','Ram Nagar',1,4,1846,2216,3128),(119,'Hotel Vijay Elanza','Masakalipalayam',1,4,3537,4274,5011),(120,'Aafiya lakeviewapartments','Ramanathapuram',1,4,2602,3274,4023),(121,'Misty Hills Retreat','Periyanaickenpalayam',1,4,3129,3574,3723),(122,'RADISSON BLU','Peelamedu',1,5,8853,9853,12353),(123,'O By Tamara','Uppilipalayam',1,5,5474,6412,7818),(124,'Welcomhotel by ITC Hotels','Race Course',1,5,6696,7440,8444),(125,'The Residency Towers','Avinashi Road',1,5,8371,8951,9542),(126,'DARZA LUXURY RESORTS','Pannimadai',1,5,6972,9206,11150),(127,'Maayaa Riverside villas & Suites','Kuppakonam Pudur',1,5,8331,12706,16571),(128,'FabExpress Shubham Inn','SBI Bhaichand Textile',5,3,1979,2310,3160),(129,'Hotel Dhiman Residency','Shanti nagar',5,3,1542,2033,3369),(130,'Residency Hotel Fort ','Central Suburbs',5,3,1953,2450,3980),(131,'FabHotel RK International','Shanawaz Building',5,3,2367,2671,3485),(132,'Hotel Beverly Palace','Santacruz',5,3,2564,3208,4346),(133,'Hotel V.G','Asalpha Link Road',5,3,1702,2405,3220),(134,'The Cattleya','Saibaba Industrial Estate',5,3,2200,2700,3600),(135,'Hotel Imperial','Alibhai Premji Road',5,3,2374,3774,4042),(136,'Hotel Classio Andheri','DN Nagar Metro Station',5,3,2590,3600,4330),(137,'Zara Grand Hotel','Sakinaka Andheri',5,4,3440,3990,4733),(138,'Hotel Ariana Residency','Dhake Colony',5,4,3700,4414,5914),(139,'Hotel Kohinoor Continental','Kurla Road J B Nagar',5,4,4999,6370,7883),(140,'Residency Sarovar Portico','Goregaon West',5,4,4165,5850,6750),(141,'Hotel Suba International','Andheri East',5,4,4153,5586,6396),(142,'Bloom Hotel ','Juhu Tara Road',5,4,4499,5249,6874),(143,'The Resort','Aksa Beach',5,4,5697,6222,7077),(144,'Mirage Hotel','Andheri Kurla Raod',5,4,4790,6299,7799),(145,'Niranta Transit Hotel','Mumabi Airport',5,4,6068,7238,9363),(146,'Radisson Mumbai Goregaon','S.V. Road',5,4,6499,7890,8950),(147,'Radisson Blu','Marol Maroshi Road',5,4,12000,14500,18500),(148,'JW Marriott','Juhu Tara Road',5,4,16000,17700,21400),(149,'Courtyard by Marriott','Kurla Road',5,5,13200,14700,18800),(150,'Hyatt Centric','Juhu Tara Road',5,5,13000,16500,19000),(152,'Novotel','Mumbai International Airport',5,5,14899,16399,20899),(153,'Hilton','Mumbai International Airport',5,5,14900,16599,20150),(154,'The Westin','Powai',5,5,14500,16500,18500),(155,'Trident Nariman Point','Nariman Point',5,5,14250,16750,19000),(156,'Lemon Tree Premier','Mumbai International Airport',5,5,13983,16713,18393),(157,'Hotel Sahara Star','Mumbai Airport',5,5,15399,19200,21000);
/*!40000 ALTER TABLE `hotel_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `miscellaneous_info`
--

DROP TABLE IF EXISTS `miscellaneous_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `miscellaneous_info` (
  `miscellaneous_expense_id` int NOT NULL AUTO_INCREMENT,
  `miscellaneous_expense_city` int NOT NULL,
  `miscellaneous_price` int NOT NULL,
  PRIMARY KEY (`miscellaneous_expense_id`),
  KEY `FK_MISCELLANEOUS_CITY` (`miscellaneous_expense_city`),
  CONSTRAINT `FK_MISCELLANEOUS_CITY` FOREIGN KEY (`miscellaneous_expense_city`) REFERENCES `cities` (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `miscellaneous_info`
--

LOCK TABLES `miscellaneous_info` WRITE;
/*!40000 ALTER TABLE `miscellaneous_info` DISABLE KEYS */;
INSERT INTO `miscellaneous_info` VALUES (1,1,700),(2,2,800),(3,3,1000),(4,4,800),(5,5,1100),(6,6,800);
/*!40000 ALTER TABLE `miscellaneous_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `route_info`
--

DROP TABLE IF EXISTS `route_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `route_info` (
  `route_id` int NOT NULL AUTO_INCREMENT,
  `route_start_city` int NOT NULL,
  `route_end_city` int NOT NULL,
  PRIMARY KEY (`route_id`),
  KEY `FK_START_CITY` (`route_start_city`),
  KEY `FK_END_CITY` (`route_end_city`),
  CONSTRAINT `FK_END_CITY` FOREIGN KEY (`route_end_city`) REFERENCES `cities` (`city_id`),
  CONSTRAINT `FK_START_CITY` FOREIGN KEY (`route_start_city`) REFERENCES `cities` (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route_info`
--

LOCK TABLES `route_info` WRITE;
/*!40000 ALTER TABLE `route_info` DISABLE KEYS */;
INSERT INTO `route_info` VALUES (1,1,2),(2,1,3),(3,1,4),(4,1,5),(5,1,6),(6,2,1),(7,3,1),(8,4,1),(9,5,1),(10,6,1),(11,2,3),(12,2,4),(13,2,5),(14,2,6),(15,3,2),(16,4,2),(17,5,2),(18,6,2),(19,3,4),(20,3,5),(21,3,6),(22,4,3),(23,5,3),(24,6,3),(25,4,5),(26,4,6),(27,5,4),(28,6,4),(29,5,6),(30,6,5);
/*!40000 ALTER TABLE `route_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `train_info`
--

DROP TABLE IF EXISTS `train_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `train_info` (
  `train_id` int NOT NULL AUTO_INCREMENT,
  `train_name` varchar(255) NOT NULL,
  `train_route` int NOT NULL,
  `train_seater_price` int DEFAULT NULL,
  `train_sl_price` int DEFAULT NULL,
  `train_1a_price` int DEFAULT NULL,
  `train_2a_price` int DEFAULT NULL,
  `train_3a_price` int DEFAULT NULL,
  `train_ac_executive_price` int DEFAULT NULL,
  `train_ac_chair_price` int DEFAULT NULL,
  PRIMARY KEY (`train_id`),
  UNIQUE KEY `UQ_TRAIN` (`train_name`,`train_route`),
  KEY `FK_TRAIN_ROUTE` (`train_route`),
  CONSTRAINT `FK_TRAIN_ROUTE` FOREIGN KEY (`train_route`) REFERENCES `route_info` (`route_id`)
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `train_info`
--

LOCK TABLES `train_info` WRITE;
/*!40000 ALTER TABLE `train_info` DISABLE KEYS */;
INSERT INTO `train_info` VALUES (1,'Mas Vandebharat',1,NULL,NULL,NULL,NULL,NULL,1660,780),(2,'West Coast Exp',1,270,480,2865,1745,1270,NULL,NULL),(3,'Shatabdi Exp',1,NULL,NULL,NULL,NULL,NULL,1660,780),(4,'Nilagiri Exp',1,190,350,2015,1240,915,NULL,NULL),(5,'Cheran Express',1,175,325,1855,1135,835,NULL,NULL),(6,'TVC Chennai Exp',1,275,490,2910,1770,1285,NULL,NULL),(7,'Chennai Mail',1,275,490,2910,1770,1285,NULL,NULL),(8,'Chennai Express',1,265,475,2825,1720,1255,NULL,NULL),(9,'Mysuru Express',2,285,475,NULL,1785,1280,NULL,NULL),(10,'Band Humsafar',2,NULL,495,NULL,NULL,1335,NULL,NULL),(11,'BNC Vandebharat',2,NULL,NULL,NULL,NULL,NULL,1375,645),(12,'CBE LTT Exp',2,NULL,625,3890,2345,1670,NULL,NULL),(13,'Bangalore Exp',2,215,NULL,NULL,NULL,NULL,NULL,785),(15,'Yesvantpur Exp',2,220,370,NULL,1385,1000,NULL,NULL),(16,'CBE SBC Uday Exp',2,180,NULL,NULL,NULL,NULL,NULL,625),(17,'KCVL YPR AC Exp',2,NULL,NULL,2760,1680,1225,NULL,NULL),(18,'Sabari Express',3,375,640,3975,2395,1705,NULL,NULL),(19,'Rajkot Express',4,480,800,NULL,2995,2110,NULL,NULL),(20,'CBE LTT EXP',4,365,625,3890,2345,1670,NULL,NULL),(22,'Shalimar EXP',5,535,895,NULL,3270,2315,NULL,NULL),(23,'DBRG Vivek EXP',5,730,1185,NULL,4325,3015,NULL,NULL),(24,'Shatabdi Exp',6,NULL,NULL,NULL,NULL,NULL,1660,780),(25,'DHN Alappuzhae Exp',6,520,855,5335,3190,2245,NULL,NULL),(26,'MS Mangalore Exp',6,290,480,NULL,NULL,1290,NULL,NULL),(27,'Cheran Express',6,175,325,1855,1135,835,NULL,NULL),(29,'Nilagiri Exp',6,190,350,2015,1240,915,NULL,NULL),(30,'Alleppey Exp',6,240,430,2550,1560,1140,NULL,NULL),(31,'Mangalore Mail',6,265,475,2825,1720,1255,NULL,NULL),(32,'Trivandrum Mail',6,275,490,2910,1770,1285,NULL,NULL),(33,'Mangalore Exp',6,265,475,2825,1720,1255,NULL,NULL),(34,'Coimbatore Exp',6,190,NULL,NULL,NULL,NULL,NULL,685),(35,'CBE Vandebharat',6,NULL,NULL,NULL,NULL,NULL,1660,780),(36,'Kanyakumari Exp',7,265,465,2870,1745,1255,NULL,NULL),(37,'CBE Vande Bharat',7,NULL,NULL,NULL,NULL,NULL,1375,645),(39,'SBC CBE Uday Exp',7,180,NULL,NULL,NULL,NULL,NULL,625),(40,'Kochuveli Exp',7,285,475,NULL,1785,1280,NULL,NULL),(41,'KCVL Humsafar',7,NULL,495,NULL,NULL,1335,NULL,NULL),(42,'YPR Cannanore Exp',7,220,370,NULL,1385,1000,NULL,NULL),(43,'Coimbatore Exp',7,365,625,3890,2345,1670,NULL,NULL),(44,'KCG MAQ Exp',8,385,665,4010,2415,1735,NULL,NULL),(45,'Sabari Exp',8,375,640,3975,2395,1705,NULL,NULL),(47,'Coimbatore Exp',9,365,625,3890,2345,1670,NULL,NULL),(49,'DRBG Cape Spl',10,730,1185,NULL,NULL,3015,NULL,NULL),(51,'MYS VANDEBHARAT',11,NULL,NULL,NULL,NULL,NULL,1885,995),(54,'SHATABDI EXP ',11,NULL,NULL,NULL,NULL,NULL,1525,760),(55,'SANGHA MITRA  EXP ',11,140,255,1435,885,660,NULL,NULL),(57,'JSME SMVT EXP ',11,140,255,1435,885,NULL,NULL,NULL),(58,'KAVERI EXPRESS  ',11,160,295,1780,1085,785,NULL,NULL),(59,'BANGALORE MAIL   ',11,145,265,1490,920,680,NULL,NULL),(60,'YESVANTPUR EXP',11,145,265,1490,920,680,NULL,NULL),(61,'HYDERABAD EXP',12,230,420,2460,1500,1100,NULL,NULL),(62,'CHARMINAR EXP',12,250,455,2680,1635,1190,NULL,NULL),(63,'KACHEGUDA EXP',12,270,475,NULL,1770,1275,NULL,NULL),(64,'MAS NSL EXP',12,340,585,NULL,2190,1565,NULL,NULL),(65,'MUMBAI MAIL',13,340,595,NULL,2160,1560,NULL,NULL),(66,'MUMBAI EXPRESS',13,340,595,NULL,2160,NULL,NULL,NULL),(67,'CHENNAI LTT EXP',13,340,590,NULL,2140,1540,NULL,NULL),(68,'MAS EKNR SF EXP',13,420,710,NULL,2595,1860,NULL,NULL),(69,'MUZAFFARPUR EXP ',14,540,890,5560,3325,2330,NULL,NULL),(70,'COROMANDEL EXP ',14,410,695,4225,2545,1825,NULL,NULL),(71,'NEW TINSUKIA EXP ',14,660,1075,6600,3930,2745,NULL,NULL),(72,'HOWRAH MAIL  ',14,410,695,4225,2545,1825,NULL,NULL),(73,'HOWRAH EXPRESS  ',14,470,790,4820,2890,2065,NULL,NULL),(74,'MUZAFFARPUR EXP',15,540,890,5560,3325,2330,NULL,NULL),(75,'NEW TINSUKIA EXP',15,660,1075,6600,3930,2745,NULL,NULL),(76,'SHATABDI EXP',15,NULL,NULL,NULL,NULL,NULL,1345,635),(77,'CHENNAI EXPRESS',15,175,NULL,NULL,NULL,NULL,NULL,685),(78,'BAGMATI EXPRESS',15,595,975,5975,3570,2510,NULL,685),(79,'PATLIPUTRA EXP',15,550,910,5585,3335,2355,NULL,NULL),(80,'CHENNAI EXP',16,230,420,2460,1500,1100,NULL,NULL),(81,'NSL MAS WKLY EXP',16,340,585,NULL,2190,1565,NULL,NULL),(82,'KCG PDY EXPRESS',16,270,475,NULL,1770,1275,NULL,NULL),(83,'CHARMINAR EXP',16,250,455,2680,1635,1190,NULL,NULL),(84,'CHENNAI EXPRESS',17,340,590,NULL,2140,1540,NULL,NULL),(85,'LTT KARAIKAL EXP',17,390,660,NULL,2470,1760,NULL,NULL),(86,'LTT CHENNAI EXP',17,340,590,NULL,2140,1540,NULL,NULL),(88,'ADI CHENNAI EXP',17,420,715,NULL,2620,1875,NULL,NULL),(89,'EKNR MAS EXPRESS ',17,420,710,NULL,2595,1860,NULL,NULL),(90,'ADI TPJ SPECIAL ',17,470,780,NULL,2925,2070,NULL,NULL),(91,'CHENNAI MAIL  ',17,340,595,NULL,2160,1560,NULL,NULL),(93,'ARONAI EXPRESS',18,700,1140,NULL,4160,2900,NULL,NULL),(94,'JSME SMVT EXP',18,505,845,5160,3090,2195,NULL,NULL),(95,'NTSK SMVB EXPRESS',18,660,1075,6600,3930,2745,NULL,NULL),(96,'HWH TPJ EXPRESS',18,470,790,4820,2890,2065,NULL,NULL),(97,'MFP SMVB EXP',18,540,890,5560,3325,2330,NULL,NULL),(98,'HWH MAS EXP',18,410,695,4225,2545,1825,NULL,NULL),(99,'KACHEGUDA EXP',19,215,365,2230,1370,990,NULL,NULL),(100,'GORAKHPUR EXP',19,535,885,5410,3240,2290,NULL,NULL),(101,'WAINGANGA EXP',19,400,685,4140,2495,1790,NULL,NULL),(102,'YPR GORAKPUR EXP',19,535,885,5410,3240,2290,NULL,NULL),(103,'KCG VANDE BHARAT',19,NULL,NULL,NULL,NULL,NULL,1955,905),(104,'SC GARIB RATH',19,NULL,NULL,NULL,NULL,745,NULL,635),(105,'UDYAN EXP',20,305,530,3280,1990,1425,NULL,NULL),(107,'AJMER EXPRESS',20,485,810,5050,3025,2135,NULL,NULL),(108,'GARIB NAWAZ EXP',20,480,800,4995,2995,2110,NULL,NULL),(109,'SBC JODHPUR EXP',20,475,790,4935,2960,2095,NULL,NULL),(110,'JODHPUR EXPRESS',20,465,780,4855,2910,2060,NULL,NULL),(111,'ANGA EXPRESS',21,525,875,5330,3190,2260,NULL,NULL),(112,'DURONTO EXPRESS',21,845,NULL,5285,3200,2255,NULL,NULL),(114,'MUZAFFARPUR EXP',21,540,890,5560,3325,2330,NULL,NULL),(115,'NEW TINSUKIA EXP',21,660,1075,6600,3930,2745,NULL,NULL),(116,'SMVB JSME EXP',21,505,845,5160,3090,2195,NULL,NULL),(117,'JP MYSORE EXP',22,525,875,5355,3205,2270,NULL,NULL),(118,'JBP YPR SUP EXP',22,420,715,4355,2620,1875,NULL,NULL),(119,'WAINGANGA EXP',22,415,685,4140,2495,1790,NULL,NULL),(120,'GKP YPR EXPRESS',22,535,885,5410,3240,2290,NULL,NULL),(121,'BANGALORE EXP',22,240,435,2575,1575,1150,NULL,NULL),(122,'KCG YNK EXP',22,245,435,NULL,1635,1180,NULL,NULL),(123,'YPR VANDEBHARAT',22,NULL,NULL,NULL,NULL,NULL,1955,905),(124,'UDYAN EXPRESS',23,305,530,3280,1990,1425,NULL,NULL),(125,'COIMBATORE EXP',23,300,520,3195,1935,1385,NULL,NULL),(126,'JU SBC EXPRESS',23,480,795,4965,2975,2105,NULL,NULL),(127,'TRIVANDRAM EXP ',23,300,520,4965,1935,1385,NULL,NULL),(128,'HWH MUMBAI MAIL ',30,460,780,4745,2850,2035,NULL,NULL),(129,'HWH MUMBAI MAIL NIGHT ',30,485,820,4990,2990,2130,NULL,NULL),(130,'GITANJALI EXP ',30,460,780,4990,2850,2035,NULL,NULL),(131,'HWH CSMT EXPRES',30,460,780,NULL,2850,2035,NULL,NULL),(132,'HOWRAH MAIL ',29,460,780,4745,2850,2035,NULL,NULL),(133,'KOLKATA MAIL',29,485,820,4990,2990,2130,NULL,NULL),(134,'HOWRAH DURONTO ',29,NULL,NULL,5325,3215,2285,NULL,NULL),(135,'GITANJALI EXP ',29,460,780,NULL,2850,2035,NULL,NULL),(136,'CSMT HOWRAH EXP ',29,460,780,NULL,2850,2035,NULL,NULL),(137,'FALAKNUMA EXP ',28,385,665,4010,2415,1735,NULL,NULL),(138,'EAST COAST EXP ',28,380,645,NULL,2420,1720,NULL,NULL),(139,'AGTL SC SPECIAL',28,430,720,NULL,2700,1915,NULL,NULL),(140,'SHM SC WKLY EXP',28,390,670,NULL,2445,1755,NULL,NULL),(141,'BVC KAKINADA EX',27,315,550,3275,1985,1435,NULL,NULL),(142,'PBR SC SF EXP',27,200,370,2165,1330,975,NULL,NULL),(143,'DEVAGIRI EXP',27,250,445,2745,1675,1205,NULL,NULL),(145,'KONARK EXPRESS',27,335,575,NULL,2165,1545,NULL,NULL),(146,'HYDERABAD EXP',27,245,445,NULL,1595,1165,NULL,NULL),(147,'SC SHM AC EXP',26,NULL,NULL,3880,2340,1680,NULL,NULL),(148,'SC SHM WKLY EXP',26,375,640,NULL,2340,1680,NULL,NULL),(149,'EAST COAST EXP',26,360,610,NULL,2295,1635,NULL,NULL),(150,'FALAKNUMA EXP',26,385,665,4010,2415,1735,NULL,NULL),(151,'SC SCL SF EXP',26,445,750,4010,2750,1965,NULL,NULL),(152,'KONARK EXPRESS',25,260,460,1720,1240,1965,NULL,NULL),(153,'VSKP LTT EXPRESS',25,255,450,2790,1695,1220,NULL,NULL),(154,'DEVAGIRI EXP',25,250,445,2745,1675,1205,NULL,NULL),(155,'MUMBAI EXP',25,245,445,2745,1595,1165,NULL,NULL),(156,'HUSSAINSAGAR EX',25,245,445,NULL,1595,1165,NULL,NULL),(157,'HUSSAINSAGAR EX',24,510,850,5185,3105,2205,NULL,NULL),(158,'HWH MYS EXPRES',24,460,780,NULL,2850,2035,NULL,NULL),(159,'ANGA EXPRESS',24,440,745,4530,2725,1945,NULL,NULL),(160,'HWH SMVB AC EXP',24,NULL,NULL,4700,2825,2015,NULL,NULL),(162,'MFP SMVB EXP',24,430,730,4535,2725,1935,NULL,NULL),(163,'GIMB SBC EXPRESS',23,285,495,3065,1860,1335,NULL,NULL),(166,'BME YPR AC EXP ',23,NULL,NULL,3150,1910,1370,NULL,NULL);
/*!40000 ALTER TABLE `train_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trip_info`
--

DROP TABLE IF EXISTS `trip_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trip_info` (
  `trip_id` int NOT NULL AUTO_INCREMENT,
  `emp_id` int NOT NULL,
  `emp_email` varchar(255) NOT NULL,
  `start_city` int NOT NULL,
  `end_city` int NOT NULL,
  `travel_start_date` date NOT NULL,
  `travel_end_date` date NOT NULL,
  `transport_mode` varchar(255) NOT NULL,
  `transport_estimate` int NOT NULL,
  `transport_amount` int NOT NULL,
  `hotel_type` varchar(255) NOT NULL,
  `hotel_estimate` int NOT NULL,
  `hotel_amount` int NOT NULL,
  `food_estimate` int NOT NULL,
  `food_amount` int NOT NULL,
  `miscellaneous_estimate` int NOT NULL,
  `miscellaneous_amount` int NOT NULL,
  `total_estimate` int NOT NULL,
  `total_amount` int NOT NULL,
  `travel_reason` varchar(255) NOT NULL,
  `admin_message` varchar(255) DEFAULT NULL,
  `trip_status` int NOT NULL,
  `trip_estimate` int NOT NULL,
  `trip_amount` int NOT NULL,
  PRIMARY KEY (`trip_id`),
  KEY `FK_START_CITY2` (`start_city`),
  KEY `FK_END_CITY2` (`end_city`),
  KEY `FK_EMP_ID` (`emp_id`),
  CONSTRAINT `FK_EMP_ID` FOREIGN KEY (`emp_id`) REFERENCES `employee_info` (`emp_id`),
  CONSTRAINT `FK_END_CITY2` FOREIGN KEY (`end_city`) REFERENCES `cities` (`city_id`),
  CONSTRAINT `FK_START_CITY2` FOREIGN KEY (`start_city`) REFERENCES `cities` (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip_info`
--

LOCK TABLES `trip_info` WRITE;
/*!40000 ALTER TABLE `trip_info` DISABLE KEYS */;
INSERT INTO `trip_info` VALUES (1,13,'saisajith03@gmail.com',1,2,'2023-11-03','2023-11-03','Flight Economy',100,200,'Standard',100,200,100,200,100,200,400,800,'work','good',1,1200,2400),(2,13,'saisajith03@gmail.com',1,2,'2023-11-03','2023-11-03','Flight Economy',100,200,'Standard',100,200,100,200,100,200,400,800,'work','j',2,1200,2400),(3,13,'saisajith03@gmail.com',1,2,'2023-11-03','2023-11-03','Flight Economy',100,200,'Standard',100,200,100,200,100,200,400,1000,'work','modified',1,1200,2400),(4,13,'saisajith03@gmail.com',1,2,'2023-11-03','2023-11-03','Flight Economy',100,200,'Standard',100,200,100,200,100,200,400,800,'work','Safe journey',1,1200,2400),(5,13,'saisajith03@gmail.com',1,2,'2023-11-03','2023-11-03','Flight Economy',100,200,'Standard',100,200,100,200,100,200,400,1000,'work','Safe journey',1,1200,2400),(6,13,'saisajith03@gmail.com',1,2,'2023-11-03','2023-11-03','Flight Economy',100,200,'Standard',100,200,100,200,100,200,400,800,'work',NULL,0,1200,2400),(7,13,'saisajith03@gmail.com',1,2,'2023-11-03','2023-11-03','Flight Economy',100,200,'Standard',100,200,100,200,100,200,400,800,'work',NULL,0,1200,2400),(8,13,'saisajith03@gmail.com',1,2,'2023-11-03','2023-11-03','Flight Economy',100,200,'Standard',100,200,100,200,100,200,400,800,'work',NULL,0,1200,2400),(9,13,'saisajith03@gmail.com',1,5,'2024-04-08','2024-04-10','Flight - business',14010,14010,'4 - Deluxe',7609,7609,1300,1300,1100,1100,58047,58047,'jk',NULL,0,38029,38029),(10,11,'crazygenius07@gmail.com',1,5,'2024-04-08','2024-04-09','Train - 2A',2670,2670,'3 - Deluxe',2794,2794,1900,1900,1100,1100,16928,16928,'work',NULL,0,11134,11134),(11,14,'rewards000333@gmail.com',2,1,'2024-04-08','2024-04-09','Train - 3A',1277,1300,'3 - Deluxe',2594,2700,1300,1500,700,900,11742,12800,'client meeting','okayy',1,7148,7700),(12,15,'gmahes.maheswaran1@gmail.com',2,1,'2024-04-08','2024-04-11','Train - 2A',1762,1800,'3 - Deluxe',2594,2700,1300,1300,700,700,21900,22400,'client meeting','okayy',1,8118,8300),(13,13,'saisajith03@gmail.com',1,2,'2024-04-08','2024-04-09','Bus - noac_nosleeper',650,1000,'4 - Suite',5934,6000,1500,2000,800,1000,17768,18000,'Onsite','modified',1,9534,11000),(14,16,'anshika.mishra@sap.com',1,4,'2024-04-08','2024-04-10','Bus - ac_sleeper',2335,3000,'4 - Standard',3094,4000,1100,1500,800,1000,19652,25500,'ON SITE','Approved',1,9664,12500),(15,17,'guruprasathmaheswaran.07@gmail.com',1,3,'2024-04-08','2024-04-10','Train - 1A',3325,3325,'4 - Deluxe',4509,4700,1700,1900,1000,1000,28277,29450,'buisness trip','okayy',1,13859,14250),(16,18,'isajithrajan@gmail.com',1,5,'2024-04-09','2024-04-10','Bus - ac_sleeper',3425,4000,'4 - Deluxe',7609,8000,1900,2900,1100,1000,28068,31800,'On site','rejected',2,17459,19900),(17,19,'penson003@gmail.com',1,5,'2024-04-09','2024-04-10','Bus - ac_sleeper',3425,4000,'3 - Deluxe',2794,3000,1900,2000,1100,1000,18438,20000,'On site','safe journey',1,12644,14000),(18,20,'cb.en.u4cse21052@cb.students.amrita.edu',1,5,'2024-04-09','2024-04-10','Train - 3A',1890,2000,'4 - Standard',6334,5000,1900,2000,1100,1500,22448,21000,'on Site','Safe Journey',1,13114,12500),(19,22,'tripestimator01@gmail.com',1,2,'2024-04-09','2024-04-10','Train - 3A',1140,1300,'3 - Standard',1809,1900,1500,1500,800,1000,10498,11400,'Client Meeting','okayy',1,6389,7000),(20,23,'purushothaman099@gmail.com',2,1,'2024-04-09','2024-04-11','Train - 3A',1277,1400,'3 - Deluxe',2594,3000,1300,1500,700,1000,16336,19300,'buisness trip ','okayy',1,7148,8300);
/*!40000 ALTER TABLE `trip_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_register`
--

DROP TABLE IF EXISTS `user_register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_register` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userEmail` varchar(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `otp` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userEmail` (`userEmail`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_register`
--

LOCK TABLES `user_register` WRITE;
/*!40000 ALTER TABLE `user_register` DISABLE KEYS */;
INSERT INTO `user_register` VALUES (3,'kkdf','adf','525594',NULL),(5,'123@g.com','1','538827',NULL),(9,'ww','dddddd','124194','2024-04-06 04:14:27'),(10,'d','d','458976','2024-04-06 04:43:25');
/*!40000 ALTER TABLE `user_register` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-12 19:01:05
