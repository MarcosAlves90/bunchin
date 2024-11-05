import {useContext} from "react";
import {UserContext} from "../assets/ContextoDoUsuario.jsx";
import {useNavigate} from "react-router-dom";

export default function Home() {

    const { tema } = useContext(UserContext);
    const navigate = useNavigate();

    function handleLoginButtonClick() {
        navigate("/login");
    }

    return (
        <main className={`mainCommon home display-flex-center ${tema}`}>
            <img className={"titulo-svg"} src={"/bunchin_title.svg"} alt={"Título do site"}/>
            <p className={"subtitulo"}>Sua solução completa para gestão de ponto e dados de funcionários.</p>
            <img className={"penas-left"}
                 src={"/penas_esquerda_home.svg"}
                 alt={"Penas à esquerda"}/>
            <img className={"penas-right"}
                 src={"/penas_direita_home.svg"}
                 alt={"Penas à direita"}/>
            <button className={"button-session"} onClick={handleLoginButtonClick}>
                Iniciar sessão
            </button>
            <i className="bi bi-chevron-down seta-baixo" onClick={handleLoginButtonClick}></i>
        </main>
    )

}