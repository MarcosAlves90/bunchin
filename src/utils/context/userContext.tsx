import { createContext, useState } from "react";
import { Usuario, UserContextType, UserProviderProps } from "../../types/interfaces";

export const UserContext = createContext<UserContextType>({
    tema: "light",
    setTema: () => {},
    usuario: null,
    setUsuario: () => {},
    API_URL: "",
});

export function UserProvider({ children }: UserProviderProps) {
    const [tema, setTema] = useState<string>("light");
    const storedUsuario = localStorage.getItem("usuario");
    const [usuario, setUsuario] = useState<Usuario | null>(
        storedUsuario ? JSON.parse(storedUsuario) as Usuario : null
    );
    const API_URL = (import.meta as any).env.VITE_APP_API_URL as string;

    return (
        <UserContext.Provider value={{ tema, setTema, usuario, setUsuario, API_URL }}>
            {children}
        </UserContext.Provider>
    );
}
