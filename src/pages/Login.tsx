
import { useContext, useEffect } from "react";
import { UserContext } from "../utils/userContext.jsx";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { UserRound, Lock, Eye, EyeOff } from "lucide-react";
<<<<<<< HEAD
import { useLoginForm } from "../utils/useLoginForm";
=======
<<<<<<< HEAD
import useLoginForm from "../utils/hooks/useLoginForm";
=======
import YellowButton from "../components/YellowButton.jsx";
<<<<<<< HEAD
import { useLoginForm } from "../utils/useLoginForm";
>>>>>>> b99ad81 (feat: Adicionar componente YellowButton com estilos e funcionalidade de clique)
>>>>>>> 25f0f53 (feat: Adicionar componente YellowButton com estilos e funcionalidade de clique)
=======
import useLoginForm  from "../utils/hooks/useLoginForm";
>>>>>>> a513f26 (Altera a importação do hook useLoginForm para o formato padrão)
=======
import { UserRound, Eye, EyeOff } from "lucide-react";
import useLoginForm from "../utils/hooks/useLoginForm";
import useLoadingDots from "../utils/hooks/useLoadingDots";
>>>>>>> e3fcf0b (Refactors styles and animations; enhances login form)

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
<<<<<<< HEAD
            <img className={`login-penas-left ${tema}`}
                src={"/penas_esquerda_login.svg"}
                alt={"Penas à esquerda"} />
            <img className={`login-penas-right ${tema}`}
                src={"/penas_direita_login.svg"}
=======
            <img className={`login-penas-left ${tema === "dark" ? "invert" : ""}`}
                src={"https://res.cloudinary.com/dflvo098t/image/upload/penas_esquerda_login_rmo2aj.svg"}
                alt={"Penas à esquerda"} />
            <img className={`login-penas-right ${tema === "dark" ? "invert" : ""}`}
                src={"https://res.cloudinary.com/dflvo098t/image/upload/penas_direita_login_c14tob.svg"}
>>>>>>> e3fcf0b (Refactors styles and animations; enhances login form)
                alt={"Penas à direita"} />
            <div className={`login-form flex items-center content-center pb-3 max-h-36 h-full relative`}>
                <div className={"bird-icon-wrapper absolute top-[-3.3rem] left-[-2.1rem] cursor-pointer"}
                    onClick={handleBackButtonClick}>
                    <img
<<<<<<< HEAD
<<<<<<< HEAD
                        className="bird-icon"
                        src="/bunchin_bird_icon.svg"
=======
                        className={`bird-icon ${tema === "dark" ? "invert" : ""}`}
                        src="https://res.cloudinary.com/dflvo098t/image/upload/bunchin_bird_icon_r8mgim.svg"
>>>>>>> e3fcf0b (Refactors styles and animations; enhances login form)
                        alt="Pássaro do bunchin"
                    />
                </div>
<<<<<<< HEAD
<<<<<<< HEAD
                <div className="left-side">
                    <h2 className={"left-side-h2"}>Não Possui um Cadastro?</h2>
                    <img className={"left-side-crow"} src="/login_crow.svg" alt="" />
                    <p className={"left-side-p"}>Entre em contato com o departamento pessoal da sua
                        empresa para que eles criem seu acesso.</p>
                </div>
                <div className={"right-side"}>
<<<<<<< HEAD
                    <img className={"title-sessao"} src="/iniciando_sessao_title.svg" alt="" />
=======
                    <img className={"title-sessao"} src="https://res.cloudinary.com/dflvo098t/image/upload/iniciando_sessao_title_d5bzll.svg" alt="" />
=======
                <div className={`left-side px-2 flex flex-col h-full ${tema}`}>
=======
                        className="bird-icon relative hover:!cursor-pointer"
                        src="/bunchin_bird_icon.svg"
                        alt="Pássaro do bunchin"
                    /> 
                </div>
                <div className={`left-side items-center px-2 flex flex-col h-full ${tema}`}>
>>>>>>> 3a176e0 (transição para tailwind completa (login) restando somente cores)
                    <h2 className={"left-side-h2 text-2xl mt-4"}>Não Possui um Cadastro?</h2>
                    <img className={"my-[30px] bird-icon"} src="/login_crow.svg" alt="" />
                    <p className={"left-side-p max-w-[340px] lg:text-2xl md:text-lg m-0"}>Entre em contato com o departamento pessoal da sua
                        empresa para que eles criem seu acesso.</p>
                </div>
                <div className={"right-side flex flex-col items-center self-start h-full px-4 pb-4"}>
<<<<<<< HEAD
                    <img className={"title-sessao"} src="/iniciando_sessao_title.svg" alt="" />
>>>>>>> c6958e5 (feat: Refatorar estilos do login, remover classes CSS e adicionar classes responsivas do tailwind)
>>>>>>> 5d2684f (feat: Refatorar estilos do login, remover classes CSS e adicionar classes responsivas do tailwind)
                    <form className={"form-login"}>
                        <label htmlFor="email">EMAIL OU CPF</label>
=======
                    <img className={"title-sessao h-[60px] mt-3 mb-3"} src="/iniciando_sessao_title.svg" alt="" />
                    <form className={"form-login min-w-[35vw] w-full flex flex-col items-center"}>
                        <label htmlFor="email" className="w-full">EMAIL OU CPF</label>
>>>>>>> 3a176e0 (transição para tailwind completa (login) restando somente cores)
                        <div className={"input-box w-full relative mb-3"}>
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
=======
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
>>>>>>> e3fcf0b (Refactors styles and animations; enhances login form)
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
