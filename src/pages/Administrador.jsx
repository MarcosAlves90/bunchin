import {useCallback, useContext, useEffect, useState, useMemo} from "react";
import { UserContext } from "../assets/ContextoDoUsuario.jsx";
import PropTypes from "prop-types";
import axios from "axios";
import { GeneratePoints } from "../systems/PointSystems.jsx";
import {getPoints} from "../systems/api.jsx";
import {ChevronRight, X, Trash, Search, Pen, ChevronDown, ChevronUp, Lock, PenOff, Shield} from "lucide-react";
import validator from "validator";
import {SendEmail} from "../systems/SendEmail.jsx";

export default function Administrador() {
    const [indexFuncionario, setIndexFuncionario] = useState(0);
    const [registros, setRegistros] = useState([]);
    const [funcionarios, setFuncionarios] = useState([]);
    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const { tema, usuario } = useContext(UserContext);
    const [inputs, setInputs] = useState([]);
    const [colapsed, setColapsed] = useState(true);
    const [lockInputs, setLockInputs] = useState(true);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    function generatePassword() {
        const length = 8;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let password = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }
        return password;
    }

    function sendEmail(password) {
        SendEmail(import.meta.env.VITE_PUBLIC_API_KEY_S,
            import.meta.env.VITE_SERVICE_API_KEY_S,
            import.meta.env.VITE_TEMPLATE_API_KEY_1_S, {
            email: inputs.email,
            password: password,
            name: inputs.nome
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const isEmailValid = validator.isEmail(validator.normalizeEmail(inputs.email));
        if (funcionarioSelecionado) {
            axios.put(`http://localhost:80/api/funcionario/${funcionarioSelecionado}/edit`, inputs)
                .then(response => {
                    console.log(response.data);
                    getUsers();
                });
        } else if (isEmailValid) {
            const newPassword = generatePassword();
            const inputsClone = { ...inputs, senha: newPassword };
            sendEmail(newPassword);
            console.log(newPassword);
            axios.post('http://localhost:80/api/funcionario/save', inputsClone)
                .then(response => {
                    console.log(response.data);
                    getUsers();
                    handleUnselectEmployee();
                });
        } else {
            console.log('Email inválido');
        }
    };

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
        setLockInputs(false);
        const defaultValues = {
            n_registro: "",
            nome: "",
            email: "",
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
        const filteredFuncionarios = useMemo(() => {
            return funcionarios.filter(funcionario =>
                funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }, [funcionarios, searchTerm]);

        return (
            <article className={"article-employees"}>
                {filteredFuncionarios.filter((funcionario) => usuario.n_registro !== funcionario.n_registro).map(funcionario => (
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
        setLockInputs(true);
    }

    useEffect(() => {
        if (funcionarioSelecionado) {
            setInputs(funcionarios[indexFuncionario]);
        }
        console.log(funcionarioSelecionado);
    }, [funcionarioSelecionado]);

    const handleColapse = useCallback(() => setColapsed(prev => !prev), []);

    const handleLockInputs = useCallback(() => setLockInputs(prev => !prev), []);

    function GenerateLockIcon() {
        return (
            <>
                {lockInputs &&
                    <Lock
                        color={tema === "light" ? "var(--background-color-light-dark-theme)" : "var(--background-color-dark-light-theme)"}
                    />
                }
            </>
        );
    }

    return (
        <main className={`mainCommon administrador ${tema}`}>
            <article className={"sidebar"}>
                <div className={"div-title"}>
                    <p className={"title"}>Funcionários</p>
                    <i className="bi bi-person-plus" onClick={handleUnselectEmployee}></i>
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
                        (lockInputs ?
                                <PenOff
                                    strokeWidth={1}
                                    size={43}
                                    onClick={handleLockInputs}
                                /> :
                                <Pen
                                    strokeWidth={1}
                                    size={43}
                                    onClick={handleLockInputs}
                                />
                        )
                    }
                </div>
                <form onSubmit={handleSubmit}>
                    <article className={"article-inputs"}>
                        <div className={`article-inputs-input nome ${lockInputs ? "locked" : ""}`}>
                            <label>NOME COMPLETO</label>
                            <input value={inputs.nome || ""} placeholder={"exemplo da silva paiva"} type={"text"}
                                   name={"nome"} onChange={handleChange} disabled={lockInputs}/>
                            <GenerateLockIcon/>
                        </div>
                        <div className={`article-inputs-input email ${lockInputs ? "locked" : ""}`}>
                            <label>EMAIL</label>
                            <input value={inputs.email || ""} placeholder={"exemplo@gmail.com"} type={"email"}
                                   name={"email"} onChange={handleChange} disabled={lockInputs}/>
                            <GenerateLockIcon/>
                        </div>
                        <div className={"article-inputs-input n-registro locked"}>
                            <label>REGISTRO</label>
                            <input value={inputs.n_registro || ""} placeholder={"1234567890"} type={"number"}
                                   name={"n_registro"} disabled/>
                            <Shield
                                color={tema === "light" ? "var(--background-color-light-dark-theme)" : "var(--background-color-dark-light-theme)"}
                            />
                        </div>
                        <div className={`article-inputs-input cpf ${lockInputs ? "locked" : ""}`}>
                            <label>CPF</label>
                            <input value={inputs.cpf || ""} placeholder={"12345678900"} type={"number"} name={"cpf"}
                                   onChange={handleChange} disabled={lockInputs}/>
                            <GenerateLockIcon/>
                        </div>
                        <div className={`article-inputs-input funcao ${lockInputs ? "locked" : ""}`}>
                            <label>FUNÇÃO</label>
                            <select value={inputs.funcao} defaultValue={"comum"} name={"funcao"}
                                    onChange={handleChange} disabled={lockInputs}>
                                <option value={"comum"}>Comum</option>
                                <option value={"administrador"}>Administrador</option>
                            </select>
                            <GenerateLockIcon/>
                        </div>
                        <div className={`article-inputs-input cargo ${lockInputs ? "locked" : ""}`}>
                            <label>CARGO</label>
                            <select value={inputs.cargo} defaultValue={"estagiario"} name={"cargo"}
                                    onChange={handleChange} disabled={lockInputs}>
                                <option value={"estagiario"}>Estagiário</option>
                                <option value={"auxiliar-administrativo"}>Auxiliar administrativo</option>
                                <option value={"gerente"}>Gerente</option>
                                <option value={"diretor"}>Diretor</option>
                            </select>
                            <GenerateLockIcon/>
                        </div>
                        <div className={`article-inputs-input departamento ${lockInputs ? "locked" : ""}`}>
                            <label>DEPARTAMENTO</label>
                            <select value={inputs.departamento} defaultValue={"administrativo"} name={"departamento"}
                                    onChange={handleChange} disabled={lockInputs}>
                                <option value={"administrativo"}>Administrativo</option>
                                <option value={"financeiro"}>Financeiro</option>
                                <option value={"marketing"}>Marketing</option>
                                <option value={"producao"}>Produção</option>
                            </select>
                            <GenerateLockIcon/>
                        </div>
                    </article>
                    <div className={"container-save-button"}>
                        <button
                            className={`save-button ${lockInputs ? "locked" : ""}`} disabled={lockInputs}>{!funcionarioSelecionado ? "Criar perfil" : "Salvar alterações"}</button>
                    </div>
                </form>
                <div className={`div-title ${registros.length > 0 ? "colapse" : ""}`}
                     onClick={registros.length > 0 ? handleColapse : null}>
                    <h1 className={"title"}>REGISTRO DE HORAS</h1>
                    {registros.length > 0 && (
                        colapsed ? (
                            <ChevronDown strokeWidth={0.7} className="icon" size={50}/>
                        ) : (
                            <ChevronUp strokeWidth={0.7} className="icon" size={50}/>
                        )
                    )}
                </div>
                {!colapsed && <GeneratePoints deletePonto={deletePonto} registros={registros} getPonto={getPontos}/>}
            </article>
        </main>
    );
}