import { useContext, useState, useRef, useCallback, useMemo } from "react";
import { UserContext, UserContextType } from "../utils/context/userContext.js";
import { v4 as uuidv4 } from 'uuid';
import { GeneratePoints, RegistroPonto, GeneratePointsRef } from "../components/organisms/PointSystems";
import axios from "axios";
import LiveClock from "../components/atoms/LiveClock.js";
import { useNavigate } from "react-router-dom";
import { ChevronDown, AlarmClock } from "lucide-react";

export default function Pontos() {
    const [registros, setRegistros] = useState<RegistroPonto[]>([]);
    const [locked, setLocked] = useState<boolean | 'maxAtingido'>(true);
    const { usuario, API_URL } = useContext<UserContextType>(UserContext);
    const navigate = useNavigate();
    const generatePointsRef = useRef<GeneratePointsRef>(null);
    
    // Memo para evitar recriação desnecessária da data
    const currentDate = useMemo(() => new Date().toISOString(), []);

    const registrosComuns = [
        "Entrada",
        "Almoço",
        "Retorno",
        "Saída"
    ];

    const timeoutRef = useRef<number | null>(null);

    async function handleBaterPontoClick() {
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
            await salvarPonto(novoRegistro);
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
    async function salvarPonto(registro: RegistroPonto): Promise<void> {
        if (!usuario) return;

        try {
            if (generatePointsRef.current) {
                generatePointsRef.current.setLoadingNewPoint(true);
            }

            const response = await axios.post(`${API_URL}ponto`, {
                id_ponto: registro.id,
                funcionario_fk: usuario.cpf,
                nome_tipo: registro.nome,
                data_hora: registro.data
            });
            console.log(response.data);
            
            if (generatePointsRef.current) {
                await generatePointsRef.current.refreshPoints();
            }
        } catch (error) {
            console.error("Erro ao salvar ponto:", error);
        } finally {
            if (generatePointsRef.current) {
                generatePointsRef.current.setLoadingNewPoint(false);
            }
        }
    }
    const handleMorePointsButtonClick = () => {
        navigate("/perfil");
    }

    const handlePointsChange = useCallback((pontos: RegistroPonto[]) => {
        setRegistros(pontos);
    }, []);

    return (
        <main className={`mainCommon text-base flex justify-center items-center flex-col gap-2`}>
            <article className={"card-horario bg-tertiary rounded-sm w-full transition-colors p-1.5 gap-3 flex flex-col items-center"}>
                <div className={"clock flex items-center justify-between gap-1 text-primary mt-3"}>
                    <AlarmClock className="w-[65px] h-[65px]" />
                    <LiveClock />
                </div>
                <button className={`button-session max-w-20 w-full ${locked === 'maxAtingido' ? "!bg-red !text-primary" : !locked ? "!bg-green hover:!bg-secondary hover:!text-green" : ""}`} onClick={handleBaterPontoClick}>{locked === 'maxAtingido' ? "Máximo atingido!" : locked ? "Bater ponto" : "Confirmar?"}</button>
            </article>            <article className={"card-registros font-bold text-start w-full transition-colors rounded-sm p-1.5 bg-tertiary flex gap-1.5 flex-col"}>
                <p className={"card-registros-title text-xl font-subrayada text-primary"}>Registros recentes</p>
                <GeneratePoints ref={generatePointsRef} date={currentDate} onPointsChange={handlePointsChange} />
                <div className="card-registros-bottom-wrapper max-w-20 w-full rounded-sm text-secondary bg-highlight px-1 py-[0.7rem] mx-auto transition-colors flex gap-1 items-center hover:cursor-pointer hover:bg-primary" onClick={handleMorePointsButtonClick}>
                    <ChevronDown />
                    <p className={"card-registros-bottom-wrapper-title text-lg text-center font-semibold"}>Mais registros</p>
                </div>
            </article>
        </main>
    );
}