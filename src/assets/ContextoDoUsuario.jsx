import {createContext, useState} from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

export function UserProvider({ children }) {

    //Colocar dados do banco de dados aqui.
    //Salvar dados de login no local storage.

    const [tema, setTema] = useState("light");
    const [usuario, setUsuario] = useState(localStorage.getItem("usuario") ? JSON.parse(localStorage.getItem("usuario")) : null);
    const API_URL = import.meta.env.VITE_APP_API_URL

    return (
        <UserContext.Provider value={{ tema, setTema, usuario, setUsuario, API_URL}}>
            {children}
        </UserContext.Provider>
    );
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};