import axios from "axios";
import PropTypes from "prop-types";
import validator from "validator";
<<<<<<< HEAD
import { useCallback, useContext, useEffect, useState, useMemo, useRef } from "react";
import { UserContext } from "../utils/context/userContext.js";
import { GeneratePoints } from "../components/organisms/PointSystems.jsx";
import { ChevronRight, X, Trash, Search, Pen, ChevronDown, ChevronUp, Lock, PenOff, Shield, UserRoundPlus, PanelLeft, PanelLeftDashed } from "lucide-react";
import { SendEmail } from "../utils/services/sendEmail.js";
import { EmployeeSkeleton } from "../components/atoms/EmployeeSkeleton.tsx";

interface Funcionario {
    cpf: string;
    nome: string;
    email: string;
    n_registro: number;
    funcao: string;
    cargo: string;
    departamento: string;
}

export default function Administrador() {
    const [indexFuncionario, setIndexFuncionario] = useState(0);
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const { tema, usuario, API_URL } = useContext(UserContext);    const [inputs, setInputs] = useState<Record<string, string>>({});
    const [colapsed, setColapsed] = useState(true);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [lockInputs, setLockInputs] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [showEditModeMessage, setShowEditModeMessage] = useState(false);
    const abortControllerRef = useRef<AbortController | null>(null);
    const [selectedDate, setSelectedDate] = useState(() => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.toISOString().split('T')[0];
    });
    const selectedDateISO = useMemo(() => {
        const [year, month, day] = selectedDate.split('-').map(Number);
        const date = new Date(year, month - 1, day, 12, 0, 0);
        return date.toISOString();
    }, [selectedDate]);    const handleColapse = useCallback(() => setColapsed(prev => !prev), []);
    const handleSidebarCollapse = useCallback(() => setSidebarCollapsed(prev => !prev), []);
    const handleDateChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
=======
import {useCallback, useContext, useEffect, useState, useMemo} from "react";
import { UserContext } from "../utils/userContext.jsx";
import { GeneratePoints } from "../components/PointSystems.jsx";
import {getPoints} from "../utils/getPoints.jsx";
import {ChevronRight, X, Trash, Search, Pen, ChevronDown, ChevronUp, Lock, PenOff, Shield} from "lucide-react";
import {SendEmail} from "../utils/sendEmail.jsx";

