import { useContext, useState, useEffect } from "react";
import { UserContext } from "../utils/context/userContext.jsx";
import { useNavigate } from "react-router-dom";
import ProgressIndicator from "../components/molecules/ProgressIndicator";
import axios from "axios";
import { validateCNPJ, formatCNPJ } from "../utils/validateCNPJ";
import { validatePhone, formatPhone } from "../utils/validatePhone";
import { validateCPF, formatCPF } from "../utils/validateCPF";

export default function Registro() {
    const navigate = useNavigate();
    const { tema, usuario, API_URL } = useContext(UserContext);

    useEffect(() => {
        if (usuario) {
            navigate('/pontos');
        }
    }, [usuario, navigate]);

    const [step, setStep] = useState(1); const [nomeEmpresa, setNomeEmpresa] = useState("");
    const [cnpjEmpresa, setCnpjEmpresa] = useState("");
    const [enderecoEmpresa, setEnderecoEmpresa] = useState("");
    const [telefoneEmpresa, setTelefoneEmpresa] = useState("");
    const [emailEmpresa, setEmailEmpresa] = useState("");
    const [nomeCompleto, setNomeCompleto] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [cnpjError, setCnpjError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [cpfError, setCpfError] = useState("");    const handleNextStepButtonClick = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validar CNPJ antes de avançar
        const isCNPJValid = validateCNPJ(cnpjEmpresa);
        const isPhoneValid = validatePhone(telefoneEmpresa);
        
        if (!isCNPJValid) {
            setCnpjError("CNPJ inválido");
            setTimeout(() => {
                setCnpjError("");
            }, 5000);
        }
        
        if (!isPhoneValid) {
            setPhoneError("Telefone inválido");
            setTimeout(() => {
                setPhoneError("");
            }, 5000);
        }
        
        if (!isCNPJValid || !isPhoneValid) {
            return;
        }
        
        setCnpjError("");
        setPhoneError("");
        setStep(2);
    };
    const isStep1Complete = () => {
        return nomeEmpresa.trim() !== "" &&
            cnpjEmpresa.trim() !== "" &&
            enderecoEmpresa.trim() !== "" &&
            telefoneEmpresa.trim() !== "" &&
            emailEmpresa.trim() !== "" &&
            !cnpjError &&
            !phoneError;
    };

    const isStep2Complete = () => {
        return nomeCompleto.trim() !== "" &&
            cpf.trim() !== "" &&
            email.trim() !== "" &&
            senha.trim() !== "" &&
            !cpfError;
    };

    const canNavigateToStep = (targetStep: number) => {
        if (targetStep === 1) {
            return true;
        }
        if (targetStep === 2) {
            return isStep1Complete();
        }
        return false;
    };

    const handleStepClick = (targetStep: number) => {
        if (canNavigateToStep(targetStep)) {
            setStep(targetStep);
        }
    };

    const handleFinishRegistration = async (e: React.FormEvent) => {
        e.preventDefault();
        
        console.log('handleFinishRegistration chamada');
        console.log('isStep2Complete():', isStep2Complete());
        console.log('API_URL:', API_URL);
        
        // Validar CPF antes de finalizar
        const isCPFValid = validateCPF(cpf);
        
        if (!isCPFValid) {
            setCpfError("CPF inválido");
            setTimeout(() => {
                setCpfError("");
            }, 5000);
            return;
        }
        
        if (!isStep2Complete()) {
            console.log('Step 2 não está completo, retornando');
            return;
        }

        setIsLoading(true);
        setError("");
        setCpfError("");

        try {
            const requestBody = {
                nome: nomeEmpresa,
                cnpj: cnpjEmpresa.replace(/\D/g, ''), // Remove formatação antes de enviar
                endereco: enderecoEmpresa,
                telefone: telefoneEmpresa, // Mantém formatação
                email: emailEmpresa,
                adminNome: nomeCompleto,
                adminEmail: email,
                adminSenha: senha,
                adminCpf: cpf.replace(/\D/g, '') // Remove formatação antes de enviar
            };

            console.log('Dados do registro:', requestBody);
            console.log('URL completa:', `${API_URL}organizacao`);

            const response = await axios.post(`${API_URL}organizacao`, requestBody);

            console.log('Organização cadastrada com sucesso:', response.data);
            
            navigate('/login');
            
        } catch (error: any) {
            console.error('Erro ao cadastrar organização:', error);
            setError(
                error.response?.data?.message || 
                'Erro ao cadastrar organização. Tente novamente.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackButtonClick = () => navigate('/');
    return (
        <div className={`registro-form flex items-center content-center pb-3 h-36 relative before:rounded-br-sm`}>
            <div className={"bird-icon-wrapper absolute top-[-3.3rem] left-[-2.1rem] cursor-pointer"}
                onClick={handleBackButtonClick}>
                <img
                    className={`bird-icon ${tema === "dark" ? "invert" : ""}`}
                    src="https://res.cloudinary.com/dflvo098t/image/upload/bunchin_bird_icon_r8mgim.svg"
                    alt="Pássaro do bunchin"
                />
            </div>
            <div className="absolute left-1/2 bottom-[0.5rem]">
                <ProgressIndicator
                    step={step}
                    onStepClick={handleStepClick}
                    canNavigateToStep={canNavigateToStep}
                />
            </div>
            {step === 1 ? (
                <>
                    <div className={`bg-(--highlight) rounded-tl-sm text-(--primary) items-center px-2 flex flex-col h-full justify-center`}>
                        <p className={"max-w-20 text-xl text-justify"}>
                            Preencha os dados iniciais da sua empresa para começar o cadastro.<br />
                            Essas informações são essenciais para criar o perfil da organização e garantir a segurança dos dados.<br />
                            Certifique-se de preencher todos os campos corretamente antes de avançar para a próxima etapa.
                        </p>
                    </div>
                    <div className={"bg-(--tertiary) rounded-tr-sm text-(--primary) flex flex-col items-center justify-center self-start h-full px-2 pt-2 relative"}>
                        <h2 className={"text-3xl font-(family-name:--font-subrayada) font-bold mb-2"}>Cadastrando sua empresa!</h2>
                        <form
                            className="form-login min-w-[35vw] w-full flex flex-col items-center justify-end gap-2"
                            onSubmit={handleNextStepButtonClick}
                        >
                            <div className="text-(--primary) grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                                <div className="flex flex-col group">
                                    <label htmlFor="nomeEmpresa" className="text-left">Nome da Empresa</label>
                                    <input
                                        type="text"
                                        id="nomeEmpresa"
                                        placeholder="Nome da empresa"
                                        value={nomeEmpresa}
                                        onChange={e => setNomeEmpresa(e.target.value)}
                                        className="border-b-2 w-full border-primary p-0.5 bg-secondary rounded-t-sm group-focus-within:border-highlight pr-2.5"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col w-full group">
                                    <label htmlFor="cnpjEmpresa" className="text-left">CNPJ</label>
                                    <input
                                        type="text"
                                        id="cnpjEmpresa"
                                        placeholder="00.000.000/0000-00"
                                        value={cnpjEmpresa}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const cleanValue = value.replace(/\D/g, '');
                                            if (cleanValue.length <= 14) {
                                                setCnpjEmpresa(formatCNPJ(cleanValue));
                                            }
                                            if (cnpjError) {
                                                setCnpjError("");
                                            }
                                        }}
                                        className="border-b-2 w-full p-0.5 bg-secondary rounded-t-sm group-focus-within:border-highlight pr-2.5 border-primary"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col w-full group">
                                    <label htmlFor="telefoneEmpresa" className="text-left">Telefone</label>
                                    <input
                                        type="tel"
                                        id="telefoneEmpresa"
                                        placeholder="(00) 00000-0000"
                                        value={telefoneEmpresa}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const cleanValue = value.replace(/\D/g, '');
                                            if (cleanValue.length <= 11) {
                                                setTelefoneEmpresa(formatPhone(cleanValue));
                                            }
                                            if (phoneError) {
                                                setPhoneError("");
                                            }
                                        }}
                                        className="border-b-2 w-full border-primary p-0.5 bg-secondary rounded-t-sm group-focus-within:border-highlight pr-2.5"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col group">
                                    <label htmlFor="emailEmpresa" className="text-left">Email da Empresa</label>
                                    <input
                                        type="email"
                                        id="emailEmpresa"
                                        placeholder="contato@empresa.com"
                                        value={emailEmpresa}
                                        onChange={e => setEmailEmpresa(e.target.value)}
                                        className="border-b-2 w-full border-primary p-0.5 bg-secondary rounded-t-sm group-focus-within:border-highlight pr-2.5"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col col-span-2 group">
                                    <label htmlFor="enderecoEmpresa" className="text-left">Endereço</label>
                                    <input
                                        type="text"
                                        id="enderecoEmpresa"
                                        placeholder="Endereço completo da empresa"
                                        value={enderecoEmpresa}
                                        onChange={e => setEnderecoEmpresa(e.target.value)}
                                        className="border-b-2 w-full border-primary p-0.5 bg-secondary rounded-t-sm group-focus-within:border-highlight pr-2.5"
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type={"submit"}
                                value={"Submit"}
                                className={`border-none transition text-lg px-2 py-[0.7rem] rounded-sm cursor-pointer font-medium max-w-20 w-full ${
                                    cnpjError || phoneError ? "bg-red text-secondary hover:bg-secondary hover:text-red cursor-not-allowed" :
                                    isStep1Complete() ? "bg-highlight hover:bg-primary text-secondary" : "bg-gray-400 cursor-not-allowed text-secondary"
                                }`}
                                disabled={!isStep1Complete() || !!cnpjError || !!phoneError}
                                aria-label="Avançar"
                            >
                                <i className="bi bi-feather2 left"></i>
                                {cnpjError ? "CNPJ inválido" : phoneError ? "Telefone inválido" : "Avançar"}
                                <i className="bi bi-feather2 right"></i>
                            </button>
                        </form>
                    </div>
                </>
            ) : (
                <>
                    <div className={"bg-(--tertiary) rounded-tl-sm text-(--primary) flex flex-col items-center justify-center self-start h-full px-2 pt-2"}>
                        <h2 className={"text-3xl mb-2 font-(family-name:--font-subrayada) font-bold"}>Estamos Quase lá!</h2>
                        <form
                            className="form-login min-w-[35vw] w-full flex flex-col gap-2 items-center"
                            onSubmit={handleFinishRegistration}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start w-full">
                                <div className="wrapper relative w-full flex flex-col items-start group">
                                    <label htmlFor="nomeCompleto" className="text-left">Nome completo</label>
                                    <input
                                        type="text"
                                        id="nomeCompleto"
                                        placeholder="Seu nome completo"
                                        value={nomeCompleto}
                                        onChange={e => setNomeCompleto(e.target.value)}
                                        className="border-b-2 w-full border-primary p-0.5 bg-secondary rounded-t-sm group-focus-within:border-highlight pr-2.5"
                                        required
                                    />
                                </div>
                                <div className="wrapper relative w-full flex flex-col items-start group">
                                    <label htmlFor="cpf" className="text-left">CPF</label>
                                    <input
                                        type="text"
                                        id="cpf"
                                        placeholder="000.000.000-00"
                                        value={cpf}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const cleanValue = value.replace(/\D/g, '');
                                            if (cleanValue.length <= 11) {
                                                setCpf(formatCPF(cleanValue));
                                            }
                                            if (cpfError) {
                                                setCpfError("");
                                            }
                                        }}
                                        className="border-b-2 w-full border-primary p-0.5 bg-secondary rounded-t-sm group-focus-within:border-highlight pr-2.5"
                                        required
                                    />
                                </div>
                                <div className="wrapper relative w-full flex flex-col items-start group">
                                    <label htmlFor="email" className="text-left">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Seu email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="border-b-2 w-full border-primary p-0.5 bg-secondary rounded-t-sm group-focus-within:border-highlight pr-2.5"
                                        required
                                    />
                                </div>
                                <div className="wrapper relative w-full flex flex-col items-start group">
                                    <label htmlFor="senha" className="text-left">Senha</label>
                                    <input
                                        type="password"
                                        id="senha"
                                        placeholder="Crie uma senha"
                                        value={senha}
                                        onChange={e => setSenha(e.target.value)}
                                        className="border-b-2 w-full border-primary p-0.5 bg-secondary rounded-t-sm group-focus-within:border-highlight pr-2.5"
                                        required
                                    />
                                </div>
                                </div>
                            
                            {error && (
                                <div className="text-red-500 text-sm mt-2 text-center">
                                    {error}
                                </div>
                            )}
                            
                            <button
                                type={"submit"}
                                value={"Submit"}
                                className={`border-none transition text-lg px-2 py-[0.7rem] rounded-sm cursor-pointer font-medium max-w-20 w-full ${
                                    cpfError ? "bg-red text-secondary hover:bg-secondary hover:text-red cursor-not-allowed" :
                                    isStep2Complete() && !isLoading 
                                        ? "bg-highlight hover:bg-primary text-secondary" 
                                        : "bg-gray-400 cursor-not-allowed text-secondary"
                                }`}
                                disabled={!isStep2Complete() || isLoading || !!cpfError}
                                aria-label="Finalizar cadastro"
                            >
                                <i className="bi bi-feather2 left"></i>
                                {cpfError ? "CPF inválido" : isLoading ? 'Cadastrando...' : 'Finalizar'}
                                <i className="bi bi-feather2 right"></i>
                            </button>
                        </form>
                    </div>
                    <div className={`bg-(--highlight) rounded-tr-sm text-(--primary) px-2 flex flex-col h-full items-center justify-center`}>
                        <p className={"left-side-p max-w-20 text-xl text-justify"}>
                            Por padrão, o primeiro funcionário é cadastrado como um administrador do RH, podendo atualizar dados e cadastrar outros funcionários na plataforma. Essas informações poderão ser alteradas posteriormente na página de perfil do usuário.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}
