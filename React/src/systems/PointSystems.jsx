import PropTypes from "prop-types";
import {useContext, useState} from "react";
import {UserContext} from "../assets/ContextoDoUsuario.jsx";

export function GeneratePoints(props) {

    const { tema, usuario } = useContext(UserContext);

    return (
        <article className={`article-registro-itens ${tema}`}>
            {registros.map(registro => {
                const date = new Date(registro.data);
                return (
                    <div key={registro.id} className="registro-item">
                        <div className={"display-flex-center"}>
                            {usuario.funcao === "administrador" && <i className="bi bi-trash" onClick={() => deletePonto(registro.id)}></i>}
                            <p className={"nome"}>{registro.nome}</p>
                            <i className="bi bi-pen"></i>
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