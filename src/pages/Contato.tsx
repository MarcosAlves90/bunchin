<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import MapView from "../components/atoms/MapView";

export default function Contato() {
=======
import { useContext } from "react";
import { UserContext } from "../utils/userContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Sobre() {
    const { tema } = useContext(UserContext);
>>>>>>> bea5ea5 (feat: Add main application pages and user context management)
    const navigate = useNavigate();

    function handleHomeButtonClick() {
        navigate("/");
    }

    return (
<<<<<<< HEAD
        <main className={`mainCommon text-base flex justify-center items-center flex-col`}>
            <div className="container rounded-sm p-2 flex flex-col gap-1 text-primary transition-colors max-w-60">
                <h1 className="title text-4xl font-subrayada mb-2">CONTATE-NOS</h1>
                <p className="description text-lg text-center w-full mx-auto">
                    Se você tiver alguma dúvida ou precisar de assistência, entre em contato conosco através das
                    seguintes opções:
                </p>
                <div className="contact-info text-base flex flex-col gap-0.5 transition-colors">
                    <div className="wrapper flex-wrap flex flex-row mx-auto gap-0.5 w-full transition-colors">
                        <a 
                            href="https://maps.app.goo.gl/1i6jzv3SE2gBucKF7" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mx-auto cursor-pointer p-[0.2rem] rounded-sm duration-200 hover:bg-secondary underline hover:font-bold"
                        >
                            <strong>Endereço:</strong> Av. Antônia R. Fioravanti, 804 - Centro, Mauá
                        </a>
                        <a 
                            href="tel:+551112345678"
                            className="mx-auto cursor-pointer p-[0.2rem] duration-200 rounded-sm hover:bg-secondary underline hover:font-bold"
                        >
                            <strong>Telefone:</strong> (11) 1234-5678
                        </a>
                        <a 
                            href="mailto:contato@bunchin.com"
                            className="mx-auto cursor-pointer p-[0.2rem] duration-200 rounded-sm hover:bg-secondary underline hover:font-bold"
                        >
                            <strong>Email:</strong> contato@bunchin.com
                        </a>
                    </div>
                    <div className="mx-auto w-full">
                        <MapView 
                            latitude={-23.6636053} 
                            longitude={-46.4601248} 
                            zoom={15} 
                            height="13rem"
                        />
                    </div>
                    
                </div>
                <button className="button-home button-session mx-auto mt-2" onClick={handleHomeButtonClick}>
=======
        <main className={`mainCommon sobre ${tema}`}>
            <div className="sobre-container">
                <h1 className="sobre-title">CONTATE-NOS</h1>
                <p className="sobre-description">
                    Se você tiver alguma dúvida ou precisar de assistência, entre em contato conosco através das
                    seguintes opções:
                </p>
                <div className="sobre-description contact-info">
                    <p><strong>Endereço:</strong> Rua Exemplo, 123, Cidade, Estado, CEP 12345-678</p>
                    <p><strong>Telefone:</strong> (11) 1234-5678</p>
                    <p><strong>Email:</strong> contato@bunchin.com</p>
                </div>
                <button className="button-home" onClick={handleHomeButtonClick}>
>>>>>>> bea5ea5 (feat: Add main application pages and user context management)
                    Voltar para a página inicial
                </button>
            </div>
        </main>
    );
}