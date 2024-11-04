import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../assets/ContextoDoUsuario.jsx";
import { GeneratePoints, getPoints } from "../systems/PointSystems.jsx";

export default function Perfil() {
    const { usuario } = useContext(UserContext);
    const [registros, setRegistros] = useState([]);

    useEffect(() => {
        const fetchPoints = async () => {
            const pontos = await getPoints(usuario.cpf, false);
            setRegistros(pontos);
        };
        fetchPoints();
    }, [usuario.cpf]);

    return (
        <main className={"mainCommon"}>
            <h1>{usuario.n_registro}</h1>
            <h1>{usuario.nome}</h1>
            <h1>{usuario.email}</h1>
            <h1>{usuario.senha}</h1>
            <h1>{usuario.cpf}</h1>
            <h1>{usuario.funcao}</h1>
            <h1>{usuario.cargo}</h1>
            <h1>{usuario.departamento}</h1>
            <GeneratePoints registros={registros} />
        </main>
    )

}