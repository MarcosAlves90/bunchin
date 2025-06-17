import { useState, useCallback, useEffect, useRef, useMemo, useContext } from "react";
import axios from "axios";
import validator from "validator";
import { UserContext } from "../context/userContext";
import { SendEmail } from "../services/sendEmail";
import { Funcionario, InputsType } from "../../types/interfaces";
import { validateCPF, formatCPF } from "../validateCPF";

export function useAdminLogic() {
    const [indexFuncionario, setIndexFuncionario] = useState(0);
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const { tema, usuario, API_URL } = useContext(UserContext);
    const [inputs, setInputs] = useState<Record<string, string>>({
        n_registro: "",
        nome: "",
        email: "",
        cpf: "",
        funcao: "comum",
        cargo: "estagiario",
        departamento: "administrativo"
    });
    const [colapsed, setColapsed] = useState(true);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [lockInputs, setLockInputs] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [showEditModeMessage, setShowEditModeMessage] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [cpfError, setCpfError] = useState("");
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
    }, [selectedDate]);

    const handleColapse = useCallback(() => setColapsed(prev => !prev), []);
    const handleSidebarCollapse = useCallback(() => setSidebarCollapsed(prev => !prev), []);
    const handleDateChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    }, []);    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = event.target.name;
        let value = event.target.value;
        
        if (name === 'cpf') {
            const cleanValue = value.replace(/\D/g, '');
            if (cleanValue.length <= 11) {
                value = formatCPF(cleanValue);
            } else {
                return;
            }
        }
        
        setInputs(values => ({ ...values, [name]: value }));
        
        if (name === 'cpf' && cpfError) {
            setCpfError("");
        }
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
    }

    function sendEmail(password: string) {
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
    }

    const getUsers = useCallback(async (): Promise<void> => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        setIsLoading(true);

        try {
            const response = await axios.get(`${API_URL}funcionario/organizacao/${usuario?.organizacao?.idOrganizacao ?? 1}`, {
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
    const handleSubmit = useCallback(async (event: React.FormEvent) => {
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

        const isCPFValid = validateCPF(inputs.cpf);
        
        if (!isCPFValid) {
            setCpfError("CPF inválido");
            setTimeout(() => {
                setCpfError("");
            }, 5000);
            return;
        }

        if (!isEmailValid) {
            console.log('Email inválido');
            return;
        }
        setCpfError("");
        setLoadingSubmit(true);
        try {
            const cleanedInputs = {
                ...inputs,
                cpf: inputs.cpf.replace(/\D/g, '')
            };

            if (funcionarioSelecionado) {
                // Remove o CPF dos dados a serem atualizados para evitar tentativa de edição
                const { cpf, ...updateData } = cleanedInputs;
                await axios.put(`${API_URL}funcionario/${funcionarioSelecionado}`, updateData);
                console.log("Funcionário atualizado com sucesso!");
                await getUsers();
                setShowSuccessMessage(true);
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 5000);
            } else {
                const newPassword = generatePassword();
                const inputsClone: InputsType = {
                    ...cleanedInputs,
                    senha: newPassword,
                    organizacao: {
                        idOrganizacao: usuario?.organizacao?.idOrganizacao ?? 1
                    }
                };
                if ('n_registro' in inputsClone) {
                    delete inputsClone.n_registro;
                }
                
                await axios.post(`${API_URL}funcionario`, inputsClone);
                console.log("Funcionário criado com sucesso!");
                
                sendEmail(newPassword);
                console.log("Email com senha enviado para:", inputs.email);
                
                await getUsers();
                clearForm();
                setShowSuccessMessage(true);
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 5000);
            }
        } catch (error) {
            console.error("Erro ao processar funcionário:", error);
        }
        finally {
            setLoadingSubmit(false);
        }
    }, [API_URL, funcionarioSelecionado, inputs, lockInputs, getUsers, usuario?.organizacao?.idOrganizacao, setCpfError]);

    const clearForm = () => {
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
    };

    const deleteUser = useCallback(async (cpf: string): Promise<void> => {
        try {
            await axios.delete(`${API_URL}funcionario/${cpf}`);
            console.log("Funcionário deletado com sucesso!");
            await getUsers();
            clearForm();
        } catch (error) {
            console.error("Erro ao deletar funcionário:", error);
        }
    }, [API_URL, getUsers]);

    const handleEmployeeButtonClick = (funcionario: Funcionario) => {
        if (funcionarioSelecionado === String(funcionario.n_registro)) {
            clearForm();
        } else {
            setFuncionarioSelecionado(String(funcionario.n_registro));
            setIndexFuncionario(funcionarios.findIndex(f => f.n_registro === funcionario.n_registro));
            setLockInputs(true);
        }
    };

    const clearSelection = useCallback(() => {
        clearForm();
    }, []);

    const handleLockInputs = useCallback(() => setLockInputs(prev => !prev), []);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);
    useEffect(() => {
        if (funcionarioSelecionado && funcionarios[indexFuncionario]) {
            const funcionario = funcionarios[indexFuncionario];
            setInputs({
                n_registro: String(funcionario.n_registro),
                nome: funcionario.nome,
                email: funcionario.email,
                cpf: formatCPF(funcionario.cpf), // Aplica a máscara do CPF
                funcao: funcionario.funcao,
                cargo: funcionario.cargo,
                departamento: funcionario.departamento
            });
        }
        console.log(funcionarioSelecionado);
    }, [funcionarioSelecionado, indexFuncionario]);
    return {
        // State
        funcionarios,
        funcionarioSelecionado,
        searchTerm,
        inputs,
        colapsed,
        sidebarCollapsed,
        lockInputs,
        isLoading,
        showEditModeMessage,
        loadingSubmit,
        showSuccessMessage,
        selectedDate,
        selectedDateISO,
        tema,
        usuario,
        cpfError,
        
        // Handlers
        handleColapse,
        handleSidebarCollapse,
        handleDateChange,
        handleChange,
        handleSearchChange,
        handleSubmit,
        handleEmployeeButtonClick,
        clearSelection,
        handleLockInputs,
        deleteUser
    };
}
