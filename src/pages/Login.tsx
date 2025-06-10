
import { useContext, useEffect } from "react";
import { UserContext } from "../utils/context/userContext.jsx";
import { useNavigate } from "react-router-dom";
import { UserRound, Lock, Eye, EyeOff } from "lucide-react";
import YellowButton from "../components/YellowButton.jsx";
import { useLoginForm } from "../utils/hooks/useLoginForm";

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

    useEffect(() => {
        if (usuario) {
            navigate('/pontos');
        }
    }, [usuario, navigate]);

    const handleBackButtonClick = () => navigate('/');
    const handleResetPasswordButtonClick = () => navigate('/resetar-senha');

    return (
        <>
            <img className={`login-penas-left fixed animate-(float) ${tema}`} 
                src={"/penas_esquerda_login.svg"}
                alt={"Penas à esquerda"} />
            <img className={`login-penas-right ${tema}`}
                src={"/penas_direita_login.svg"}
                alt={"Penas à direita"} />
            <div className={`login-form flex items-center content-center pb-3 h-36 relative`}>
                <div className={"bird-icon-wrapper absolute top-[-3.3rem] left-[-2.1rem]"}
                    onClick={handleBackButtonClick}>
                    <img
                        className={`relative hover:!cursor-pointer ${tema == 'dark' ? 'invert' : ''}`}
                        src="/bunchin_bird_icon.svg"
                        alt="Pássaro do bunchin"
                    /> 
                </div>
                <div className={`bg-(--highlight) text-(--primary) items-center px-2 flex flex-col h-full`}>
                    <h2 className={"text-2xl mt-4 font-(family-name:--font-subrayada)"}>Não Possui um Cadastro?</h2>
                    <img className={`my-2 ${tema == 'dark' ? 'invert' : ''}`} src="/login_crow.svg" alt="" />
                    <p className={"left-side-p max-w-20 lg:text-2xl md:text-lg m-0"}>Entre em contato com o departamento pessoal da sua
                        empresa para que eles criem seu acesso.</p>
                </div>
                <div className={"bg-(--card) text-(--text-card) flex flex-col items-center self-start h-full px-4 pb-4"}>
                    <img className={`title-sessao h-4 mt-3 mb-3 ${tema == 'dark' ? 'invert' : ''}`} src="/iniciando_sessao_title.svg" alt="" />
                    <form className={"form-login min-w-[35vw] w-full flex flex-col items-center"}>
                        <label htmlFor="email" className="w-full text-left">EMAIL OU CPF</label>
                        <div className={"w-full relative mb-3"}>
                            <input
                                type="text"
                                id="email"
                                placeholder="Email ou CPF"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-label="Email ou CPF"
                                autoComplete="username"
                                className={"w-full !pl-3 p-1 bg-(--secondary) border-4 border-(--text-card) font-bold outline-none"}
                            />
                            <UserRound
                                color={"var(--text-card)"} className="absolute top-[1.1rem] left-1" />
                        </div>
                        <label htmlFor="senha" className="w-full text-left">SENHA</label>
                        <div className={"w-full relative"}>
                            <input
                                type={passwordVisibility ? "text" : "password"}
                                id="senha"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                aria-label="Senha"
                                autoComplete="current-password"
                                className={"w-full !pl-3 p-1 bg-(--secondary) border-4 border-(--text-card) font-bold outline-none"}
                            />
                            <Lock
                                 color={"var(--text-card)"} className="absolute top-[1.1rem] left-1"
                            />
                            {!passwordVisibility &&
                                <Eye
                                    className={"absolute top-[1.3rem] !left-[unset] right-1 !transition-(--common-transition) hover:!cursor-pointer hover:!scale-[1.2]"}
                                    color={tema === "dark" ? "var(--background-color-navbar-dark)" : "var(--background-color-navbar-light)"}
                                    onClick={handlePasswordVisibility}
                                    aria-label="Mostrar senha"
                                    role="button"
                                    tabIndex={0}
                                />
                            }
                            {passwordVisibility &&
                                <EyeOff
                                    className={"absolute top-[1.3rem] !left-[unset] right-1 !transition-(--common-transition) hover:!cursor-pointer hover:!scale-[1.2]"}
                                    color={tema === "dark" ? "var(--background-color-navbar-dark)" : "var(--background-color-navbar-light)"}
                                    onClick={handlePasswordVisibility}
                                    aria-label="Ocultar senha"
                                    role="button"
                                    tabIndex={0}
                                />
                            }
                        </div>
                        <p className={"reset-password text-(--highlight) mt-[0.3rem] mb-2 w-full text-end transition-(--common-transition) hover:!cursor-pointer hover:text-(--secondary)"} onClick={handleResetPasswordButtonClick} aria-label="Esqueci a senha">Esqueci a senha</p>
                        <YellowButton
                            text={loading ? "Carregando..." : error ? error : "Iniciar"}
                            clickFunction={handleLoginButtonClick}
                            error={error}
                            type={"submit"}
                            value={"Submit"}
                            disabled={loading}
                            aria-label="Iniciar sessão"
                        />
                    </form>
                </div>
            </div>
        </>
    );
}
