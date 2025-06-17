import { useContext, useState, useCallback, useMemo, useEffect } from "react";
import { UserContext } from "../utils/context/userContext.js";
// import axios from "axios";

export default function Projetos() {
    const { usuario, API_URL } = useContext(UserContext);

    // Dados mockados para testes
    const [projetos, setProjetos] = useState([]);
    const [selectedProjeto, setSelectedProjeto] = useState(null);
    const [funcionariosInput, setFuncionariosInput] = useState("");
    const [inputs, setInputs] = useState({
        nome: "",
        dataInicio: "",
        dataTermino: "",
        descricao: "",
        idOrganizacao: "",
        responsavel:"",
        status: "",
        funcionarios: [],
        atividades: []
    });
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Simula busca de projetos
    const fetchProjetos = useCallback(async () => {
        setIsLoading(true);
        // Simulação de delay
        setTimeout(() => {
            // Aqui usaria axios normalmente
            // const response = await axios.get(`${API_URL}projetos`);
            // setProjetos(response.data);
            setIsLoading(false);
        }, 500);
    }, [API_URL]);

    useEffect(() => {
        fetchProjetos();
    }, [fetchProjetos]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Adiciona/atualiza projeto localmente
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            if (selectedProjeto) {
                // Atualiza projeto existente
                setProjetos((prev) =>
                    prev.map((proj) =>
                        proj.id === selectedProjeto
                            ? { ...proj, ...inputs, id: selectedProjeto }
                            : proj
                    )
                );
                // await axios.put(`${API_URL}projetos/${selectedProjeto}`, inputs);
            } else {
                // Cria novo projeto
                const novoProjeto = {
                    ...inputs,
                    id: Math.max(0, ...projetos.map((p) => p.id)) + 1,
                };
                setProjetos((prev) => [...prev, novoProjeto]);
                // await axios.post(`${API_URL}projetos`, inputs);
            }
            setInputs({
                nome: "",
                dataInicio: "",
                dataTermino: "",
                descricao: "",
                idOrganizacao: "",
                responsavel:"",
                status: "",
                funcionarios: [],
                atividades: []
            });
            setSelectedProjeto(null);
            setIsLoading(false);
        }, 500);
    };

    const handleEdit = (projeto) => {
        setSelectedProjeto(projeto.id);
        setInputs({
            nome: projeto.nome,
            dataInicio: projeto.dataInicio,
            dataTermino: projeto.dataTermino,
            descricao: projeto.descricao || "",
            idOrganizacao: projeto.idOrganizacao || "",
            responsavel: projeto.responsavel || "",
            status: projeto.status || "Planejamento",
            funcionarios: projeto.funcionarios || [],
            atividades: projeto.atividades || []
        });
    };

    const filteredProjetos = useMemo(() => {
        return projetos.filter((projeto) =>
            projeto.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [projetos, searchTerm]);

    // Adiciona/remover funcionário (apenas string para simulação)
    const handleResponsavelChange = (event) => {
        setInputs((prev) => ({
            ...prev,
            responsavel: event.target.value
        }));
    };
    const handleFuncionarioInputChange = (event) => {
        setFuncionariosInput(event.target.value);
    };
    const handleFuncionarioInputBlur = () => {
        setInputs((prev) => ({
            ...prev,
            funcionarios: funcionariosInput
                .split(",")
                .map((nome) => ({ nome: nome.trim() }))
                .filter((f) => f.nome)
        }));
    };
    

    return (
        <main className="mainCommon projetos text-base gap-2 flex justify-center items-center flex-col text-primary transition-colors">
            <article className="w-full bg-tertiary p-1.5 rounded-sm">
                <h1 className="text-4xl font-subrayada w-full text-left">DADOS DO PROJETO</h1>
                <form onSubmit={handleSubmit} className="my-2">
                    <div className="flex flex-col">
                        <div className="grid grid-cols-3 gap-2">
                            <div className="flex flex-col col-span-3">
                                <label className="w-full text-start">NOME DO PROJETO</label>
                                <input
                                    className="border-b-2 border-primary p-0.5 bg-secondary rounded-t-sm"
                                    name="nome"
                                    value={inputs.nome}
                                    onChange={handleChange}
                                    placeholder="Nome do projeto"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="w-full text-start">DATA DE INÍCIO</label>
                                <input
                                    type="date"
                                    className="border-b-2 border-primary p-0.5 bg-secondary rounded-t-sm"
                                    name="dataInicio"
                                    value={inputs.dataInicio}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="w-full text-start">DATA DE TÉRMINO</label>
                                <input
                                    type="date"
                                    className="border-b-2 border-primary p-0.5 bg-secondary rounded-t-sm"
                                    name="dataTermino"
                                    value={inputs.dataTermino}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="w-full text-start">STATUS</label>
                                <select
                                    className="border-b-2 border-primary p-0.5 bg-secondary rounded-t-sm"
                                    name="status"
                                    value={inputs.status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Planejamento">Planejamento</option>
                                    <option value="Em Andamento">Em Andamento</option>
                                    <option value="Concluído">Concluído</option>
                                </select>
                            </div>
                            <div className="flex flex-col col-span-3">
                                <label className="w-full text-start">DESCRIÇÃO DO PROJETO</label>
                                <textarea
                                    className="border-b-2 border-primary p-0.5 bg-secondary rounded-t-sm"
                                    name="descricao"
                                    value={inputs.descricao}
                                    onChange={handleChange}
                                    placeholder="Descreva o projeto"
                                    rows={2}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2 mt-2">
                            <div className="flex flex-col col-span-2">
                                <label className="w-full text-start">RESPONSÁVEL PELO PROJETO</label>
                                <input
                                    className="border-b-2 border-primary p-0.5 bg-secondary rounded-t-sm"
                                    placeholder="Responsável da Silva"
                                    value={inputs.responsavel}
                                    onChange={handleResponsavelChange}
                                />
                                <div className="flex flex-wrap gap-1 mt-1">
                                        {inputs.responsavel?(<span className="bg-highlight text-secondary px-2 py-0.5 rounded-sm text-xs">{inputs.responsavel}</span>):("")}
                                </div>
                            </div>
                            <div className="flex flex-col col-span-2">
                                <label className="w-full text-start">FUNCIONÁRIOS ATRIBUÍDOS</label>
                                <input
                                    className="border-b-2 border-primary p-0.5 bg-secondary rounded-t-sm"
                                    placeholder="Digite nomes separados por vírgula"
                                    value={funcionariosInput}
                                    onChange={handleFuncionarioInputChange}
                                    onBlur={handleFuncionarioInputBlur}
                                />
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {inputs.funcionarios.map((f, idx) => (
                                        <span key={idx} className="bg-highlight text-secondary px-2 py-0.5 rounded-sm text-xs">{f.nome}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="border-none transition text-lg my-3 px-2 py-[0.7rem] rounded-sm text-secondary cursor-pointer font-medium max-w-40 w-full bg-highlight hover:bg-primary"
                        aria-label="Avançar"
                    >
                        {selectedProjeto ? "Atualizar Projeto" : "Criar Projeto"}
                    </button>
                </form>
            </article>
            <article className="w-full bg-tertiary p-1.5 rounded-sm">
                <h2 className="text-2xl font-subrayada w-full text-left mb-2">PROJETOS</h2>
                <div className="mt-2">
                    {isLoading ? (
                        <p>Carregando projetos...</p>
                    ) : (
                        <div>
                            <div className="relative group mb-2">
                                <input
                                    className="border-b-2 w-full border-primary p-0.5 pr-[2.2rem] bg-tertiary rounded-t-sm group-focus-within:border-highlight"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    placeholder="Buscar projeto..."
                                />
                            </div>
                            <ul>
                                {filteredProjetos.map((projeto) => (
                                    <li key={projeto.id} className="flex flex-col border-b py-2">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold">{projeto.nome}</span>
                                            <button
                                                onClick={() => handleEdit(projeto)}
                                                className="text-(--highlight) hover:underline"
                                            >
                                                Editar
                                            </button>
                                        </div>
                                        <div className="text-xs text-primary/70">
                                            {projeto.descricao}
                                        </div>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            <span className="bg-secondary text-primary px-2 py-0.5 rounded-sm text-xs">{projeto.status}</span>
                                            <span className="bg-secondary text-primary px-2 py-0.5 rounded-sm text-xs">{projeto.responsavel}</span>
                                        </div>
                                        <div>
                                            {projeto.funcionarios && projeto.funcionarios.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {projeto.funcionarios.map((f, idx) => (
                                                    <span key={idx} className="bg-highlight text-secondary px-2 py-0.5 rounded-sm text-xs">
                                                        {f.nome}
                                                    </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </article>
        </main>
    );
}