import { useRef, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    Clock, 
    Shield, 
    UsersRound, 
    ChevronDown, 
    CheckCircle,
    BarChart3,
    Smartphone,
    Globe,
    Lock,
    Mail
} from "lucide-react";
import ResourcePoint from "../components/molecules/ResourcePoint";
import FeatureCard from "../components/molecules/FeatureCard";
import PricingCard from "../components/molecules/PricingCard";
import { UserContext } from "../utils/context/userContext";
import Story from "../components/atoms/Story";
import { UserContextType } from "../types/interfaces";
import AOS from "aos";
// @ts-ignore
import "aos/dist/aos.css";

export default function Home() {
    const navigate = useNavigate();
    const secondTitleRef = useRef(null);
    const { tema } = useContext(UserContext) as UserContextType;
    const [email, setEmail] = useState("");

    useEffect(() => {
        AOS.init();
    }, []);

    const handleArrowClick = () => {
        if (secondTitleRef.current) {
            const offset = (secondTitleRef.current as HTMLElement).offsetTop - 200;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }
    };    function handleLoginButtonClick() {
        navigate("/login");
    }

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            // Aqui você adicionaria a lógica para salvar o email
            alert("Obrigado por se inscrever! Entraremos em contato em breve.");
            setEmail("");
        }
    };

    return (
        <main className={`mainCommon-home flex justify-start items-center flex-col box-border min-h-screen max-w-85 w-full`}>
            <article className={"mainCommon__hero flex flex-col items-center justify-center h-[calc(100vh-90px)] mt-[90px]"}>
                <img className={`mainCommon__hero__title-svg h-[150px] transition ${tema === "dark" ? "invert-100" : ""}`} src={"https://res.cloudinary.com/dflvo098t/image/upload/bunchin_title_gb3kdr.svg"} alt={"Título do site"} />
                <p className={"mainCommon__hero__subtitle mt-0 text-xl text-primary transition duration-200"}>Sua solução completa para gestão de ponto e dados de funcionários.</p>                <button className={"button-session mt-5"} onClick={handleLoginButtonClick}>
                    Iniciar sessão
                </button>
                <ChevronDown className="transition-colors cursor-pointer text-primary absolute bottom-2 animate-bounce-ping" onClick={handleArrowClick} size={48} strokeWidth={2} />
            </article>
            <article className={`mainCommon__resources mt-7`}>

                <div data-aos="fade-up" ref={secondTitleRef}>
                    <p className={"mainCommon__resources__title"}>NOSSOS RECURSOS</p>
                    <p className={"mainCommon__resources__subtitle mt-0 text-lg mb-5 text-primary"}>É com essa tecnologias que nossa plataforma pode revolucionar sua
                        empresa</p>
                    <div className={"mainCommon__resources__box-points grid grid-cols-3 gap-3"}>
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
                </div>

                <div data-aos="fade-up">
                    <p className={"mainCommon__resources__title mt-15"}>HISTÓRIAS DE SUCESSO</p>
                    <p className={"mainCommon__resources__subtitle mt-0 text-lg mb-5 text-primary"}>Relatos de clientes satisfeitos com a nossa plataforma e serviços de alto nível</p>
                    <div className={"box-stories grid grid-cols-3 gap-3 group"}>
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
                </div>

                <div data-aos="fade-up">
                    <p className={"mainCommon__resources__title mt-15"}>COMO FUNCIONA</p>
                    <p className={"mainCommon__resources__subtitle mt-0 text-lg mb-5 text-primary"}>
                        Implementação simples em 3 passos
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                        <FeatureCard
                            inverse={true}
                            title="1. Cadastro Rápido"
                            description="Registre sua empresa e funcionários em minutos. Nossa interface intuitiva torna o processo de configuração extremamente simples."
                            icon={<CheckCircle size={64} strokeWidth={1.5} />}
                        />
                        <FeatureCard
                            inverse={true}
                            title="2. Configuração Personalizada"
                            description="Configure horários, turnos e regras específicas da sua empresa. Adaptamos o sistema às suas necessidades únicas."
                            icon={<BarChart3 size={64} strokeWidth={1.5} />}
                        />
                        <FeatureCard
                            inverse={true}
                            title="3. Funcionamento Completo"
                            description="Seus funcionários começam a registrar pontos imediatamente via web ou mobile, com total segurança e precisão."
                            icon={<Smartphone size={64} strokeWidth={1.5} />}
                        />
                    </div>
                </div>

                <div data-aos="fade-up">
                    <p className={"mainCommon__resources__title mt-15"}>BENEFÍCIOS EXCLUSIVOS</p>
                    <p className={"mainCommon__resources__subtitle mt-0 text-lg mb-5 text-primary"}>
                        Vantagens que fazem a diferença no seu negócio
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                        <FeatureCard
                            title="Acesso Global"
                            description="Funciona em qualquer lugar do mundo com acesso à internet. Perfeito para empresas com equipes remotas ou múltiplas filiais."
                            icon={<Globe size={64} strokeWidth={1.5} />}
                        />
                        <FeatureCard
                            title="Segurança Máxima"
                            description="Dados criptografados e armazenados com os mais altos padrões de segurança. Compliance total com LGPD e regulamentações internacionais."
                            icon={<Lock size={64} strokeWidth={1.5} />}
                        />
                        <FeatureCard
                            title="Relatórios Inteligentes"
                            description="Analytics avançado com insights sobre produtividade, pontualidade e padrões de trabalho. Tome decisões baseadas em dados."
                            icon={<BarChart3 size={64} strokeWidth={1.5} />}
                        />
                    </div>
                </div>

                <div data-aos="fade-up">
                    <p className={"mainCommon__resources__title mt-15"}>PLANOS E PREÇOS</p>
                    <p className={"mainCommon__resources__subtitle mt-0 text-lg mb-5 text-primary"}>
                        Escolha o plano ideal para sua empresa
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                        <PricingCard
                            title="Básico"
                            price="R$ 29"
                            period="/mês"
                            features={[
                                "Até 10 funcionários",
                                "Registro de ponto básico",
                                "Relatórios simples",
                                "Suporte por email"
                            ]}
                            buttonText="Começar Agora"
                        />
                        <PricingCard
                            title="Profissional"
                            price="R$ 79"
                            period="/mês"
                            features={[
                                "Até 50 funcionários",
                                "Ponto por proximidade",
                                "Relatórios avançados",
                                "Integração com outros sistemas",
                                "Suporte prioritário"
                            ]}
                            isPopular={true}
                            buttonText="Teste Grátis"
                        />
                        <PricingCard
                            title="Enterprise"
                            price="R$ 199"
                            period="/mês"
                            features={[
                                "Funcionários ilimitados",
                                "Recursos personalizados",
                                "API completa",
                                "Gerente de conta dedicado",
                                "Suporte 24/7"
                            ]}
                            buttonText="Falar com Vendas"
                        />
                    </div>
                </div>

                <div className="mt-15 bg-highlight/10 border border-highlight/30 rounded-sm p-2 text-center" data-aos="fade-up">
                    <div className="max-w-2xl mx-auto">
                        <Mail className="text-highlight mx-auto mb-1" size={48} strokeWidth={1.5} />
                        <h3 className="text-2xl font-semibold text-primary mb-2 transition-colors duration-200">
                            Fique por dentro das novidades
                        </h3>
                        <p className="text-primary/80 mb-2 transition-colors duration-200">
                            Receba atualizações sobre novas funcionalidades, dicas de gestão e conteúdo exclusivo diretamente no seu email.
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Seu melhor email"
                                className="w-full border-b-2 p-0.5 rounded-t-sm focus:border-highlight bg-secondary text-primary border-primary"
                                required
                            />
                            <button
                                type="submit"
                                className="button-session max-w-10 w-full"
                            >
                                Inscrever-se
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-15 text-center" data-aos="fade-up">
                    <h3 className="text-3xl font-bold text-primary mb-2 transition-colors duration-200">
                        Pronto para revolucionar a gestão da sua empresa?
                    </h3>
                    <p className="text-xl text-primary/80 mb-5 transition-colors duration-200">
                        Junte-se a centenas de empresas que já transformaram sua gestão de ponto e equipe.
                    </p>
                    <button className={"button-session"}>
                        Registre sua empresa
                    </button>
                </div>

            </article>
        </main>
    );
}