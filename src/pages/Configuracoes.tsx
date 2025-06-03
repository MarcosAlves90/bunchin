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
        <main className={`mainCommon text-base flex justify-center items-center flex-col`}>
            <article className={"bg-card rounded-sm w-full p-2 flex flex-col gap-1 text-primary transition-colors"}>
                <h1 className="text-4xl font-subrayada mb-2">Configurações</h1>
                <button className={`button-theme max-w-20 w-full mx-auto text-lg px-2 rounded-sm bg-primary hover:bg-secondary hover:text-primary text-secondary font-medium cursor-pointer border-none py-[0.7rem] transition`} onClick={handleButtonThemeClick}>
                    {tema === "light" ? "Tema Escuro" : "Tema Claro"}
                </button>
                <button className={"button-logout max-w-20 w-full mx-auto text-lg px-2 rounded-sm bg-red hover:bg-secondary hover:text-red text-secondary cursor-pointer border-none py-[0.7rem] transition"} onClick={handleLogout}>
                    Sair da conta
                </button>
            </article>
        </main>
    )

}