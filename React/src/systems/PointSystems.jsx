import PropTypes from "prop-types";
import {useContext} from "react";
import {UserContext} from "../assets/ContextoDoUsuario.jsx";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const getPoints = async (cpf, todayBool) => {
    try {
        const response = await axios.get(`http://localhost:80/api/ponto/`);
        if (Array.isArray(response.data)) {
            const today = new Date();
            const pontos = response.data
                .filter(ponto => {
                    const pointDate = new Date(ponto.data_hora);
                    const validatePoint = todayBool ? pointDate.toDateString() === today.toDateString() : true;
                    return validatePoint && ponto.funcionario_fk === cpf;
                })
                .map(ponto => ({
                    nome: ponto.nome_tipo,
                    id: ponto.id_ponto,
                    data: new Date(ponto.data_hora)
                }));
            return pontos;
        } else {
            console.error("Resposta inesperada da API:", response.data);
            return [];
        }
    } catch (error) {
        console.error("Erro ao carregar pontos do dia:", error);
        return [];
    }
}

export function GeneratePoints({ registros, deletePonto }) {
    const { tema, usuario } = useContext(UserContext);
    const location = useLocation();

    const sortedRegistros = registros.sort((a, b) => new Date(a.data) - new Date(b.data));

    return (
        <article className={`article-registro-itens ${tema}`}>
            {sortedRegistros.map(registro => {
                const date = new Date(registro.data);
                return (
                    <div key={registro.id} className="registro-item">
                        <div className={"display-flex-center"}>
                            {location.pathname !== "/pontos" && usuario.funcao === "administrador" && <i className="bi bi-trash3 icon-delete" onClick={() => deletePonto(registro.id)}></i>}
                            <p className={"nome"}>{registro.nome}</p>
                            {location.pathname !== "/pontos" && usuario.funcao === "administrador" && <i className="bi bi-pen"></i>}
                        </div>
                        <p className={"horario"}>{date.toLocaleTimeString()}</p>
                        <div className={"container-data"}>
                            <img className={"icon-calendar"} src={"/Calendar_Days.svg"} alt={"Ícone de calendário"} />
                            <p className={"data"}>{`${date.getDate()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`}</p>
                        </div>
                    </div>
                );
            })}
        </article>
    );
}

GeneratePoints.propTypes = {
    registros: PropTypes.array.isRequired,
    deletePonto: PropTypes.func.isRequired
}