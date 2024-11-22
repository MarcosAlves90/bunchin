import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../assets/ContextoDoUsuario.jsx";
import { useNavigate } from "react-router-dom";
import {Clock, Shield, UsersRound, Clock3} from "lucide-react";

export default function Home() {
    const navigate = useNavigate();
    const { tema } = useContext(UserContext);
    const [isDown, setIsDown] = useState(false);
    const secondTitleRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsDown(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleArrowClick = () => {
        const offset = secondTitleRef.current.offsetTop - 140;
        window.scrollTo({ top: offset, behavior: 'smooth' });
    };

    function handleLoginButtonClick() {
        navigate("/login");
    }

    return (
        <main className={`mainCommon home display-flex-center ${tema}`}>
            <article className={"part-1"}>
                <img className={`titulo-svg`} src={"/bunchin_title.svg"} alt={"Título do site"}/>
                <p className={"subtitulo"}>Sua solução completa para gestão de ponto e dados de funcionários.</p>
                <img className={`penas-left ${isDown ? "down" : ""}`} src={"/penas_esquerda_home.svg"}
                     alt={"Penas à esquerda"}/>
                <img className={`penas-right ${isDown ? "down" : ""}`} src={"/penas_direita_home.svg"}
                     alt={"Penas à direita"}/>
                <button className={"button-session"} onClick={handleLoginButtonClick}>
                    Iniciar sessão
                </button>
                <i className="bi bi-chevron-down seta-baixo" onClick={handleArrowClick}></i>
            </article>
            <article className={`part-2`}>
                <p ref={secondTitleRef} className={"second-title"}>NOSSOS RECURSOS</p>
                <p className={"second-subtle"}>É com essa tecnologias que nossa plataforma pode revolucionar sua
                    empresa</p>
                <div className={"box-points"}>
                    <div className={"point-wrapper"}>
                        <div className={"point"}>
                            <Clock size={90} strokeWidth={1.5}/>
                            <p className={"point-title"}>CONTROLE DE PONTOS AVANÇADO</p>
                            <p className={"point-p"}>Registre e gerencie o ponto dos funcionários com precisão. Nossa
                                tecnologia permite marcações via web, mobile e biometria, garantindo flexibilidade e
                                segurança.</p>
                        </div>
                        <div className={"point-clock"}>
                            <svg className={"line"} width="170" height="110" xmlns="http://www.w3.org/2000/svg">
                                <line x1="85" y1="0" x2="85" y2="110" strokeWidth="12"/>
                            </svg>
                            <Clock3 size={170} strokeWidth={1.5}/>
                        </div>
                    </div>
                    <div className={"point-wrapper"}>
                        <div className={"point"}>
                            <Shield size={90} strokeWidth={1.5}/>
                            <p className={"point-title"}>SEGURANÇA E CONFORMIDADE</p>
                            <p className={"point-p"}>Proteja os dados da sua empresa com nosso sistema de segurança e
                                protocólos de uso. Modos como “ponto por proximidade” são o que garantem um uso
                                correto dos nossos recursos.</p>
                        </div>
                        <div className={"point-clock"}>
                            <svg className={"line"} width="170" height="110" xmlns="http://www.w3.org/2000/svg">
                                <line x1="85" y1="0" x2="85" y2="110" strokeWidth="12"/>
                            </svg>
                            <Clock3 size={170} strokeWidth={1.5}/>
                        </div>
                    </div>
                    <div className={"point-wrapper"}>
                        <div className={"point"}>
                            <UsersRound size={90} strokeWidth={1.5}/>
                            <p className={"point-title"}>GESTÃO INTELIGENTE DA EQUIPE</p>
                            <p className={"point-p"}>Acompanhe o desempenho e a produtividade da sua equipe em tempo
                                real.
                                Analise métricas importantes, defina metas e incentive o crescimento profissional dos
                                seus colaboradores.</p>
                        </div>
                        <div className={"point-clock"}>
                            <svg className={"line"} width="170" height="110" xmlns="http://www.w3.org/2000/svg">
                                <line x1="85" y1="0" x2="85" y2="110" strokeWidth="12"/>
                            </svg>
                            <Clock3 size={170} strokeWidth={1.5}/>
                        </div>
                    </div>
                </div>
                <p className={"third-title"}>HISTÓRIAS DE SUCESSO</p>
                <div className={"box-stories"}>
                    <div className={"story"}>
                        <div className={"box-star"}>
                            <i className="bi bi-star"></i>
                            <i className="bi bi-star"></i>
                            <i className="bi bi-star"></i>
                            <i className="bi bi-star"></i>
                            <i className="bi bi-star"></i>
                        </div>
                        <p className={"story-p"}>"Desde que implementamos a plataforma, a motivação do time
                            disparou! As metas são claras e as recompensas são um incentivo constante para todos.
                            Acredito que estamos mais alinhados e engajados como nunca!"</p>
                        <p className={"story-author"}>— Ana L., Gerente de RH da [Empresa ABC]</p>
                    </div>
                    <div className={"story"}>
                        <div className={"box-star"}>
                            <i className="bi bi-star"></i>
                            <i className="bi bi-star"></i>
                            <i className="bi bi-star"></i>
                            <i className="bi bi-star"></i>
                            <i className="bi bi-star"></i>
                        </div>
                        <p className={"story-p"}>"A plataforma nos ajudou a acompanhar o desempenho de todos os
                            colaboradores em tempo real. Agora, temos relatórios precisos e podemos dar feedbacks
                            rápidos. Está facilitando muito nosso trabalho!"</p>
                        <p className={"story-author"}>— Carlos M., Diretor de Operações da [Empresa XYZ]</p>
                    </div>
                    <div className={"story"}>
                        <div className={"box-star"}>
                            <i className="bi bi-star"></i>
                            <i className="bi bi-star"></i>
                            <i className="bi bi-star"></i>
                            <i className="bi bi-star"></i>
                            <i className="bi bi-star"></i>
                        </div>
                        <p className={"story-p"}>"Ficamos surpresos com a facilidade de implementação. A
                            integração foi rápida e a equipe de suporte foi excelente, nos guiando em cada etapa.
                            O uso da plataforma no dia a dia também é muito intuitivo!"</p>
                        <p className={"story-author"}>— Juliana S., CEO da [Empresa DEF]</p>
                    </div>
                </div>
                <button className={"button-session last"}>
                    Registre sua empresa
                </button>
            </article>
            <div className={"gradient"}/>
        </main>
    );
}