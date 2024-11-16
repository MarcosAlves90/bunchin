-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 16/11/2024 às 21:35
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
  `n_registro` int(11) NOT NULL,
  `nome` varchar(40) NOT NULL,
  `email` varchar(50) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `cpf` varchar(11) NOT NULL,
  `funcao` varchar(40) NOT NULL,
  `cargo` varchar(40) NOT NULL,
  `departamento` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tb_funcionario`
--

INSERT INTO `tb_funcionario` (`n_registro`, `nome`, `email`, `senha`, `cpf`, `funcao`, `cargo`, `departamento`) VALUES
(1, 'Lyntter de Jesus Paiva', 'lyntter@gmail.com', '$2y$10$WQC7l/NMsq3id.axXoL4zeB9uMFbosrkPHB59.9NGvMxAPbIL5M.S', '12415251', 'administrador', 'auxiliar-administrativo', 'marketing'),
(3, 'Kolovol da Silva Paiva Junior J', 'kolovolpaiva@gmail.com', '$2y$10$ZaR9u484jQ5AQX.lfgP9n.rQ67l.iarOloAmS5ZpwVcrM50nLlwcm', '73956473892', 'administrador', 'gerente', 'financeiro'),
(4, 'Marcos Alves Lopes Paiva', 'marcoslopes@gmail.com', '$2y$10$vQXZXvfK5Z.ykBmAgJG3kOMyYz9vhSSZFu3tM2uzkemQNRMb5juZe', '75647856234', 'administrador', 'diretor', 'marketing'),
(5, 'Matheus Souza Paiva', 'matheus@gmail.com', '$2y$10$tjwhbUib0iRAMYu6zoeqRuDoO2Mj0WXNqZUuTPcuQji4yw23uvhN.', '86956478362', 'comum', 'estagiario', 'producao'),
(6, 'gaviota', 'gaviota@gmail.com', '$2y$10$H/GUIv9XivRkW7DPVmhwpO9yM1MjTjee65goP3Hf13Cgox2lrswqq', '212512', 'administrador', 'gerente', 'producao');

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
('26ad0267-d329-48b5-862d-52899f397ade', '12415251', 'Retorno', '2024-09-23T18:38:37.720Z'),
('3b8de248-a4d1-47ff-89c4-ae3ec2fdb88b', '12415251', 'Almoço', '2024-11-05T22:29:05.337Z'),
('6587dd37-61f2-4ce3-9bd7-f8d34d67204b', '12415251', 'Saída', '2024-11-05T22:29:06.505Z'),
('756d4315-cb5d-42d1-81aa-11a9864b6cc7', '12415251', 'Almoço', '2024-09-23T18:38:37.008Z'),
('79a08748-ad72-4c2c-a4c3-95eabd3a434c', '12415251', 'Entrada', '2024-11-05T22:29:04.177Z'),
('95f54e98-6194-4cc2-8319-e6ea8d0a82dd', '12415251', 'Retorno', '2024-11-05T22:29:05.913Z'),
('ab2458af-a540-4f27-a208-01fbe79224b5', '12415251', 'Saída', '2024-09-23T18:38:38.352Z'),
('d18cb737-9fd9-4b47-b71a-4929f3b547b3', '12415251', 'Entrada', '2024-09-23T18:38:35.896Z');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `tb_funcionario`
--
ALTER TABLE `tb_funcionario`
  ADD PRIMARY KEY (`n_registro`);

--
-- Índices de tabela `tb_ponto`
--
ALTER TABLE `tb_ponto`
  ADD PRIMARY KEY (`id_ponto`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tb_funcionario`
--
ALTER TABLE `tb_funcionario`
  MODIFY `n_registro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
