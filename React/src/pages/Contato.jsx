import { useContext } from "react";
import { UserContext } from "../assets/ContextoDoUsuario.jsx";
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
                <h1 className="sobre-title">CONTATE-NOS</h1>
                <p className="sobre-description">
                    Se você tiver alguma dúvida ou precisar de assistência, entre em contato conosco através das
                    seguintes opções:
                </p>
                <div className="contact-info">
                    <p><strong>Endereço:</strong> Rua Exemplo, 123, Cidade, Estado, CEP 12345-678</p>
                    <p><strong>Telefone:</strong> (11) 1234-5678</p>
                    <p><strong>Email:</strong> contato@bunchin.com</p>
                </div>
                <button className="button-home" onClick={handleHomeButtonClick}>
                    Voltar para Home
                </button>
            </div>
        </main>
    );
}