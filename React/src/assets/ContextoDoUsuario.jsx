import {createContext, useState} from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

export function UserProvider({ children }) {

    //Colocar dados do banco de dados aqui.
    //Salvar dados de login no local storage.

    const [tema, setTema] = useState("light");

    return (
        <UserContext.Provider value={{ tema, setTema}}>
            {children}
        </UserContext.Provider>
    );
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};