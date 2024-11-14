import {useContext} from "react";
import {UserContext} from "../assets/ContextoDoUsuario.jsx";

export default function Footer() {

    const { tema } = useContext(UserContext);

    return (
        <footer className={`${tema}`}>
            <div className={"box-grid"}>
                <p>Bunchin</p>
            </div>
        </footer>
    )
}