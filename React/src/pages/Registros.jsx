import Clock from "react-live-clock";
import {useContext} from "react";
import {UserContext} from "../assets/ContextoDoUsuario.jsx";

export default function Registros() {

    const { tema } = useContext(UserContext);

    return (
        <main className={`mainCommon registros ${tema}`}>
            <article className={"card-horario"}>
                <div className={"clock"}>
                    <i className="bi bi-clock"></i>
                    <Clock className={"horario"} format={'HH:mm:ss'} ticking={true} timezone={'America/Sao_Paulo'} />
                </div>
                <button className={"button-ponto"}>Bater ponto</button>
            </article>
            <article className={"card-registros"}>

            </article>
        </main>
    )

}