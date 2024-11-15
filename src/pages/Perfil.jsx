import { useContext, useEffect, useState } from "react";
import { UserContext } from "../assets/ContextoDoUsuario.jsx";
import { GeneratePoints } from "../systems/PointSystems.jsx";
import {getPoints} from "../systems/api.jsx";
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Perfil() {
    const { usuario, tema } = useContext(UserContext);
    const [registros, setRegistros] = useState([]);
    const [colapsed, setColapsed] = useState(true);

    useEffect(() => {
        (async () => {
            const pontos = await getPoints(usuario.cpf, false);
            setRegistros(pontos);
        })();
    }, [usuario.cpf]);

    const handleColapse = () => setColapsed(!colapsed);

    return (
        <main className={`mainCommon perfil ${tema}`}>
            <div className={"div-title first"}>
                <h1 className={"title"}>DADOS DO PERFIL</h1>
            </div>
            <article className={"article-inputs"}>
                <div className={"article-inputs-input nome"}>
                    <label>NOME COMPLETO</label>
                    <input value={usuario.nome || ""} placeholder={"exemplo da silva paiva"} type={"text"} name={"nome"}
                           readOnly/>
                </div>
                <div className={"article-inputs-input email"}>
                    <label>EMAIL</label>
                    <input value={usuario.email || ""} placeholder={"exemplo@gmail.com"} type={"email"} name={"email"}
                           readOnly/>
                </div>
                <div className={"article-inputs-input n-registro"}>
                    <label>REGISTRO</label>
                    <input value={usuario.n_registro || ""} placeholder={"1234567890"} type={"number"}
                           name={"n_registro"} readOnly/>
                </div>
                <div className={"article-inputs-input senha"}>
                    <label>SENHA</label>
                    <input placeholder={"senhasegura1234"} type={"text"} name={"senha"}
                           readOnly/>
                </div>
                <div className={"article-inputs-input cpf"}>
                    <label>CPF</label>
                    <input value={usuario.cpf || ""} placeholder={"12345678900"} type={"number"} name={"cpf"} readOnly/>
                </div>
                <div className={"article-inputs-input funcao"}>
                    <label>FUNÇÃO</label>
                    <input value={usuario.funcao || ""} placeholder={"comum"} type={"text"} name={"funcao"} readOnly/>
                </div>
                <div className={"article-inputs-input cargo"}>
                    <label>CARGO</label>
                    <input value={usuario.cargo || ""} placeholder={"estagiario"} type={"text"} name={"cargo"}
                           readOnly/>
                </div>
                <div className={"article-inputs-input departamento"}>
                    <label>DEPARTAMENTO</label>
                    <input value={usuario.departamento || ""} placeholder={"administrativo"} type={"text"}
                           name={"departamento"} readOnly/>
                </div>
            </article>
            <div className={"div-title last"}>
                <h1 className={"title"}>REGISTRO DE HORAS</h1>
                {colapsed ? (
                    <ChevronDown strokeWidth={0.7} className="icon" size={50} onClick={handleColapse} />
                ) : (
                    <ChevronUp strokeWidth={0.7} className="icon" size={50} onClick={handleColapse} />
                )}
            </div>
            {!colapsed && <GeneratePoints registros={registros} />}
        </main>
    )

}