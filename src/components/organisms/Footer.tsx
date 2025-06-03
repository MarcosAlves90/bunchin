import validator from 'validator';
import {useContext, useState} from "react";
import {UserContext} from "../../utils/context/userContext";
import {useNavigate} from "react-router-dom";
import {SendEmail} from "../../utils/services/sendEmail";

export default function Footer() {

    const [email, setEmail] = useState("");

    const navigate = useNavigate();
    const { tema } = useContext(UserContext);

    function handleSendEmailClick() {
        if (validator.isEmail(validator.normalizeEmail(email))) {
            // @ts-ignore
            SendEmail(import.meta.env.VITE_PUBLIC_API_KEY,
                // @ts-ignore
                import.meta.env.VITE_SERVICE_API_KEY,
                // @ts-ignore
                import.meta.env.VITE_TEMPLATE_API_KEY_1, {
                email: email,
            });
        } else {
            console.log('Email inválido');
        }
    }

    return (
        <footer className={`${tema} z-1 w-full py-2 px-0 max-w-85 mb-2 rounded-b-sm`}>
            <div className={"box-grid grid grid-cols-10 justify-start items-center gap-1"}>
                <div className={"title-wrapper span-3"}>
                    <img src={"/logo.svg"} alt={"Logo do site"}/>
                    <p className={"title"}>Bunchin</p>
                </div>
                <p className={"important span-2"}>Links úteis</p>
                <p className={"important span-2"}>Informações de contato</p>
                <p className={"important span-3"}>De olho nas novidades</p>
            </div>
            <div className={"box-grid second grid grid-cols-10 justify-start items-center gap-1"}>
                <p className={"subText span-3"}>Simplifique o controle de horários e dados dos seus colaboradores
                    com a nossa plataforma. Solução completa,
                    prática e segura para você focar no que realmente importa: sua equipe.</p>
                <ul className={"box-links span-2"}>
                    <li><a onClick={() => navigate("/")}>Início</a></li>
                    <li><a onClick={() => navigate("/sobre")}>Sobre</a></li>
                    <li><a onClick={() => navigate("/contato")}>Trabalhe conosco</a></li>
                </ul>
                <ul className={"box-contacts span-2"}>
                    <li><i className="bi bi-whatsapp"></i> (11) 98765-4321</li>
                    <li><i className="bi bi-whatsapp"></i> (11) 99123-4567</li>
                    <li><i className="bi bi-telephone"></i> (11) 3456-7890</li>
                    <li><i className="bi bi-envelope"></i> contato@bunchin.com</li>
                </ul>
                <div className={"box-email span-3"}>
                    <p>Fique por dentro das novidades e atualizações! Inscreva-se e seja o
                        primeiro a saber de melhorias e recursos exclusivos.</p>
                    <div className={"input-wrapper"}>
                        <input className={`w-full py-0.5 px-1 border-3 bg-secondary border-card text-card`}
                               placeholder={"Seu email"}
                               onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        <p className={"absolute"} onClick={handleSendEmailClick}>Inscrever-se</p>
                    </div>
                </div>
            </div>
            <div className={"footer-bottom display-flex-center"}>
                <p className={"subText"}>Termos de uso | Política de privacidade</p>
                <p>&copy; 2024 Bunchin. Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}