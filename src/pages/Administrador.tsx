import axios from "axios";
import PropTypes from "prop-types";
import validator from "validator";
import { useCallback, useContext, useEffect, useState, useMemo, useRef } from "react";
import { UserContext } from "../utils/context/userContext.js";
import { GeneratePoints } from "../components/organisms/PointSystems.jsx";
import { ChevronRight, X, Trash, Search, Pen, ChevronDown, ChevronUp, Lock, PenOff, Shield, UserRoundPlus, PanelLeft, PanelLeftDashed } from "lucide-react";
import { SendEmail } from "../utils/services/sendEmail.js";
import { EmployeeSkeleton } from "../components/atoms/EmployeeSkeleton.tsx";
import { InputsType, Funcionario } from "../types/interfaces";

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
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    }    function sendEmail(password: string) {
        // @ts-ignore
        SendEmail(import.meta.env.VITE_PUBLIC_API_KEY_S,
            // @ts-ignore
            import.meta.env.VITE_SERVICE_API_KEY_S,
            // @ts-ignore
            import.meta.env.VITE_TEMPLATE_API_KEY_1_S, {
            email: inputs.email,
            password: password,
            name: inputs.nome
        });
    }    const handleSubmit = useCallback(async (event: React.FormEvent) => {
        event.preventDefault();
        
        if (funcionarioSelecionado && lockInputs) {
            setShowEditModeMessage(true);
            setTimeout(() => {
                setShowEditModeMessage(false);
            }, 5000);
            return;
        }
        
        const normalizedEmail = validator.normalizeEmail(inputs.email);
        const isEmailValid = normalizedEmail && validator.isEmail(normalizedEmail);
        
        try {
            if (funcionarioSelecionado) {
                await axios.put(`${API_URL}funcionario/${funcionarioSelecionado}`, inputs);
                console.log("Funcionário atualizado com sucesso!");
                await getUsers();
            } else if (isEmailValid) {
                const newPassword = generatePassword();
                const inputsClone: InputsType = { 
                    ...inputs, 
                    senha: newPassword,
                    organizacao: { 
                        idOrganizacao: usuario?.organizacao?.idOrganizacao || 1 
                    }
                };
                if ('n_registro' in inputsClone) {
                    delete inputsClone.n_registro;
                }
                sendEmail(newPassword);
                console.log(newPassword);
                await axios.post(`${API_URL}funcionario`, inputsClone);
                console.log("Funcionário criado com sucesso!");
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
            } else {
                console.log('Email inválido');
            }
        } catch (error) {
            console.error("Erro ao processar funcionário:", error);
        }
    }, [API_URL, funcionarioSelecionado, inputs, lockInputs]);

    const getUsers = useCallback(async (): Promise<void> => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        setIsLoading(true);

        try {
            const response = await axios.get(`${API_URL}funcionario/organizacao/${usuario.organizacao_id}`, {
                signal: controller.signal
            });
            
            if (!controller.signal.aborted) {
                console.log(response.data);
                setFuncionarios(response.data);
            }
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("Requisição de funcionários cancelada:", error.message);
                return;
            }
            
            console.error("Erro ao buscar funcionários:", error);
            setFuncionarios([]);
        } finally {
            if (!controller.signal.aborted) {
                setIsLoading(false);
            }
        }
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
            setIndexFuncionario(funcionarios.findIndex(f => f.n_registro === funcionario.n_registro));
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
    }, [funcionarioSelecionado, indexFuncionario]);

    const clearSelection = useCallback(() => {
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
    }, []);

    const handleLockInputs = useCallback(() => setLockInputs(prev => !prev), []);

    const userFields = useMemo(() => [
        {
            label: "NOME COMPLETO",
            name: "nome",
            type: "input",
            inputType: "text",
            placeholder: "Digite seu nome aqui",
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
            placeholder: "",
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
                    />
                }
            </>
        );
    }    return (
        <div className={`flex`}>
            <article className={`sidebar pt-[90px] pb-2 flex items-center justify-center text-primary transition-all duration-500 ease-in-out ${sidebarCollapsed ? 'max-w-0 pl-0 overflow-hidden' : 'max-w-[280px] pl-1'}`}>
                <div className={`bg-secondary border-tertiary border-1 p-1 h-full flex flex-col rounded-sm min-w-17 gap-1 transition-all duration-500 ease-in-out ${sidebarCollapsed ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                    <div className={"div-title flex justify-between items-center"}>
                        <p className={"text-lg"}>Funcionários</p>
                        <div>
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
                                            className={`border-b-2 p-0.5 rounded-t-sm focus:border-highlight ${field.disabled ? 'pointer-events-none' : ''} ${field.name === 'n_registro' ? 'bg-card border-placeholder' : 'bg-secondary border-primary'}`}
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
                                        <Shield className="absolute right-0.5 top-1/2 text-placeholder"/>
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
    );
}