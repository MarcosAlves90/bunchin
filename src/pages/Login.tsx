
import { useContext, useEffect } from "react";
import { UserContext } from "../utils/context/userContext.js";
import { useNavigate } from "react-router-dom";
import { UserRound, Lock, Eye, EyeOff } from "lucide-react";
import useLoginForm from "../utils/useLoginForm";

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
            <img className={`login-penas-left ${tema}`}
                src={"/penas_esquerda_login.svg"}
                alt={"Penas à esquerda"} />
            <img className={`login-penas-right ${tema}`}
                src={"/penas_direita_login.svg"}
                alt={"Penas à direita"} />
            <div className={`login-form ${tema}`}>
                <div className={"bird-icon-wrapper"}
                    onClick={handleBackButtonClick}>
                    <img
                        className="bird-icon"
                        src="/bunchin_bird_icon.svg"
                        alt="Pássaro do bunchin"
                    />
                </div>
                <div className="left-side">
                    <h2 className={"left-side-h2"}>Não Possui um Cadastro?</h2>
                    <img className={"left-side-crow"} src="/login_crow.svg" alt="" />
                    <p className={"left-side-p"}>Entre em contato com o departamento pessoal da sua
                        empresa para que eles criem seu acesso.</p>
                </div>
                <div className={"right-side"}>
                    <img className={"title-sessao"} src="/iniciando_sessao_title.svg" alt="" />
                    <form className={"form-login"}>
                        <label htmlFor="email">EMAIL OU CPF</label>
                        <div className={"input-box"}>
                            <input
                                type="text"
                                id="email"
                                placeholder="Email ou CPF"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-label="Email ou CPF"
                                autoComplete="username"
                            />
                            <UserRound
                                color={tema === "dark" ? "var(--background-color-dark-light-theme)" : "var(--background-color-light-dark-theme)"} />
                        </div>
                        <label htmlFor="senha">SENHA</label>
                        <div className={"input-box last"}>
                            <input
                                type={passwordVisibility ? "text" : "password"}
                                id="senha"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                aria-label="Senha"
                                autoComplete="current-password"
                            />
                            <Lock
                                color={tema === "dark" ? "var(--background-color-dark-light-theme)" : "var(--background-color-light-dark-theme)"}
                            />
                            {!passwordVisibility &&
                                <Eye
                                    className={"eye"}
                                    color={tema === "dark" ? "var(--background-color-navbar-dark)" : "var(--background-color-navbar-light)"}
                                    onClick={handlePasswordVisibility}
                                    aria-label="Mostrar senha"
                                    role="button"
                                    tabIndex={0}
                                />
                            }
                            {passwordVisibility &&
                                <EyeOff
                                    className={"eye"}
                                    color={tema === "dark" ? "var(--background-color-navbar-dark)" : "var(--background-color-navbar-light)"}
                                    onClick={handlePasswordVisibility}
                                    aria-label="Ocultar senha"
                                    role="button"
                                    tabIndex={0}
                                />
                            }
                        </div>
                        <p className={"reset-password"} onClick={handleResetPasswordButtonClick} aria-label="Esqueci a senha">Esqueci a senha</p>
                        <button
                            type={"submit"}
                            value={"Submit"}
                            className={`button-login ${error ? "error" : ""}`}
                            onClick={handleLoginButtonClick}
                            disabled={loading}
                            aria-label="Iniciar sessão"
                        >
                            <i className="bi bi-feather2 left"></i>
                            {loading ? "Carregando..." : error ? error : "Iniciar"}
                            <i className="bi bi-feather2 right"></i>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
