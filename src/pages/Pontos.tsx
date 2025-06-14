<<<<<<< HEAD
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
=======
import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../utils/userContext.jsx";
import { v4 as uuidv4 } from 'uuid';
import { GeneratePoints } from "../components/PointSystems.jsx";
import axios from "axios";
import {getPoints} from "../utils/getPoints.jsx";
import LiveClock from "../components/LiveClock.jsx";
import {useNavigate} from "react-router-dom";

export default function Pontos() {
    const [registros, setRegistros] = useState([]);
    const [locked, setLocked] = useState(true);
    const { tema, usuario, API_URL } = useContext(UserContext);
    const navigate = useNavigate();
>>>>>>> bea5ea5 (feat: Add main application pages and user context management)

    const registrosComuns = [
        "Entrada",
        "Almoço",
        "Retorno",
        "Saída"
    ];

<<<<<<< HEAD
    const timeoutRef = useRef<number | null>(null);

    async function handleBaterPontoClick() {
=======
    const timeoutRef = useRef(null);

    function handleBaterPontoClick() {
>>>>>>> bea5ea5 (feat: Add main application pages and user context management)
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
<<<<<<< HEAD
            const uuid = uuidv4();
            const novoRegistro: RegistroPonto = {
                nome: registrosComuns[registros.length],
                id: uuid,
                data: new Date(),
<<<<<<< HEAD
                funcionario_fk: Number(usuario?.n_registro) || 0
=======
                funcionario_fk: String(usuario?.n_registro) || ''
>>>>>>> 06dfafe (Refatora sistema de pontos para usar funcionario_id em vez de cpf, ajustando a lógica de filtragem e as interfaces correspondentes.)
            };
            await salvarPonto(novoRegistro);
=======
            const id = uuidv4();
            const novoRegistro = { nome: registrosComuns[registros.length], id: id, data: new Date() };
            setRegistros([...registros, novoRegistro]);
            salvarPonto(novoRegistro);
>>>>>>> bea5ea5 (feat: Add main application pages and user context management)
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        } else {
<<<<<<< HEAD
            setLocked('maxAtingido');
=======
            setLocked(null);
>>>>>>> bea5ea5 (feat: Add main application pages and user context management)
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => {
                    setLocked(true);
                    timeoutRef.current = null;
                }, 5000);
            }
        }
<<<<<<< HEAD
    }    
    async function salvarPonto(registro: RegistroPonto): Promise<void> {
        if (!usuario) return;

        try {
            if (generatePointsRef.current) {
                generatePointsRef.current.setLoadingNewPoint(true);
            }

            const response = await axios.post(`${API_URL}ponto`, {
                id_ponto: registro.id,
<<<<<<< HEAD
                funcionario_fk: Number(usuario.n_registro),
=======
                funcionario_fk: String(usuario.n_registro),
>>>>>>> 06dfafe (Refatora sistema de pontos para usar funcionario_id em vez de cpf, ajustando a lógica de filtragem e as interfaces correspondentes.)
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
=======
    }

    function salvarPonto(registro) {
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

>>>>>>> bea5ea5 (feat: Add main application pages and user context management)
    const handleMorePointsButtonClick = () => {
        navigate("/perfil");
    }

<<<<<<< HEAD
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
            </article>            
            <article className={"card-registros font-bold text-start w-full transition-colors rounded-sm p-1.5 bg-tertiary flex gap-1.5 flex-col"}>
                <p className={"card-registros-title text-xl font-subrayada text-primary"}>Registros recentes</p>
                <GeneratePoints ref={generatePointsRef} date={currentDate} onPointsChange={handlePointsChange} />
                <div className="card-registros-bottom-wrapper max-w-20 w-full rounded-sm text-secondary bg-highlight px-1 py-[0.7rem] mx-auto transition-colors flex gap-1 items-center hover:cursor-pointer hover:bg-primary" onClick={handleMorePointsButtonClick}>
                    <ChevronDown />
                    <p className={"card-registros-bottom-wrapper-title text-lg text-center font-semibold"}>Mais registros</p>
                </div>
=======
    useEffect(() => {
        (async () => {
            const pontos = await getPoints(usuario.cpf, true, API_URL);
            setRegistros(pontos);
        })();
    }, [usuario.cpf]);

    return (
        <main className={`mainCommon registros ${tema}`}>
            <article className={"card-horario"}>
                <div className={"clock"}>
                    <i className="bi bi-clock"></i>
                    <LiveClock/>
                </div>
                <button className={`button-ponto ${locked === null ? "indefinido" : !locked ? "bloqueado" : ""}`} onClick={handleBaterPontoClick}>{locked === null ? "Máximo atingido!" : locked ? "Bater ponto" : "Confirmar?"}</button>
            </article>
            <article className={"card-registros"}>
                <p className={"card-registros-title"}>Registros recentes</p>
                <GeneratePoints registros={registros} />
                <p className={"card-registros-bottom-title"} onClick={handleMorePointsButtonClick}>Mais registros</p>
>>>>>>> bea5ea5 (feat: Add main application pages and user context management)
            </article>
        </main>
    );
}