-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: localhost    Database: casaboa
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.22.10.2

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
-- Table structure for table `Administrador`
--

DROP TABLE IF EXISTS `Administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Administrador` (
  `idAdministrador` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `data_admissao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idAdministrador`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `Administrador_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `Usuarios` (`idUsuario`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Administrador`
--

LOCK TABLES `Administrador` WRITE;
/*!40000 ALTER TABLE `Administrador` DISABLE KEYS */;
INSERT INTO `Administrador` VALUES (4,59,'2024-12-07 18:43:00');
/*!40000 ALTER TABLE `Administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Categorias`
--

DROP TABLE IF EXISTS `Categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categorias` (
  `idCategorias` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idCategorias`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categorias`
--

LOCK TABLES `Categorias` WRITE;
/*!40000 ALTER TABLE `Categorias` DISABLE KEYS */;
/*!40000 ALTER TABLE `Categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Clientes`
--

DROP TABLE IF EXISTS `Clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Clientes` (
  `idCliente` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int DEFAULT NULL,
  `dataNascimento` date DEFAULT NULL,
  `endereco` varchar(255) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idCliente`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `Clientes_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `Usuarios` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Clientes`
--

LOCK TABLES `Clientes` WRITE;
/*!40000 ALTER TABLE `Clientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `Clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Favoritos`
--

DROP TABLE IF EXISTS `Favoritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Favoritos` (
  `idFavorito` int NOT NULL AUTO_INCREMENT,
  `idCliente` int DEFAULT NULL,
  `idImovel` int DEFAULT NULL,
  PRIMARY KEY (`idFavorito`),
  KEY `idCliente` (`idCliente`),
  KEY `idImovel` (`idImovel`),
  CONSTRAINT `Favoritos_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `Clientes` (`idCliente`),
  CONSTRAINT `Favoritos_ibfk_2` FOREIGN KEY (`idImovel`) REFERENCES `Imoveis` (`idImovel`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Favoritos`
--

LOCK TABLES `Favoritos` WRITE;
/*!40000 ALTER TABLE `Favoritos` DISABLE KEYS */;
/*!40000 ALTER TABLE `Favoritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Imagens`
--

DROP TABLE IF EXISTS `Imagens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Imagens` (
  `idImagem` int NOT NULL AUTO_INCREMENT,
  `idImovel` int NOT NULL,
  `Caminho` varchar(225) NOT NULL,
  `Criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idImagem`),
  KEY `fk_imovel` (`idImovel`),
  CONSTRAINT `fk_imovel` FOREIGN KEY (`idImovel`) REFERENCES `Imoveis` (`idImovel`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Imagens`
--

LOCK TABLES `Imagens` WRITE;
/*!40000 ALTER TABLE `Imagens` DISABLE KEYS */;
/*!40000 ALTER TABLE `Imagens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Imoveis`
--

DROP TABLE IF EXISTS `Imoveis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Imoveis` (
  `idImovel` int NOT NULL AUTO_INCREMENT,
  `Descricao_previa` varchar(200) DEFAULT NULL,
  `idCategorias` int DEFAULT NULL,
  `Preco` decimal(10,2) DEFAULT NULL,
  `Endereco` varchar(255) DEFAULT NULL,
  `Criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `imagem_principal` longblob,
  `Descricao_detalhada` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`idImovel`),
  KEY `idCategorias` (`idCategorias`),
  CONSTRAINT `Imoveis_ibfk_1` FOREIGN KEY (`idCategorias`) REFERENCES `Categorias` (`idCategorias`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Imoveis`
--

LOCK TABLES `Imoveis` WRITE;
/*!40000 ALTER TABLE `Imoveis` DISABLE KEYS */;
/*!40000 ALTER TABLE `Imoveis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuarios`
--

DROP TABLE IF EXISTS `Usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuarios` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `senha` varchar(60) DEFAULT NULL,
  `tipo` enum('admin','cliente','vendedor') NOT NULL,
  `nome` varchar(50) NOT NULL,
  `dataCriacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuarios`
--

LOCK TABLES `Usuarios` WRITE;
/*!40000 ALTER TABLE `Usuarios` DISABLE KEYS */;
INSERT INTO `Usuarios` VALUES (59,'adm@educar.rs.gov.br','$2b$12$CI7L.D9inI7a1ZKBi2lHC.4zGD1m5qWtcLgTBO.gMFsoCH7yla7HG','admin','Nicolas','2024-12-07 18:42:23');
/*!40000 ALTER TABLE `Usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vendedores`
--

DROP TABLE IF EXISTS `Vendedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Vendedores` (
  `idVendedor` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `dataNascimento` date NOT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idVendedor`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `Vendedores_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `Usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vendedores`
--

LOCK TABLES `Vendedores` WRITE;
/*!40000 ALTER TABLE `Vendedores` DISABLE KEYS */;
/*!40000 ALTER TABLE `Vendedores` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-07 16:04:19
