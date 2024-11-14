import { useContext, useEffect, useState } from "react";
import { UserContext } from "../assets/ContextoDoUsuario.jsx";
import PropTypes from "prop-types";
import axios from "axios";
import { GeneratePoints } from "../systems/PointSystems.jsx";
import {getPoints} from "../systems/api.jsx";
import {ChevronRight, X, Trash, Search, Pencil} from "lucide-react";

export default function Administrador() {
    const [indexFuncionario, setIndexFuncionario] = useState(0);
    const [registros, setRegistros] = useState([]);
    const [funcionarios, setFuncionarios] = useState([]);
    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const { tema } = useContext(UserContext);
    const [inputs, setInputs] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (funcionarioSelecionado) {
            axios.put(`http://localhost:80/api/funcionario/${funcionarioSelecionado}/edit`, inputs).then(response => {
                console.log(response.data);
                getUsers();
            });
        } else {
            axios.post('http://localhost:80/api/funcionario/save', inputs).then(response => {
                console.log(response.data);
                getUsers();
                handleUnselectEmployee();
            });
        }
    };

    function handleAddEmployee() {
        axios.post('http://localhost:80/api/funcionario/save', inputs).then(response => {
            console.log(response.data);
        });
    }

    useEffect(() => {
        getUsers();
        handleUnselectEmployee();
    }, []);

    function getUsers() {
        axios.get(`http://localhost:80/api/funcionario/`).then(response => {
            console.log(response.data);
            setFuncionarios(response.data);
        });
    }

    const deleteUser = (cpf) => {
        axios.delete(`http://localhost:80/api/funcionario/${cpf}/delete`).then(response => {
            console.log(response.data);
            getUsers();
            handleUnselectEmployee();
        });
    };

    const getPontos = () => {
        if (funcionarioSelecionado) {
            (async () => {
                const pontos = await getPoints(funcionarioSelecionado, false);
                setRegistros(pontos);
            })();
        }
    }

    useEffect(() => {
        getPontos();
    }, [funcionarioSelecionado]);


    const deletePonto = (id) => {
        axios.delete(`http://localhost:80/api/ponto/${id}/delete`).then(response => {
            console.log(response.data);
            getPontos();
        });
    };

    function handleUnselectEmployee() {
        setFuncionarioSelecionado("");
        setRegistros([]);
        const defaultValues = {
            n_registro: "",
            nome: "",
            email: "",
            senha: "",
            cpf: "",
            funcao: "comum",
            cargo: "estagiario",
            departamento: "administrativo"
        };
        for (const [name, value] of Object.entries(defaultValues)) {
            handleChange({ target: { name, value } });
        }
    }

    function GenerateEmployeesButtons({ funcionarios }) {
        const filteredFuncionarios = funcionarios.filter(funcionario =>
            funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <article className={"article-employees"}>
                {filteredFuncionarios.map(funcionario => (
                    <div key={funcionario.cpf}
                         className={`employee-item ${funcionarioSelecionado === funcionario.cpf ? "ativo" : ""}`}>
                        <p className={"nome"}
                           onClick={() => handleEmployeeButtonClick(funcionario)}>{funcionario.nome}</p>
                        {funcionarioSelecionado === funcionario.cpf &&
                            <X strokeWidth={2.5}
                               size={16}
                               absoluteStrokeWidth={true}
                               onClick={handleUnselectEmployee}
                               color={tema === "dark" ?
                                   "var(--background-color-navbar-dark)" :
                                   "var(--background-color-navbar-light)"}
                            />}
                        {!(funcionarioSelecionado === funcionario.cpf) &&
                            <div className={"box display-flex-center"} onClick={() => handleEmployeeButtonClick(funcionario)}>
                                <ChevronRight
                                    strokeWidth={2.5}
                                    size={16}
                                    absoluteStrokeWidth={true}
                                />
                            </div>
                        }
                    </div>
                ))}
            </article>
        );
    }

    GenerateEmployeesButtons.propTypes = {
        funcionarios: PropTypes.array.isRequired,
    };

    function handleEmployeeButtonClick(funcionario) {
        setFuncionarioSelecionado(funcionario.cpf);
        setIndexFuncionario(funcionarios.findIndex(f => f.cpf === funcionario.cpf));
    }

    useEffect(() => {
        if (funcionarioSelecionado) {
            setInputs(funcionarios[indexFuncionario]);
        }
        console.log(funcionarioSelecionado);
    }, [funcionarioSelecionado]);

    return (
        <main className={`mainCommon administrador ${tema}`}>
            <article className={"sidebar"}>
                <div className={"div-title"}>
                    <p className={"title"}>Funcionários</p>
                    {/*<i className="bi bi-person-plus" onClick={handleAddEmployee}></i>*/}
                </div>
                <div className={"div-search"}>
                    <input className={"search"} value={searchTerm} onChange={handleSearchChange} placeholder="Pesquisar funcionários" />
                    <Search
                        className="search-icon"
                        color={tema === "light" ? "var(--background-color-dark-theme)" : "var(--background-color-light-theme)"}
                    />
                </div>
                <GenerateEmployeesButtons funcionarios={funcionarios} />
            </article>
            <article className={"page"}>
                <div className={"div-title"}>
                    <h1 className={"title"}>DADOS DO PERFIL</h1>
                    {funcionarioSelecionado &&
                        <Trash
                            strokeWidth={1}
                            size={43}
                            onClick={() => deleteUser(funcionarioSelecionado)}
                        />
                    }
                    {funcionarioSelecionado &&
                        <Pencil
                            strokeWidth={1}
                            size={43}
                        />
                    }
                </div>
                <form onSubmit={handleSubmit}>
                    <article className={"article-inputs"}>
                        <div className={"article-inputs-input nome"}>
                            <label>NOME COMPLETO</label>
                            <input value={inputs.nome || ""} placeholder={"exemplo da silva paiva"} type={"text"}
                                   name={"nome"} onChange={handleChange}/>
                        </div>
                        <div className={"article-inputs-input email"}>
                            <label>EMAIL</label>
                            <input value={inputs.email || ""} placeholder={"exemplo@gmail.com"} type={"email"}
                                   name={"email"} onChange={handleChange}/>
                        </div>
                        <div className={"article-inputs-input n-registro"}>
                            <label>REGISTRO</label>
                            <input value={inputs.n_registro || ""} placeholder={"1234567890"} type={"number"}
                                   name={"n_registro"} onChange={handleChange}/>
                        </div>
                        <div className={"article-inputs-input senha"}>
                            <label>SENHA</label>
                            <input placeholder={"senhasegura1234"} type={"text"}
                                   name={"senha"} onChange={handleChange}/>
                        </div>
                        <div className={"article-inputs-input cpf"}>
                            <label>CPF</label>
                            <input value={inputs.cpf || ""} placeholder={"12345678900"} type={"number"} name={"cpf"}
                                   onChange={handleChange}/>
                        </div>
                        <div className={"article-inputs-input funcao"}>
                            <label>FUNÇÃO</label>
                            <select value={inputs.funcao} defaultValue={"comum"} name={"funcao"}
                                    onChange={handleChange}>
                                <option value={"comum"}>Comum</option>
                                <option value={"administrador"}>Administrador</option>
                            </select>
                        </div>
                        <div className={"article-inputs-input cargo"}>
                            <label>CARGO</label>
                            <select value={inputs.cargo} defaultValue={"estagiario"} name={"cargo"}
                                    onChange={handleChange}>
                                <option value={"estagiario"}>Estagiário</option>
                                <option value={"auxiliar-administrativo"}>Auxiliar administrativo</option>
                                <option value={"gerente"}>Gerente</option>
                                <option value={"diretor"}>Diretor</option>
                            </select>
                        </div>
                        <div className={"article-inputs-input departamento"}>
                            <label>DEPARTAMENTO</label>
                            <select value={inputs.departamento} defaultValue={"administrativo"} name={"departamento"}
                                    onChange={handleChange}>
                                <option value={"administrativo"}>Administrativo</option>
                                <option value={"financeiro"}>Financeiro</option>
                                <option value={"marketing"}>Marketing</option>
                                <option value={"producao"}>Produção</option>
                            </select>
                        </div>
                    </article>
                    <div className={"container-save-button"}>
                        <button className={"save-button"}>{!funcionarioSelecionado ? "Criar perfil" : "Salvar alterações"}</button>
                    </div>
                </form>
                <div className={"div-title"}>
                    <h1 className={"title"}>REGISTRO DE HORAS</h1>
                </div>
                <GeneratePoints deletePonto={deletePonto} registros={registros}/>
            </article>
        </main>
    );
}