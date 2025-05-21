import {useContext} from "react";
import {UserContext} from "../utils/userContext.jsx";
import {useNavigate} from "react-router-dom";
import {changeTheme} from "../utils/themeSystems.jsx";

export default function Configuracoes() {

    const { setUsuario, tema, setTema } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("usuario");
        setUsuario(null);
        navigate('/login');
    }

    function handleButtonThemeClick() {
        changeTheme(tema, setTema);
    }

    return (
        <main className={`mainCommon configuracoes ${tema}`}>
            <article className={"card-configuracoes"}>
                <h1 className="configuracoes-title">Configurações</h1>
                <button className={`button-theme`} onClick={handleButtonThemeClick}>
                    {tema === "light" ? "Tema Escuro" : "Tema Claro"}
                </button>
                <button className={"button-logout"} onClick={handleLogout}>
                    Sair da conta
                </button>
            </article>
        </main>
    )

}