import {useNavigate} from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../assets/ContextoDoUsuario.jsx";

export default function Perfil() {

    const { setUsuario } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("usuario");
        setUsuario(null);
        navigate('/login');
    }

    return (
        <main className={"mainCommon"}>
            <button onClick={handleLogout}>
                Sair
            </button>
        </main>
    )

}