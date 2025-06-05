
import { useContext, useEffect } from "react";
import { UserContext } from "../utils/userContext.jsx";
import { useNavigate } from "react-router-dom";
import { UserRound, Eye, EyeOff } from "lucide-react";
import useLoginForm from "../utils/hooks/useLoginForm";
import useLoadingDots from "../utils/hooks/useLoadingDots";

export default function Login() {
    const navigate = useNavigate();
    const { tema, usuario, setUsuario, API_URL } = useContext(UserContext);
    const {
        email,
        setEmail,
        senha,
        setSenha,
        error,
        loading,
        passwordVisibility,
        handlePasswordVisibility,
        handleLoginButtonClick,
    } = useLoginForm(API_URL, setUsuario, navigate);
    
    const loadingDots = useLoadingDots(loading);

    useEffect(() => {
        if (usuario) {
            navigate('/pontos');
        }
    }, [usuario, navigate]);

    const handleBackButtonClick = () => navigate('/');
    const handleResetPasswordButtonClick = () => navigate('/resetar-senha');

    return (
        <>
            <img className={`login-penas-left ${tema === "dark" ? "invert" : ""}`}
                src={"https://res.cloudinary.com/dflvo098t/image/upload/penas_esquerda_login_rmo2aj.svg"}
                alt={"Penas à esquerda"} />
            <img className={`login-penas-right ${tema === "dark" ? "invert" : ""}`}
                src={"https://res.cloudinary.com/dflvo098t/image/upload/penas_direita_login_c14tob.svg"}
                alt={"Penas à direita"} />
            <div className={`login-form flex items-center content-center pb-3 max-h-36 h-full relative`}>
                <div className={"bird-icon-wrapper absolute top-[-3.3rem] left-[-2.1rem] cursor-pointer"}
                    onClick={handleBackButtonClick}>
                    <img
                        className={`bird-icon ${tema === "dark" ? "invert" : ""}`}
                        src="https://res.cloudinary.com/dflvo098t/image/upload/bunchin_bird_icon_r8mgim.svg"
                        alt="Pássaro do bunchin"
                    /> 
                </div>
                <div className={`bg-highlight text-primary items-center justify-center px-2 pt-2 flex flex-col h-full max-w-27 rounded-tl-sm`}>
                    <h2 className={"text-2xl font-subrayada font-bold"}>Não Possui um Cadastro?</h2>
                    <img className={`left-side-crow my-2 h-14 ${tema === "dark" ? "invert" : ""}`} src="https://res.cloudinary.com/dflvo098t/image/upload/login_crow_tq7jng.svg" alt="" />
                    <p className={"left-side-p text-xl m-0"}>Entre em contato com o departamento pessoal da sua
                        empresa para que eles criem seu acesso.</p>
                </div>
                <div className={"bg-tertiary text-primary flex flex-col text-base items-center justify-center self-start h-full px-2 rounded-tr-sm"}>
                    <img className={`mb-4.5 w-[90%] ${tema === "dark" ? "invert" : ""}`} src="https://res.cloudinary.com/dflvo098t/image/upload/iniciando_sessao_title_d5bzll.svg" alt="" />
                    <form className={"form-login w-full flex flex-col items-center"} onSubmit={handleLoginButtonClick}>
                        <div className={"flex flex-col w-full"}>
                            <label htmlFor="email" className="w-full text-start">EMAIL OU CPF</label>
                            <div className="wrapper relative w-full flex items-center group">
                                <input
                                    type="text"
                                    id="email"
                                    placeholder="Email ou CPF"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    aria-label="Email ou CPF"
                                    autoComplete="username"
                                    className="border-b-2 w-full border-primary p-0.5 bg-secondary rounded-t-sm group-focus-within:border-highlight pr-2.5"
                                />
                                <UserRound className="absolute right-0.5 top-1/2 -translate-y-1/2 text-primary group-focus-within:text-highlight pointer-events-none" />
                            </div>
                        </div>
                        <div className={"flex flex-col w-full mt-2"}>
                            <label htmlFor="senha" className="w-full text-start">SENHA</label>
                            <div className="wrapper relative w-full flex items-center group">
                                <input
                                    type={passwordVisibility ? "text" : "password"}
                                    id="senha"
                                    placeholder="Senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    aria-label="Senha"
                                    autoComplete="current-password"
                                    className={"border-b-2 w-full border-primary p-0.5 bg-secondary rounded-t-sm group-focus-within:border-highlight pr-2.5"}
                                />
                                {passwordVisibility &&
                                    <Eye
                                        className={"absolute right-0.5 top-1/2 -translate-y-1/2 text-primary group-focus-within:text-highlight cursor-pointer"}
                                        onClick={handlePasswordVisibility}
                                        aria-label="Mostrar senha"
                                        role="button"
                                        tabIndex={0}
                                    />
                                }
                                {!passwordVisibility &&
                                    <EyeOff
                                        className={"absolute right-0.5 top-1/2 -translate-y-1/2 text-primary group-focus-within:text-highlight cursor-pointer"}
                                        onClick={handlePasswordVisibility}
                                        aria-label="Ocultar senha"
                                        role="button"
                                        tabIndex={0}
                                    />
                                }
                            </div>
                        </div>
                        <p className={"reset-password place-self-end text-highlight mt-[0.3rem] mb-2 transition-colors cursor-pointer hover:text-primary"} onClick={handleResetPasswordButtonClick} aria-label="Esqueci a senha">Esqueci a senha</p>                        <button
                            type={"submit"}
                            value={"Submit"}
                            className={`border-none transition text-lg px-2 py-[0.7rem] rounded-sm text-secondary cursor-pointer font-medium max-w-20 w-full ${error ? "bg-red hover:bg-secondary hover:text-red" : "bg-highlight hover:bg-primary"}`}
                            disabled={loading}
                            aria-label="Iniciar sessão"
                        >
                            <i className="bi bi-feather2 left"></i>
                            {loading ? `Carregando${loadingDots}` : error ? error : "Iniciar"}
                            <i className="bi bi-feather2 right"></i>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
