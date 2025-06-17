import validator from 'validator';
import { useContext, useState } from "react";
import { UserContext } from "../../utils/context/userContext";
import { useNavigate, useLocation } from "react-router-dom";
import { SendEmail } from "../../utils/services/sendEmail";

export default function Footer() {

    const [email, setEmail] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const { tema } = useContext(UserContext);

    function handleSendEmailClick() {
        const normalizedEmail = validator.normalizeEmail(email);
        if (normalizedEmail && validator.isEmail(normalizedEmail)) {
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
        <>
            {location.pathname === "/" && (
                <div className={"gradient mt-3 w-full h-10 bg-linear-to-t from-highlight to-transparent"} />
            )}
            <footer className={`bg-highlight flex items-center justify-center flex-col z-1 w-full py-2 px-1 text-secondary`}>
                <div className={"flex justify-between items-start gap-1 w-full max-w-85 border-b-2 border-secondary pb-2"}>
                    <div className="flex gap-1 flex-col max-w-30">
                        <div className={`flex items-center justify-start gap-1 w-full`}>
                            <img className={`${tema === "dark" ? "invert" : ""}`} src={"https://res.cloudinary.com/dflvo098t/image/upload/logo_fs9l85.svg"} alt={"Logo do site"} />
                            <p className={"font-subrayada text-4xl font-bold"}>Bunchin</p>
                        </div>
                        <p className={"span-3 text-justify"}>Simplifique o controle de horários e dados dos seus colaboradores
                            com a nossa plataforma. Solução completa,
                            prática e segura para você focar no que realmente importa: sua equipe.</p>
                    </div>
                    <div className="flex gap-1 flex-col max-w-30">
                        <p className={"text-xl font-bold w-full text-start"}>Navegação</p>
                        <ul className={"text-start w-full underline"}>
                            <li className="cursor-pointer"><a onClick={() => navigate("/")}>Início</a></li>
                            <li className="cursor-pointer"><a onClick={() => navigate("/sobre")}>Sobre</a></li>
                            <li className="cursor-pointer"><a onClick={() => navigate("/contato")}>Trabalhe conosco</a></li>
                            <li className="cursor-pointer"><a onClick={() => navigate("/faq")}>FAQ</a></li>
                        </ul>
                    </div>
                    <div className="flex gap-1 flex-col max-w-30">
                        <p className={"text-xl font-bold w-full text-start"}>Contato</p>
                        <ul className={"box-contacts span-2 w-full text-start"}>
                            <li><i className="bi bi-whatsapp"></i> (11) 98765-4321</li>
                            <li><i className="bi bi-whatsapp"></i> (11) 99123-4567</li>
                            <li><i className="bi bi-telephone"></i> (11) 3456-7890</li>
                            <li><i className="bi bi-envelope"></i> contato@bunchin.com</li>
                        </ul>
                    </div>
                    <div className="flex gap-1 flex-col max-w-25">
                        <p className={"text-xl font-bold w-full text-start"}>De olho nas novidades</p>
                        <p className="text-justify">Fique por dentro das novidades e atualizações! Inscreva-se e seja o
                            primeiro a saber de melhorias e recursos exclusivos.</p>
                        <div className={"relative"}>
                            <input className={`w-full py-0.5 pl-1 pr-7.5 border-b-2 bg-secondary border-card text-card rounded-t-sm`}
                                placeholder={"Seu email"}
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>
                            <p className={"absolute top-1/2 -translate-y-1/2 right-1 text-highlight cursor-pointer hover:bg-highlight/50 px-0.5 rounded-sm transition-colors"} onClick={handleSendEmailClick}>Inscrever-se</p>
                        </div>
                    </div>
                </div>
                <div className={"flex justify-between items-center mt-2 w-full max-w-85"}>
                    <p className="underline cursor-pointer">Termos de uso | Política de privacidade</p>
                    <p>&copy; 2025 Bunchin. Todos os direitos reservados.</p>
                </div>
            </footer>
        </>
    )
}