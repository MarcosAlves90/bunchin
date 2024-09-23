-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 23/09/2024 às 06:31
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `bunchin_bd`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_funcionario`
--

CREATE TABLE `tb_funcionario` (
  `n_registro` varchar(11) NOT NULL,
  `nome` varchar(40) NOT NULL,
  `email` varchar(50) NOT NULL,
  `senha` varchar(60) NOT NULL,
  `cpf` varchar(11) NOT NULL,
  `funcao` varchar(40) NOT NULL,
  `cargo` varchar(40) NOT NULL,
  `departamento` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tb_funcionario`
--

INSERT INTO `tb_funcionario` (`n_registro`, `nome`, `email`, `senha`, `cpf`, `funcao`, `cargo`, `departamento`) VALUES
('23523', 'lyntter', 'lyntter@gmail.com', 'lyntter', '12415251', 'administrador', 'auxiliar-administrativo', 'marketing');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_ponto`
--

CREATE TABLE `tb_ponto` (
  `id_ponto` varchar(36) NOT NULL,
  `funcionario_fk` varchar(11) NOT NULL,
  `nome_tipo` varchar(20) NOT NULL,
  `data_hora` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tb_ponto`
--

INSERT INTO `tb_ponto` (`id_ponto`, `funcionario_fk`, `nome_tipo`, `data_hora`) VALUES
('071c15ab-2535-417e-a653-4d8604153003', '12415251', 'Entrada', '2024-09-23T03:54:54.823Z'),
('25ca8cc3-cdee-4387-9ec1-18edb382b558', '12415251', 'Retorno', '2024-09-23T04:29:40.722Z'),
('500b6bd8-9745-49ac-b1bd-85b46bc9697a', '12415251', 'Saída', '2024-09-23T04:29:41.282Z'),
('f1965975-8549-4a05-bc9d-ea5e5c04c513', '12415251', 'Almoço', '2024-09-23T04:29:40.195Z');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `tb_funcionario`
--
ALTER TABLE `tb_funcionario`
  ADD PRIMARY KEY (`cpf`);

--
-- Índices de tabela `tb_ponto`
--
ALTER TABLE `tb_ponto`
  ADD PRIMARY KEY (`id_ponto`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
