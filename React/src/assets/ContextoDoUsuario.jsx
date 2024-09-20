import {createContext, useState} from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

export function UserProvider({ children }) {

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