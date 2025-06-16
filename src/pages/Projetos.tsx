import { useContext, useState, useCallback, useMemo, useEffect } from "react";
import { UserContext } from "../utils/context/userContext.js";
import axios from "axios";

export default function Projetos() {
    const { usuario, API_URL } = useContext(UserContext);
    const [projetos, setProjetos] = useState([]);
    const [selectedProjeto, setSelectedProjeto] = useState(null);
    const [inputs, setInputs] = useState({
        nome: "",
        dataInicio: "",
        dataTermino: "",
        funcionarios: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const fetchProjetos = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${API_URL}projetos`);
            setProjetos(response.data);
        } catch (error) {
            console.error("Erro ao buscar projetos:", error);
        } finally {
            setIsLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchProjetos();
    }, [fetchProjetos]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (selectedProjeto) {
                await axios.put(`${API_URL}projetos/${selectedProjeto}`, inputs);
                console.log("Projeto atualizado com sucesso!");
            } else {
                await axios.post(`${API_URL}projetos`, inputs);
                console.log("Projeto criado com sucesso!");
            }
            fetchProjetos();
            setInputs({ nome: "", dataInicio: "", dataTermino: "", funcionarios: [] });
            setSelectedProjeto(null);
        } catch (error) {
            console.error("Erro ao salvar projeto:", error);
        }
    };

    const handleEdit = (projeto) => {
        setSelectedProjeto(projeto.id);
        setInputs({
            nome: projeto.nome,
            dataInicio: projeto.dataInicio,
            dataTermino: projeto.dataTermino,
            funcionarios: projeto.funcionarios
        });
    };

    const filteredProjetos = useMemo((projetos) => {
        if (projetos){
            return projetos.filter((projeto) =>
                projeto.nome.toLowerCase().includes(searchTerm.toLowerCase())
            );
        } else {
            return [];
        }
    }, [projetos, searchTerm]);

    return (
        <main className="mainCommon projetos text-base gap-2 flex justify-center items-center flex-col text-primary transition-colors">
            <article className="w-full bg-tertiary p-1.5 rounded-sm">
                <h1 className="text-4xl font-subrayada w-full text-left">GERENCIAR PROJETOS</h1>
                <div className="relative group">
                    <input
                        className="border-b-2 w-full border-primary p-0.5 pr-[2.2rem] bg-tertiary rounded-t-sm group-focus-within:border-highlight"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Pesquisar projetos"
                    />
                </div>
                <form onSubmit={handleSubmit} className="my-2">
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
                    </div>
                    <button
                        type={"submit"}
                        value={"Submit"}
                        className={`border-none transition text-lg my-3 px-2 py-[0.7rem] rounded-sm text-secondary cursor-pointer font-medium max-w-20 w-full bg-(--highlight) hover:bg-(--primary)`}
                        aria-label="Avançar"
                    >
                        <i className="bi bi-feather2 left"></i>
                        {selectedProjeto ? "Atualizar Projeto" : "Criar Projeto"}
                        <i className="bi bi-feather2 right"></i>
                    </button>
                </form>
                <div className="mt-4">
                    {isLoading ? (
                        <p>Carregando projetos...</p>
                    ) : (
                        <ul>
                            {filteredProjetos.map((projeto) => (
                                <li key={projeto.id} className="flex justify-between items-center border-b py-2">
                                    <span>{projeto.nome}</span>
                                    <button onClick={() => handleEdit(projeto)} className="text-blue-500">
                                        Editar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </article>
        </main>
    );
}