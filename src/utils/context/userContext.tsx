import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

export interface Usuario {
    id: string;
    n_registro: number;
    nome: string;
    email: string;
    funcao: string;
    cargo: string;
    departamento: string;
    cpf: string;
    status: string;
}

export interface UserContextType {
    tema: string;
    setTema: Dispatch<SetStateAction<string>>;
    usuario: Usuario | null;
    setUsuario: Dispatch<SetStateAction<Usuario | null>>;
    API_URL: string;
}

export const UserContext = createContext<UserContextType>({
    tema: "light",
    setTema: () => {},
    usuario: null,
    setUsuario: () => {},
    API_URL: "",
});

interface UserProviderProps {
    children: ReactNode;
}

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
