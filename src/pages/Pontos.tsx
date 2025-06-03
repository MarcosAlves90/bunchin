import { useContext, useEffect, useState, useRef } from "react";
import { UserContext, UserContextType } from "../utils/userContext.jsx";
import { v4 as uuidv4 } from 'uuid';
import { GeneratePoints, RegistroPonto } from "../components/PointSystems.jsx";
import axios from "axios";
import {getPoints} from "../utils/getPoints.jsx";
import LiveClock from "../components/LiveClock.jsx";
import {useNavigate} from "react-router-dom";
import { ChevronDown, AlarmClock } from "lucide-react";

export default function Pontos() {
    const [registros, setRegistros] = useState<RegistroPonto[]>([]);
    const [locked, setLocked] = useState<boolean | 'maxAtingido'>(true);
    const { usuario, API_URL } = useContext<UserContextType>(UserContext);
    const navigate = useNavigate();

    const registrosComuns = [
        "Entrada",
        "Almoço",
        "Retorno",
        "Saída"
    ];

    const timeoutRef = useRef<number | null>(null);
    
    function handleBaterPontoClick() {
        if (locked) {
            setLocked(false);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                setLocked(true);
                timeoutRef.current = null;
            }, 5000);
        } else if (!locked && registros.length < 4) {
            setLocked(true);
            const uuid = uuidv4();
            const novoRegistro: RegistroPonto = { 
                nome: registrosComuns[registros.length], 
                id: uuid, 
                data: new Date(),
                funcionario_fk: usuario?.cpf || ''
            };
            setRegistros([...registros, novoRegistro]);
            salvarPonto(novoRegistro);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        } else {
            setLocked('maxAtingido');
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => {
                    setLocked(true);
                    timeoutRef.current = null;
                }, 5000);
            }
        }
    }

    function salvarPonto(registro: RegistroPonto): void {
        if (!usuario) return;
        
        axios.post(`${API_URL}ponto`, {
            id_ponto: registro.id,
            funcionario_fk: usuario.cpf,
            nome_tipo: registro.nome,
            data_hora: registro.data
        }).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.error("Erro ao salvar ponto:", error);
        });
    }

    const handleMorePointsButtonClick = () => {
        navigate("/perfil");
    }

    useEffect(() => {
        (async () => {
            if (!usuario) return;
            const pontos = await getPoints(usuario.cpf, true, API_URL);
            setRegistros(pontos);
        })();
    }, [usuario?.cpf, API_URL]);

    return (
        <main className={`mainCommon text-base flex justify-center items-center flex-col`}>
            <article className={"card-horario bg-card rounded-sm w-full transition-colors p-1.5 gap-3 flex flex-col items-center"}>
                <div className={"clock flex items-center justify-between gap-1 text-primary mt-3"}>
                    <AlarmClock className="w-[65px] h-[65px]"/>
                    <LiveClock/>
                </div>
                <button className={`button-session max-w-20 w-full ${locked === 'maxAtingido' ? "!bg-red !text-primary" : !locked ? "!bg-green hover:!bg-secondary hover:!text-green" : ""}`} onClick={handleBaterPontoClick}>{locked === 'maxAtingido' ? "Máximo atingido!" : locked ? "Bater ponto" : "Confirmar?"}</button>
            </article>
            <article className={"card-registros font-bold text-start mt-2 w-full transition-colors rounded-sm p-1.5 bg-card flex gap-1.5 flex-col"}>
                <p className={"card-registros-title text-xl font-subrayada text-primary"}>Registros recentes</p>
                <GeneratePoints registros={registros} />
                <div className="card-registros-bottom-wrapper max-w-20 w-full rounded-sm text-secondary bg-highlight px-1 py-[0.7rem] mx-auto transition-colors flex gap-1 items-center hover:cursor-pointer hover:bg-primary" onClick={handleMorePointsButtonClick}>
                    <ChevronDown/>
                    <p className={"card-registros-bottom-wrapper-title text-lg text-center font-semibold"}>Mais registros</p>
                </div>
            </article>
        </main>
    );
}