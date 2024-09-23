import Clock from "react-live-clock";
import {useContext, useEffect, useState} from "react";
import { UserContext } from "../assets/ContextoDoUsuario.jsx";
import { useRef } from "react";
import {v4 as uuidv4} from 'uuid';
import {GeneratePoints} from "../systems/PointSystems.jsx";

export default function Pontos() {
    const [registros, setRegistros] = useState([]);
    const [locked, setLocked] = useState(true);
    const { tema, usuario } = useContext(UserContext);

    const registrosComuns = [
        "Entrada",
        "Almoço",
        "Retorno",
        "Saída"
    ];

    const timeoutRef = useRef(null);

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
            setRegistros([...registros, {nome: registrosComuns[registros.length], id: uuidv4(), data: new Date()}]);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        } else {
            setLocked(null);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => {
                    setLocked(true);
                    timeoutRef.current = null;
                }, 5000);
            }
        }
    }

    useEffect(() => {
        //Colocar aqui pra pegar os pontos batidos HOJE
        // do banco de dados toda vez que a tela carregar

    }, []);

    return (
        <main className={`mainCommon registros ${tema}`}>
        <article className={"card-horario"}>
                <div className={"clock"}>
                    <i className="bi bi-clock"></i>
                    <Clock
                        className={"horario"}
                        format={'HH:mm:ss'}
                        ticking={true}
                        timezone={'America/Sao_Paulo'}
                    />
                </div>
                <button className={`button-ponto ${locked === null ? "indefinido" : !locked ? "bloqueado" : ""}`} onClick={handleBaterPontoClick}>{locked === null ? "Máximo atingido!" : locked ? "Bater ponto" : "Confirmar?"}</button>
            </article>
            <article className={"card-registros"}>
                <p className={"card-registros-title"}>Registros recentes</p>
                <GeneratePoints registros={registros}/>
                <p className={"card-registros-bottom-title"}>Mais registros</p>
            </article>
        </main>
    );
}