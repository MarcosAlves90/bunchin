import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../assets/ContextoDoUsuario.jsx";
import { v4 as uuidv4 } from 'uuid';
import { GeneratePoints } from "../systems/PointSystems.jsx";
import axios from "axios";
import {getPoints} from "../systems/api.jsx";
import LiveClock from "../components/LiveClock.jsx";

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
            const id = uuidv4();
            const novoRegistro = { nome: registrosComuns[registros.length], id: id, data: new Date() };
            setRegistros([...registros, novoRegistro]);
            salvarPonto(novoRegistro);
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

    function salvarPonto(registro) {
        axios.post('https://7zbcjxjz.infinityfree.com/api/ponto', {
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

    useEffect(() => {
        (async () => {
            const pontos = await getPoints(usuario.cpf, false);
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
                <p className={"card-registros-bottom-title"}>Mais registros</p>
            </article>
        </main>
    );
}