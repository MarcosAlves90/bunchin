import { useContext, useState } from "react";
import { UserContext } from "../utils/context/userContext.jsx";
import { useNavigate } from "react-router-dom";
import { Undo2} from "lucide-react";
import YellowButton from "../components/YellowButton.jsx";

function ProgressIndicator({ step }: { step: number }) {
    return (
        <div className="flex items-center justify-center mt-2 opacity-80">
            <div
                className={`w-2 h-2 rounded-full flex items-center justify-center
                    ${step >= 1 ? "bg-(--highlight)": "bg-(--text-card)"}
                `}
            />
            <div className={`h-0.5 w-1 ${step === 2 ? "bg-(--highlight)" : "bg-(--text-card)"}`}></div>
            <div
                className={`w-2 h-2 rounded-full flex items-center justify-center
                    ${step === 2 ? "bg-(--highlight)" : "bg-(--text-card)"}
                `}
            />
        </div>
    );
}

export default function Registro() {
    const navigate = useNavigate();
    const { tema } = useContext(UserContext);

    const [step, setStep] = useState(1);

    const [nomeEmpresa, setNomeEmpresa] = useState("");
    const [segmento, setSegmento] = useState("");
    const [numFuncionarios, setNumFuncionarios] = useState("");

    const [nomeCompleto, setNomeCompleto] = useState("");
    const [nRegistro, setNRegistro] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const segmentos = [
        "Tecnologia",
        "Comércio",
        "Indústria",
        "Educação",
        "Saúde",
        "Serviços",
        "Outro"
    ];

    const faixasFuncionarios = [
        "1-20 funcionários",
        "21-50 funcionários",
        "51-100 funcionários",
        "Mais de 100 funcionários"
    ];

    const handleNextStepButtonClick = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    const handleBackButtonClick = () => navigate('/');
    return (
        <div className={`registro-form flex items-center content-center pb-3 h-36 relative`}>
            <div className={"bird-icon-wrapper absolute top-[-3.3rem] left-[-2.1rem]"}
                    onClick={handleBackButtonClick}>
                        <Undo2
                            className={`relative ml-2 hover:!cursor-pointer ${tema == 'dark' ? 'invert' : ''}`}
                            size={32}
                            color={tema === "dark" ? "var(--background-color-navbar-dark)" : "var(--background-color-navbar-light)"}
                            aria-label="Voltar"
                        />
                    {/* <img
                        className={`relative hover:!cursor-pointer ${tema == 'dark' ? 'invert' : ''}`}
                        src="/bunchin_bird_icon.svg"
                        alt="Pássaro do bunchin"
                    />  */}
            </div>
                        <div className="absolute left-1/2 bottom-[0.5rem]">
                            <ProgressIndicator step={step} />
                        </div>
            {step === 1 ? (
                <>
                    <div className={`bg-(--highlight) text-(--primary) items-center px-2 flex flex-col h-full`}>
                        <h2 className={"text-2xl mt-4 font-(family-name:--font-subrayada) font-bold"}>Cadastrando sua empresa!</h2>
                        <p className={"max-w-20 lg:text-xl md:text-md mt-5"}>
                            Preencha os dados iniciais da sua empresa para começar o cadastro.
                        </p>
                    </div>
                    <div className={"bg-(--card) text-(--text-card) flex flex-col items-center self-start h-full px-4 pt-8 relative"}>
                        <form
                            className="form-login min-w-[35vw] w-full flex flex-col items-center"
                            onSubmit={handleNextStepButtonClick}
                        >
                            <div className="text-(--text-card) grid grid-cols-1 md:grid-cols-2 gap-1 w-full">
                                <div className="flex flex-col col-span-2 ">
                                    <label htmlFor="nomeEmpresa" className="text-left">Nome da empresa</label>
                                    <input
                                        type="text"
                                        id="nomeEmpresa"
                                        placeholder="Nome da empresa"
                                        value={nomeEmpresa}
                                        onChange={e => setNomeEmpresa(e.target.value)}
                                        className="mb-2 w-full !pl-3 p-1 bg-(--secondary) border-4 border-(--text-card) font-bold outline-none"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="segmento" className="text-left">Segmento da empresa</label>
                                    <select
                                        id="segmento"
                                        value={segmento}
                                        onChange={e => setSegmento(e.target.value)}
                                        className="mb-2 w-full p-1 bg-(--secondary) border-4 border-(--text-card) font-bold outline-none"
                                        required
                                    >
                                        <option value="" disabled>Selecione o segmento</option>
                                        {segmentos.map(seg => (
                                            <option key={seg} value={seg}>{seg}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="numFuncionarios" className="text-left">Número de funcionários</label>
                                    <select
                                        id="numFuncionarios"
                                        value={numFuncionarios}
                                        onChange={e => setNumFuncionarios(e.target.value)}
                                        className="mb-2 w-full p-1 bg-(--secondary) border-4 border-(--text-card) font-bold outline-none"
                                        required
                                    >
                                        <option value="" disabled>Selecione a faixa</option>
                                        {faixasFuncionarios.map(faixa => (
                                            <option key={faixa} value={faixa}>{faixa}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <YellowButton
                                text="Avançar"
                                type="submit"
                                aria-label="Avançar"
                                className="mt-2"
                            />
                        </form>
                    </div>
                </>
            ) : (
                <>
                    <div className={"bg-(--card) text-(--text-card) flex flex-col items-center self-start h-full px-4 py-3"}>
                        <form
                            className="form-login min-w-[35vw] w-full flex flex-col items-center"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 w-full">
                                <div className="flex flex-col md:col-span-2">
                                    <label htmlFor="nomeCompleto" className="text-left">Nome completo</label>
                                    <input
                                        type="text"
                                        id="nomeCompleto"
                                        placeholder="Seu nome completo"
                                        value={nomeCompleto}
                                        onChange={e => setNomeCompleto(e.target.value)}
                                        className="mb-2 w-full !pl-3 p-1 bg-(--secondary) border-4 border-(--text-card) font-bold outline-none"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="nRegistro" className="text-left">Nº de registro</label>
                                    <input
                                        type="text"
                                        id="nRegistro"
                                        placeholder="Número de registro"
                                        value={nRegistro}
                                        onChange={e => setNRegistro(e.target.value)}
                                        className="mb-2 w-full !pl-3 p-1 bg-(--secondary) border-4 border-(--text-card) font-bold outline-none"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="cpf" className="text-left">CPF</label>
                                    <input
                                        type="text"
                                        id="cpf"
                                        placeholder="Seu CPF"
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}
                                        className="mb-2 w-full !pl-3 p-1 bg-(--secondary) border-4 border-(--text-card) font-bold outline-none"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="email" className="text-left">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Seu email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="mb-2 w-full !pl-3 p-1 bg-(--secondary) border-4 border-(--text-card) font-bold outline-none"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col relative">
                                    <label htmlFor="senha" className="text-left">Senha</label>
                                    <input
                                        type="password"
                                        id="senha"
                                        placeholder="Crie uma senha"
                                        value={senha}
                                        onChange={e => setSenha(e.target.value)}
                                        className="mb-2 w-full !pl-3 p-1 bg-(--secondary) border-4 border-(--text-card) font-bold outline-none pr-8"
                                        required
                                    />
                                    
                                    {/* {!passwordVisibility &&
                                        <Eye
                                            className={"absolute top-[1.3rem] !left-[unset] right-1 !transition-(--common-transition) hover:!cursor-pointer hover:!scale-[1.2]"}
                                            color={tema === "dark" ? "var(--background-color-navbar-dark)" : "var(--background-color-navbar-light)"}
                                            onClick={handlePasswordVisibility}
                                            aria-label="Mostrar senha"
                                            role="button"
                                            tabIndex={0}
                                        />
                                    } */}
                                </div>
                            </div>
                            <YellowButton
                                text="Finalizar cadastro"
                                type="submit"
                                aria-label="Finalizar cadastro"
                                className="mt-2"
                            />
                        </form>
                    </div>
                    <div className={`bg-(--highlight) text-(--primary) items-center px-2 flex flex-col h-full`}>
                        <h2 className={"text-2xl mt-4 font-(family-name:--font-subrayada) font-bold"}>Quase lá!</h2>
                        <p className={"left-side-p max-w-20 lg:text-2xl md:text-lg mt-3"}>
                            Por padrão, o primeiro funcionário é cadastrado como um administrador do RH, podendo atualizar dados e cadastrar outros funcionários na plataforma. Essas informações poderão ser alteradas posteriormente na página de perfil do usuário.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}