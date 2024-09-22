import PropTypes from "prop-types";

export function GeneratePoints({registros}) {
    return (
        <article className={"article-registro-itens"}>
            {registros.map(registro => (
                <div key={registro.id} className="registro-item">
                    <p className={"nome"}>{registro.nome}</p>
                    <p className={"horario"}>{registro.data.toLocaleTimeString()}</p>
                    <div className={"container-data"}>
                        <img className={"icon-calendar"} src={"/Calendar_Days.svg"} alt={"Ícone de calendário"}/>
                        <p className={"data"}>{`${registro.data.getDate()}/${(registro.data.getMonth() + 1).toString().padStart(2, '0')}/${registro.data.getFullYear().toString().slice(-2)}`}</p>
                    </div>
                </div>
            ))}
        </article>
    );
}

GeneratePoints.propTypes = {
    registros: PropTypes.array.isRequired
}