import { useContext } from "react";
import { UserContext } from "../utils/userContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Sobre() {
    const { tema } = useContext(UserContext);
    const navigate = useNavigate();

    function handleHomeButtonClick() {
        navigate("/");
    }

    return (
        <main className={`mainCommon sobre ${tema}`}>
            <div className="sobre-container">
                <h1 className="sobre-title">Sobre Nós</h1>
                <p className="sobre-description">
                    Bem-vindo ao Bunchin! Somos uma plataforma inovadora dedicada à gestão de ponto e dados de
                    funcionários. Nossa missão é transformar a maneira como as empresas gerenciam suas equipes,
                    oferecendo uma solução intuitiva, eficiente e confiável.<br/>No Bunchin, acreditamos que a tecnologia
                    pode simplificar processos e melhorar a produtividade, permitindo que as empresas se concentrem no
                    que realmente importa: seu crescimento e sucesso. Junte-se a nós e descubra como podemos facilitar a
                    vida da sua empresa e de seus colaboradores.
                </p>
                <button className="button-home" onClick={handleHomeButtonClick}>
                    Voltar para a página inicial
                </button>
            </div>
        </main>
    );
}