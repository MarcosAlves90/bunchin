import axios from "axios";
import PropTypes from "prop-types";
import validator from "validator";
import { useCallback, useContext, useEffect, useState, useMemo, useRef } from "react";
import { UserContext } from "../utils/context/userContext.js";
import { GeneratePoints } from "../components/organisms/PointSystems.jsx";
import { ChevronRight, X, Trash, Search, Pen, ChevronDown, ChevronUp, Lock, PenOff, Shield, CircleUserRound } from "lucide-react";
import { SendEmail } from "../utils/services/sendEmail.js";

interface Funcionario {
    cpf: string;
    nome: string;
    email: string;
    n_registro: string;
    funcao: string;
    cargo: string;
    departamento: string;
}

export default function Administrador() {
    const [indexFuncionario, setIndexFuncionario] = useState(0);
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const { tema, usuario, API_URL } = useContext(UserContext);
    const [inputs, setInputs] = useState<Record<string, string>>({});
    const [colapsed, setColapsed] = useState(true);
    const [lockInputs, setLockInputs] = useState(true);
    const abortControllerRef = useRef<AbortController | null>(null);

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
        const normalizedEmail = validator.normalizeEmail(inputs.email);
        const isEmailValid = normalizedEmail && validator.isEmail(normalizedEmail);
        
        try {
            if (funcionarioSelecionado) {
                await axios.put(`${API_URL}funcionario/${funcionarioSelecionado}`, inputs);
                console.log("Funcionário atualizado com sucesso!");
                await getUsers();
            } else if (isEmailValid) {
                const newPassword = generatePassword();
                const inputsClone = { ...inputs, senha: newPassword };
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
    }, [API_URL, funcionarioSelecionado, inputs]);

    
    const getUsers = useCallback(async (): Promise<void> => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            const response = await axios.get(`${API_URL}funcionario`, {
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
    }, [API_URL, getUsers]);

    function GenerateEmployeesButtons({ funcionarios }: { funcionarios: Funcionario[] }) {
        const filteredFuncionarios = useMemo(() => {
            return funcionarios.filter((funcionario: Funcionario) =>
                funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }, [funcionarios, searchTerm]);

        return (
            <article className={"flex flex-col gap-0.5"}>
                {filteredFuncionarios.filter((funcionario: Funcionario) => String(usuario?.n_registro) !== funcionario.n_registro).map((funcionario: Funcionario) => (
                    <div
                        key={funcionario.cpf}
                        onClick={() => handleEmployeeButtonClick(funcionario)}
                        className={`flex items-center justify-between cursor-pointer border-1 p-0.5 rounded-sm transition-colors hover:bg-tertiary ${funcionarioSelecionado === funcionario.cpf ? "border-highlight text-highlight" : "border-tertiary"}`}
                    >
                        <p className="nome truncate max-w-[160px]">{funcionario.nome}</p>
                        {funcionarioSelecionado === funcionario.cpf ? (
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
        if (funcionarioSelecionado === funcionario.cpf) {
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
            setFuncionarioSelecionado(funcionario.cpf);
            setIndexFuncionario(funcionarios.findIndex(f => f.cpf === funcionario.cpf));
            setLockInputs(true);
        }
    }
    useEffect(() => {
        if (funcionarioSelecionado && funcionarios[indexFuncionario]) {
            const funcionario = funcionarios[indexFuncionario];
            setInputs({
                n_registro: funcionario.n_registro,
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
        <div className={`flex`}>
            <article className={"sidebar pt-[90px] pb-2 pl-1 flex items-center justify-center text-primary"}>
                <div className={"bg-secondary border-tertiary border-1 p-1 h-full flex flex-col rounded-sm gap-1"}>
                    <div className={"div-title flex justify-between items-center"}>
                        <p className={"text-lg"}>Funcionários</p>
                        <CircleUserRound className="cursor-pointer" onClick={clearSelection} />
                    </div>
                    <div className={"relative"}>
                        <input className={"border-b-2 border-primary p-0.5 pr-[2.2rem] bg-tertiary rounded-t-sm"} value={searchTerm} onChange={handleSearchChange} placeholder="Pesquisar funcionários" />
                        <Search
                            className="absolute right-0.5 top-1/2 transform -translate-y-1/2 text-primary"
                        />
                    </div>
                    <GenerateEmployeesButtons funcionarios={funcionarios} />
                </div>
            </article>
            <main className={`mainCommon text-base flex justify-start items-center flex-col gap-2`}>
                <article className={"bg-tertiary rounded-sm p-1.5"}>
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
                                    name={"nome"} onChange={handleChange} disabled={lockInputs} />
                                <GenerateLockIcon />
                            </div>
                            <div className={`article-inputs-input email ${lockInputs ? "locked" : ""}`}>
                                <label>EMAIL</label>
                                <input value={inputs.email || ""} placeholder={"exemplo@gmail.com"} type={"email"}
                                    name={"email"} onChange={handleChange} disabled={lockInputs} />
                                <GenerateLockIcon />
                            </div>
                            <div className={"article-inputs-input n-registro locked"}>
                                <label>REGISTRO</label>
                                <input value={inputs.n_registro || ""} placeholder={"1234567890"} type={"number"}
                                    name={"n_registro"} disabled />
                                <Shield
                                    color={tema === "light" ? "var(--background-color-light-dark-theme)" : "var(--background-color-dark-light-theme)"}
                                />
                            </div>
                            <div className={`article-inputs-input cpf ${lockInputs ? "locked" : ""}`}>
                                <label>CPF</label>
                                <input value={inputs.cpf || ""} placeholder={"12345678900"} type={"number"} name={"cpf"}
                                    onChange={handleChange} disabled={lockInputs} />
                                <GenerateLockIcon />
                            </div>
                            <div className={`article-inputs-input funcao ${lockInputs ? "locked" : ""}`}>
                                <label>FUNÇÃO</label>
                                <select value={inputs.funcao} defaultValue={"comum"} name={"funcao"}
                                    onChange={handleChange} disabled={lockInputs}>
                                    <option value={"comum"}>Comum</option>
                                    <option value={"administrador"}>Administrador</option>
                                </select>
                                <GenerateLockIcon />
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
                                <GenerateLockIcon />
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
                                <GenerateLockIcon />
                            </div>
                        </article>
                        <div className={"container-save-button"}>
                            <button
                                className={`save-button ${lockInputs ? "locked" : ""}`} disabled={lockInputs}>{!funcionarioSelecionado ? "Criar perfil" : "Salvar alterações"}</button>
                        </div>
                    </form>                <div className={`div-title ${funcionarioSelecionado ? "colapse" : ""}`}
                        onClick={funcionarioSelecionado ? handleColapse : undefined}>
                        <h1 className={"title"}>REGISTRO DE HORAS</h1>
                        {funcionarioSelecionado && (
                            colapsed ? (
                                <ChevronDown strokeWidth={0.7} className="icon" size={50} />
                            ) : (
                                <ChevronUp strokeWidth={0.7} className="icon" size={50} />
                            )
                        )}
                    </div>
                    {!colapsed && funcionarioSelecionado && <GeneratePoints canDelete={true} canRefresh={true} cpf={funcionarioSelecionado} />}
                </article>
            </main>
        </div>
    );
}