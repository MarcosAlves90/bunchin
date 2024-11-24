-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 24/11/2024 às 04:47
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
  `departamento` varchar(30) NOT NULL,
  `status` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tb_funcionario`
--

INSERT INTO `tb_funcionario` (`n_registro`, `nome`, `email`, `senha`, `cpf`, `funcao`, `cargo`, `departamento`, `status`) VALUES
(1, 'Lyntter de Jesus Paiva', 'lyntter@gmail.com', '$2y$10$IKLPDSiuLDkvAhohKZci5.H3uQDCbrZtX7mtrSxusoo.DJgTNZFzm', '12415251', 'administrador', 'auxiliar-administrativo', 'marketing', '1'),
(3, 'Kolovol da Silva Paiva Junior JJ', 'kolovolpaiva@gmail.com', '$2y$10$ifHeTYanaGDlrVxYQERl0utN8krIK3YxMQY9k1KZBbvDNiC.DTuE2', '73956473892', 'administrador', 'gerente', 'financeiro', '1'),
(4, 'Marcos Alves Lopes Paiva', 'marcoslopes@gmail.com', '$2y$10$vQXZXvfK5Z.ykBmAgJG3kOMyYz9vhSSZFu3tM2uzkemQNRMb5juZe', '75647856234', 'administrador', 'diretor', 'marketing', '1'),
(5, 'Matheus Souza Paiva', 'matheus@gmail.com', '$2y$10$tjwhbUib0iRAMYu6zoeqRuDoO2Mj0WXNqZUuTPcuQji4yw23uvhN.', '86956478362', 'comum', 'estagiario', 'producao', '1'),
(6, 'gaviota', 'gaviota@gmail.com', '$2y$10$BA5UgHtKvlEKFpwhMvKga.JWHsVET9KjxzqNEFGPG9ZX5ymrzSk9i', '212512', 'administrador', 'gerente', 'producao', '1');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_links`
--

CREATE TABLE `tb_links` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `codigo` varchar(255) NOT NULL,
  `funcionario_id` int(11) NOT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tb_links`
--

INSERT INTO `tb_links` (`id`, `email`, `codigo`, `funcionario_id`, `data_criacao`) VALUES
(8, 'lyntter@gmail.com', '31506a3c-16a6-4c54-984b-6a070d73bdd7', 1, '2024-11-24 02:41:52');

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
('27033111-c2ef-4f81-a528-5f6e1648f71d', '12415251', 'Retorno', '2024-11-17T03:31:32.850Z'),
('36abe87e-97d5-4cbc-a20a-35eb204d32d5', '12415251', 'Saída', '2024-11-16T07:34:33.804Z'),
('3dc2bb0f-8c53-4ba4-8d08-3b7c4d6f8886', '12415251', 'Almoço', '2024-11-17T03:31:32.528Z'),
('6b24f1d3-a27f-497a-89d5-e57d5cb383be', '75647856234', 'Almoço', '2024-11-17T04:11:35.386Z'),
('6e03373d-5c06-4212-9fd1-d09f1d8b14fc', '12415251', 'Retorno', '2024-11-16T07:34:33.439Z'),
('743da1a0-727c-413b-94b2-e102ac675962', '12415251', 'Saída', '2024-11-17T03:31:33.184Z'),
('756d4315-cb5d-42d1-81aa-11a9864b6cc7', '', 'Almoço', '2024-09-23T18:38:37.008Z'),
('79a08748-ad72-4c2c-a4c3-95eabd3a434c', '12415251', 'Entrada', '2024-11-05T22:29:04.177Z'),
('95f54e98-6194-4cc2-8319-e6ea8d0a82dd', '12415251', 'Retorno', '2024-11-05T22:29:05.913Z'),
('a1405224-6466-40bd-b6d1-1fdee9186255', '75647856234', 'Entrada', '2024-11-17T04:11:35.057Z'),
('a16690cf-45be-4592-bbbc-80a2d850dd98', '12415251', 'Almoço', '2024-11-16T07:34:33.102Z'),
('a1d02808-d769-40cd-a8e1-5c6a8a5e8f3a', '12415251', 'Entrada', '2024-11-16T07:34:32.739Z'),
('b31735c8-1bdd-43df-95b5-60e1446d5cae', '75647856234', 'Saída', '2024-11-17T04:11:36.038Z'),
('d18cb737-9fd9-4b47-b71a-4929f3b547b3', '12415251', 'Entrada', '2029-12-27T23:01:00.000Z'),
('fc54bf25-4e74-4f10-b7b9-503e5419d9bd', '12415251', 'Entrada', '2024-11-17T03:31:32.000Z'),
('ffb11729-c87f-41cb-b70d-a9c60b359766', '75647856234', 'Retorno', '2024-11-17T04:11:35.715Z');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `tb_funcionario`
--
ALTER TABLE `tb_funcionario`
  ADD PRIMARY KEY (`n_registro`);

--
-- Índices de tabela `tb_links`
--
ALTER TABLE `tb_links`
  ADD PRIMARY KEY (`id`),
  ADD KEY `funcionario_id` (`funcionario_id`);

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
  MODIFY `n_registro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de tabela `tb_links`
--
ALTER TABLE `tb_links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `tb_links`
--
ALTER TABLE `tb_links`
  ADD CONSTRAINT `tb_links_ibfk_1` FOREIGN KEY (`funcionario_id`) REFERENCES `tb_funcionario` (`n_registro`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
