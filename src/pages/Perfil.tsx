import { useContext, useState, useCallback, useMemo } from "react";
import { UserContext } from "../utils/context/userContext.js";
import { GeneratePoints } from "../components/organisms/PointSystems";
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Perfil() {
    const { usuario, tema } = useContext(UserContext);
    const [colapsed, setColapsed] = useState(true);

    const handleColapse = useCallback(() => setColapsed(prev => !prev), []);    const userFields = useMemo(() => [
        { label: "NOME COMPLETO", value: usuario?.nome, placeholder: "Exemplo da Silva", type: "text", name: "nome" },
        { label: "EMAIL", value: usuario?.email, placeholder: "exemplo@gmail.com", type: "email", name: "email" },
        { label: "REGISTRO", value: usuario?.n_registro, placeholder: "1234567890", type: "number", name: "n_registro" },
        { label: "CPF", value: usuario?.cpf, placeholder: "12345678900", type: "number", name: "cpf" },
        { label: "FUNÇÃO", value: usuario?.funcao, placeholder: "comum", type: "text", name: "funcao" },
        { label: "CARGO", value: usuario?.cargo, placeholder: "estagiario", type: "text", name: "cargo" },
        { label: "DEPARTAMENTO", value: usuario?.departamento, placeholder: "administrativo", type: "text", name: "departamento" }
    ], [usuario]);

    return (
        <main className={`mainCommon perfil ${tema}`}>
            <div className="div-title first">
                <h1 className="title">DADOS DO PERFIL</h1>
            </div>
            <article className="article-inputs">
                {userFields.map(field => (
                    <div key={field.name} className={`article-inputs-input ${field.name}`}>
                        <label>{field.label}</label>
                        <input value={field.value || ""} placeholder={field.placeholder} type={field.type} name={field.name} readOnly />
                    </div>
                ))}
            </article>
            <div className="div-title last" onClick={handleColapse}>
                <h1 className="title">REGISTRO DE HORAS</h1>
                {colapsed ? (
                    <ChevronDown strokeWidth={0.7} className="icon" size={50} />
                ) : (
                    <ChevronUp strokeWidth={0.7} className="icon" size={50} />
                )}
            </div>
            {!colapsed && <GeneratePoints />}
        </main>
    );
}