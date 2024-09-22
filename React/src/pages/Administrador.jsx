import {useContext} from "react";
import {UserContext} from "../assets/ContextoDoUsuario.jsx";

export default function Administrador() {

    const { tema } = useContext(UserContext);

    return (
        <main className={`mainCommon administrador ${tema}`}>
            <article className={"sidebar"}>
                <div className={"div-title"}>
                    <p className={"title"}>Funcionários</p>
                </div>
                <div className={"div-search"}>
                    <input className={"search"}>

                    </input>
                </div>
            </article>
            <article className={"page"}>
                <div className={"div-title"}>
                    <h1 className={"title"}>
                        DADOS DO PERFIL
                    </h1>
                </div>
            </article>
        </main>
    )
}