export default function Administrador() {
    const [indexFuncionario, setIndexFuncionario] = useState(0);
    const [registros, setRegistros] = useState([]);
    const [funcionarios, setFuncionarios] = useState([]);
    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const { tema, usuario, API_URL } = useContext(UserContext);
    const [inputs, setInputs] = useState([]);
    const [colapsed, setColapsed] = useState(true);
    const [lockInputs, setLockInputs] = useState(true);

    const handleChange = (event) => {
>>>>>>> bea5ea5 (feat: Add main application pages and user context management)
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

<<<<<<< HEAD
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
=======
    const handleSearchChange = (event) => {
>>>>>>> bea5ea5 (feat: Add main application pages and user context management)
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
<<<<<<< HEAD
    }    function sendEmail(password: string) {
        // @ts-ignore
        SendEmail(import.meta.env.VITE_PUBLIC_API_KEY_S,
            // @ts-ignore
            import.meta.env.VITE_SERVICE_API_KEY_S,
            // @ts-ignore
=======
    }

    function sendEmail(password) {
        SendEmail(import.meta.env.VITE_PUBLIC_API_KEY_S,
            import.meta.env.VITE_SERVICE_API_KEY_S,
>>>>>>> bea5ea5 (feat: Add main application pages and user context management)
            import.meta.env.VITE_TEMPLATE_API_KEY_1_S, {
            email: inputs.email,
            password: password,
            name: inputs.nome
        });
<<<<<<< HEAD
    }    const handleSubmit = useCallback(async (event: React.FormEvent) => {
=======
    }

    const handleSubmit = (event) => {
>>>>>>> bea5ea5 (feat: Add main application pages and user context management)
        event.preventDefault();
        const isEmailValid = validator.isEmail(validator.normalizeEmail(inputs.email));
        if (funcionarioSelecionado) {
            axios.put(`${API_URL}funcionario/${funcionarioSelecionado}/edit`, inputs)
                .then(response => {
                    console.log(response.data);
                    getUsers();
                });
        } else if (isEmailValid) {
            const newPassword = generatePassword();
            const inputsClone = { ...inputs, senha: newPassword };
            sendEmail(newPassword);
            console.log(newPassword);
            axios.post(`${API_URL}funcionario/save`, inputsClone)
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
        axios.get(`${API_URL}funcionario`).then(response => {
            console.log(response.data);
            setFuncionarios(response.data);
        });
    }

    const deleteUser = (cpf) => {
        axios.delete(`${API_URL}funcionario/${cpf}/delete`).then(response => {
            console.log(response.data);
            getUsers();
            handleUnselectEmployee();
        });
    };

    const getPontos = () => {
        if (funcionarioSelecionado) {
            (async () => {
                const pontos = await getPoints(funcionarioSelecionado, false, API_URL);
                setRegistros(pontos);
            })();
        }
<<<<<<< HEAD
    }, [API_URL]);

    useEffect(() => {
        getUsers();
    }, [getUsers]);
    
    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);    const deleteUser = useCallback(async (cpf: string): Promise<void> => {
        try {
            await axios.delete(`${API_URL}funcionario/${cpf}`);
            console.log("Funcionário deletado com sucesso!");
            await getUsers();
            setFuncionarioSelecionado("");
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
                handleChange({ target: { name, value } } as React.ChangeEvent<HTMLInputElement>);
            }
        } catch (error) {
            console.error("Erro ao deletar funcionário:", error);        }
    }, [API_URL, getUsers]);      function GenerateEmployeesButtons({ funcionarios }: { funcionarios: Funcionario[] }) {
        const filteredFuncionarios = useMemo(() => {
            return funcionarios.filter((funcionario: Funcionario) =>
                funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }, [funcionarios, searchTerm]);

        if (isLoading) {
            return (
                <article className={"flex flex-col gap-0.5"}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <EmployeeSkeleton tema={tema} key={`skeleton-${index}`} />
                    ))}
                </article>
            );
        }

        if (filteredFuncionarios.length === 0) {
            return (
                <article className={"flex flex-col gap-0.5"}>
                    <p className="text-center text-base text-primary opacity-70 py-2">
                        {funcionarios.length === 0 ? "Nenhum funcionário encontrado" : "Nenhum funcionário corresponde à pesquisa"}
                    </p>
                </article>
            );
        }

        return (
            <article className={"flex flex-col gap-0.5"}>
                {filteredFuncionarios.filter((funcionario: Funcionario) => usuario?.n_registro !== funcionario.n_registro).map((funcionario: Funcionario) => (
                    <div
                        key={funcionario.n_registro}
                        onClick={() => handleEmployeeButtonClick(funcionario)}
                        className={`flex items-center justify-between cursor-pointer border-1 p-0.5 rounded-sm transition-colors hover:bg-tertiary ${funcionarioSelecionado === String(funcionario.n_registro) ? "border-highlight text-highlight" : "border-tertiary"}`}
                    >
                        <p className="nome truncate max-w-[160px]">{funcionario.nome}</p>
                        {funcionarioSelecionado === String(funcionario.n_registro) ? (
                            <X
                                strokeWidth={2.5}
                                size={16}
                                absoluteStrokeWidth={true}
                                className="text-highlight"
                            />
                        ) : (
                            <ChevronRight
                                strokeWidth={2.5}
                                size={16}
                                absoluteStrokeWidth={true}
                            />
                        )}
                    </div>
                ))}
            </article>
        );
    }

    GenerateEmployeesButtons.propTypes = {
        funcionarios: PropTypes.array.isRequired,
    };

    function handleEmployeeButtonClick(funcionario: Funcionario) {
        if (funcionarioSelecionado === String(funcionario.n_registro)) {
            setFuncionarioSelecionado("");
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
                handleChange({ target: { name, value } } as React.ChangeEvent<HTMLInputElement>);
            }
        } else {
            setFuncionarioSelecionado(String(funcionario.n_registro));
            setIndexFuncionario(funcionarios.findIndex(f => f.n_registro === Number(funcionarioSelecionado)));
            setLockInputs(true);
        }
    }
    useEffect(() => {
        if (funcionarioSelecionado && funcionarios[indexFuncionario]) {
            const funcionario = funcionarios[indexFuncionario];
            setInputs({
                n_registro: String(funcionario.n_registro),
                nome: funcionario.nome,
                email: funcionario.email,
                cpf: funcionario.cpf,
                funcao: funcionario.funcao,
                cargo: funcionario.cargo,
                departamento: funcionario.departamento
            });
        }
        console.log(funcionarioSelecionado);
    }, [funcionarioSelecionado]);

    const clearSelection = useCallback(() => {
        setFuncionarioSelecionado("");
=======
    }

    useEffect(() => {
        getPontos();
    }, [funcionarioSelecionado]);


    const deletePonto = (id) => {
        axios.delete(`${API_URL}ponto/${id}/delete`).then(response => {
            console.log(response.data);
            getPontos();
        });
    };

    function handleUnselectEmployee() {
        setFuncionarioSelecionado("");
        setRegistros([]);
>>>>>>> bea5ea5 (feat: Add main application pages and user context management)
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
<<<<<<< HEAD
            handleChange({ target: { name, value } } as React.ChangeEvent<HTMLInputElement>);
        }
    }, []);

    const handleLockInputs = useCallback(() => setLockInputs(prev => !prev), []);

    const userFields = useMemo(() => [
        {
            label: "NOME COMPLETO",
            name: "nome",
            type: "input",
            inputType: "text",
            placeholder: "exemplo da silva paiva",
            colSpan: "col-span-3",
            disabled: funcionarioSelecionado ? lockInputs : false
        },
        {
            label: "EMAIL",
            name: "email",
            type: "input",
            inputType: "email",
            placeholder: "exemplo@gmail.com",
            colSpan: "col-span-2",
            disabled: funcionarioSelecionado ? lockInputs : false
        },
        {
            label: "REGISTRO",
            name: "n_registro",
            type: "input",
            inputType: "number",
            placeholder: "1234567890",
            colSpan: "col-span-1",
            disabled: true,
            locked: true
        },
        {
            label: "CPF",
            name: "cpf",
            type: "input",
            inputType: "number",
            placeholder: "12345678900",
            colSpan: "col-span-3",
            disabled: funcionarioSelecionado ? lockInputs : false
        },
        {
            label: "FUNÇÃO",
            name: "funcao",
            type: "select",
            placeholder: "",
            colSpan: "col-span-3",
            disabled: funcionarioSelecionado ? lockInputs : false,
            options: [
                { value: "comum", label: "Comum" },
                { value: "administrador", label: "Administrador" }
            ]
        },
        {
            label: "CARGO",
            name: "cargo",
            type: "select",
            placeholder: "",
            colSpan: "col-span-3",
            disabled: funcionarioSelecionado ? lockInputs : false,
            options: [
                { value: "estagiario", label: "Estagiário" },
                { value: "auxiliar-administrativo", label: "Auxiliar administrativo" },
                { value: "gerente", label: "Gerente" },
                { value: "diretor", label: "Diretor" }
            ]
        },
        {
            label: "DEPARTAMENTO",
            name: "departamento",
            type: "select",
            placeholder: "",
            colSpan: "col-span-3",
            disabled: funcionarioSelecionado ? lockInputs : false,
            options: [
                { value: "administrativo", label: "Administrativo" },
                { value: "financeiro", label: "Financeiro" },
                { value: "marketing", label: "Marketing" },
                { value: "producao", label: "Produção" }
            ]
        }
    ], [lockInputs, funcionarioSelecionado]);

    function GenerateLockIcon({}: { className?: string }) {
        return (
            <>
                {funcionarioSelecionado && lockInputs &&
                    <Lock
                        className={"absolute right-0.5 top-1/2"}
=======
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
>>>>>>> bea5ea5 (feat: Add main application pages and user context management)
                    />
                }
            </>
        );
<<<<<<< HEAD
    }    return (
        <div className={`flex`}>
            <article className={`sidebar pt-[90px] pb-2 flex items-center justify-center text-primary transition-all duration-500 ease-in-out ${sidebarCollapsed ? 'max-w-0 pl-0 overflow-hidden' : 'max-w-[280px] pl-1'}`}>
                <div className={`bg-secondary border-tertiary border-1 p-1 h-full flex flex-col rounded-sm min-w-17 gap-1 transition-all duration-500 ease-in-out ${sidebarCollapsed ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                    <div className={"div-title flex justify-between items-center"}>
                        <p className={"text-lg"}>Funcionários</p>                        <div>
                        <UserRoundPlus className="cursor-pointer transition-colors hover:text-highlight" onClick={clearSelection} />
                        </div>
                    </div>
                    <div className={"relative group"}>
                        <input className={"border-b-2 w-full border-primary p-0.5 pr-[2.2rem] bg-tertiary rounded-t-sm group-focus-within:border-highlight"} value={searchTerm} onChange={handleSearchChange} placeholder="Pesquisar funcionários" />
                        <Search
                            className="absolute right-0.5 top-1/2 transform -translate-y-1/2 text-primary group-focus-within:text-highlight"
                        />
                    </div>
                    <GenerateEmployeesButtons funcionarios={funcionarios} />
                </div>
            </article>
            <main className={`mainCommon text-base flex justify-start items-center flex-col gap-2 text-primary`}>
                <article className={"bg-tertiary rounded-sm p-1.5 flex flex-col"}>
                    <div className={"flex gap-1 items-center justify-center"}>
                        {!sidebarCollapsed &&
                            <PanelLeft strokeWidth={1.5} size={40} className="cursor-pointer transition-colors hover:text-highlight" onClick={handleSidebarCollapse} />
                        }
                        {sidebarCollapsed &&
                            <PanelLeftDashed strokeWidth={1.5} size={40} className="cursor-pointer transition-colors hover:text-highlight" onClick={handleSidebarCollapse} />
                        }
                        <h1 className={"text-4xl font-subrayada w-full text-left"}>DADOS DO PERFIL</h1>
                        {funcionarioSelecionado &&
                            <Trash
                                strokeWidth={1.5}
                                size={40}
                                className="transition-colors hover:text-red cursor-pointer"
                                onClick={() => deleteUser(funcionarioSelecionado)}
                            />
                        }
                        {funcionarioSelecionado &&
                            (lockInputs ?
                                <PenOff
                                    strokeWidth={1.5}
                                    size={40}
                                    className="cursor-pointer"
                                    onClick={handleLockInputs}
                                /> :
                                <Pen
                                    strokeWidth={1.5}
                                    size={40}
                                    className="cursor-pointer"
                                    onClick={handleLockInputs}
                                />
                            )
                        }
                    </div>
                    <form onSubmit={handleSubmit}>
                        <article className={"my-2 grid grid-cols-6 gap-2"}>
                            {userFields.map(field => (
                                <div key={field.name} className={`flex flex-col ${field.colSpan} relative`}>
                                    <label className="w-full text-start">{field.label}</label>
                                    {field.type === "input" ? (
                                        <input
                                            className={`border-b-2 border-primary p-0.5 bg-secondary rounded-t-sm ${field.disabled ? 'pointer-events-none' : ''}`}
                                            value={inputs[field.name] || ""}
                                            placeholder={field.placeholder}
                                            type={field.inputType}
                                            name={field.name}
                                            onChange={handleChange}
                                            disabled={field.disabled}
                                        />
                                    ) : (
                                        <select
                                            className={`border-b-2 border-primary p-0.5 bg-secondary rounded-t-sm ${field.disabled ? 'pointer-events-none appearance-none' : ''}`}
                                            value={inputs[field.name] || field.options?.[0]?.value}
                                            name={field.name}
                                            onChange={handleChange}
                                            disabled={field.disabled}
                                        >
                                            {field.options?.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                    {field.locked ? (
                                        <Shield className="absolute right-0.5 top-1/2"/>
                                    ) : (
                                        <GenerateLockIcon />
                                    )}
                                </div>
                            ))}
                        </article>
                        <div className={"container-save-button"}>
                            <button
                                className={`border-none transition text-lg px-2 py-[0.7rem] rounded-sm text-secondary cursor-pointer font-medium max-w-20 w-full ${showEditModeMessage ? "bg-red hover:bg-secondary hover:text-red" : "bg-highlight hover:bg-primary"}`} 
                                type="submit"
                            >
                                {showEditModeMessage 
                                    ? "Modo de Edição Necessário" 
                                    : (!funcionarioSelecionado ? "Criar perfil" : "Salvar alterações")
                                }
                            </button>
                        </div>
                    </form>                
                </article>
                {funcionarioSelecionado && (
                    <article className="w-full bg-tertiary p-1.5 rounded-sm">
                        <div className={`flex justify-between items-center ${!colapsed ? "pb-0.5 border-b-1 border-card mb-1" : ""}`}>
                            <h1 className="text-4xl font-subrayada w-full text-left">REGISTRO DE HORAS</h1>
                            {colapsed ? (
                                <ChevronDown strokeWidth={0.9} className="icon bg-highlight rounded-sm text-secondary cursor-pointer" size={50} onClick={handleColapse} />
                            ) : (
                                <ChevronUp strokeWidth={0.9} className="icon bg-highlight rounded-sm text-secondary cursor-pointer" size={50} onClick={handleColapse} />
                            )}                
                        </div>
                        {!colapsed && (
                            <>
                                <div className="w-full mb-2 flex items-center justify-center">
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        className="w-full border-b-2 border-primary p-0.5 bg-secondary rounded-t-sm"
                                        onClick={(e) => e.currentTarget.showPicker()}
                                    />
                                </div>
                                <GeneratePoints funcionario_id={funcionarioSelecionado} date={selectedDateISO} canDelete={true} canRefresh={true} />
                            </>
                        )}
                    </article>
                )}
            </main>
        </div>
=======
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
>>>>>>> bea5ea5 (feat: Add main application pages and user context management)
    );
}