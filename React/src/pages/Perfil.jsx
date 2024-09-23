import {useNavigate} from "react-router-dom";

export default function Perfil() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("usuario");
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