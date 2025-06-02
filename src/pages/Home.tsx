import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Shield, UsersRound, ChevronDown } from "lucide-react";
import ResourcePoint from "../components/ResourcePoint";
import { UserContext } from "../utils/userContext";
import Story from "../components/Story";
import AOS from "aos";
// @ts-ignore
import "aos/dist/aos.css";

interface UserContextType {
    tema: string;
}

export default function Home() {
    const navigate = useNavigate();
    const [isDown, setIsDown] = useState(false);
    const secondTitleRef = useRef(null);
    const { tema } = useContext(UserContext) as UserContextType;

    useEffect(() => {
        AOS.init();
        const handleScroll = () => {
            setIsDown(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleArrowClick = () => {
        if (secondTitleRef.current) {
            const offset = (secondTitleRef.current as HTMLElement).offsetTop - 140;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }
    };
    function handleLoginButtonClick() {
        navigate("/login");
    }

    return (
        <main className={`mainCommon-home flex justify-start items-center flex-col box-border min-h-screen max-w-85 w-full`}>
            <article className={"mainCommon__hero flex flex-col items-center justify-center h-[calc(100vh-90px)] mt-[90px]"}>
                <img className={`mainCommon__hero__title-svg h-[150px] transition ${tema === "dark" ? "invert-100" : ""}`} src={"/bunchin_title.svg"} alt={"Título do site"} />
                <p className={"mainCommon__hero__subtitle mt-0 text-xl text-primary transition duration-200"}>Sua solução completa para gestão de ponto e dados de funcionários.</p>
                <img className={`mainCommon__hero__penas ${isDown ? "down" : ""} left left-[-180px] ${tema === "light" ? "invert-100" : ""}`} src={"/penas_esquerda_home.svg"}
                    alt={"Penas à esquerda"} />
                <img className={`mainCommon__hero__penas ${isDown ? "down" : ""} right right-[-180px] ${tema === "light" ? "invert-100" : ""}`} src={"/penas_direita_home.svg"}
                    alt={"Penas à direita"} />
                <button className={"button-session mt-5"} onClick={handleLoginButtonClick}>
                    Iniciar sessão
                </button>
                <ChevronDown className="mainCommon__hero__chevron transition-colors cursor-pointer text-primary absolute bottom-2" onClick={handleArrowClick} size={48} strokeWidth={2} />
            </article>
            <article className={`mainCommon__resources mt-7`}>
                <p ref={secondTitleRef} className={"mainCommon__resources__title"}>NOSSOS RECURSOS</p>
                <p className={"mainCommon__resources__subtitle mt-0 text-lg mb-5 text-primary"}>É com essa tecnologias que nossa plataforma pode revolucionar sua
                    empresa</p>
                <div className={"mainCommon__resources__box-points grid grid-cols-3 gap-3"} data-aos="fade-up">
                    <ResourcePoint
                        icon={<Clock size={90} strokeWidth={1.5} className="mb-0.5" />}
                        title="CONTROLE DE PONTOS AVANÇADO"
                        description="Registre e gerencie o ponto dos funcionários com precisão. Nossa tecnologia permite marcações via web, mobile e biometria, garantindo flexibilidade e segurança."
                    />
                    <ResourcePoint
                        icon={<Shield size={90} strokeWidth={1.5} className="mb-0.5" />}
                        title="SEGURANÇA E CONFORMIDADE"
                        description="Proteja os dados da sua empresa com nosso sistema de segurança e protocolos de uso. Modos como “ponto por proximidade” são o que garantem um uso correto dos nossos recursos."
                    />
                    <ResourcePoint
                        icon={<UsersRound size={90} strokeWidth={1.5} className="mb-0.5" />}
                        title="GESTÃO INTELIGENTE DA EQUIPE"
                        description="Acompanhe o desempenho e a produtividade da sua equipe em tempo real. Analise métricas importantes, defina metas e incentive o crescimento profissional dos seus colaboradores."
                    />
                </div>
                <p className={"mainCommon__resources__title mt-7"}>HISTÓRIAS DE SUCESSO</p>
                <p className={"mainCommon__resources__subtitle mt-0 text-lg mb-5 text-primary"}>Relatos de clientes satisfeitos com a nossa plataforma e serviços de alto nível</p>
                <div className={"box-stories grid grid-cols-3 gap-3 group"} data-aos="flip-down">
                    <Story
                        starNumber={4}
                        text="Desde que implementamos a plataforma, a motivação do time disparou! As metas são claras e as recompensas são um incentivo constante para todos. Acredito que estamos mais alinhados e engajados como nunca!"
                        author="— Ana L., Gerente de RH da [Empresa ABC]"
                    />
                    <Story
                        starNumber={5}
                        text="A plataforma nos ajudou a acompanhar o desempenho de todos os colaboradores em tempo real. Agora, temos relatórios precisos e podemos dar feedbacks rápidos. Está facilitando muito nosso trabalho!"
                        author="— Carlos M., Diretor de Operações da [Empresa XYZ]"
                    />
                    <Story
                        starNumber={5}
                        text="Ficamos surpresos com a facilidade de implementação. A integração foi rápida e a equipe de suporte foi excelente, nos guiando em cada etapa. O uso da plataforma no dia a dia também é muito intuitivo!"
                        author="— Juliana S., CEO da [Empresa DEF]"
                    />
                </div>
                <button className={"button-session last mt-5"}>
                    Registre sua empresa
                </button>
            </article>
            <div className={"gradient mt-3 w-full h-10 bg-linear-to-t from-highlight to-transparent"} />
        </main>
    );
}