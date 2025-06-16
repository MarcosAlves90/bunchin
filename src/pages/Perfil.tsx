import { useContext, useState, useCallback, useMemo } from "react";
import { UserContext } from "../utils/context/userContext.js";
import { GeneratePoints } from "../components/organisms/PointSystems";
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Perfil() {
    const { usuario } = useContext(UserContext);
    const [colapsed, setColapsed] = useState(true);      
    const [selectedDate, setSelectedDate] = useState(() => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.toISOString().split('T')[0];
    });
    const selectedDateISO = useMemo(() => {
        const [year, month, day] = selectedDate.split('-').map(Number);
        const date = new Date(year, month - 1, day, 12, 0, 0);
        return date.toISOString();
    }, [selectedDate]);

    const handleColapse = useCallback(() => setColapsed(prev => !prev), []);
    const handleDateChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    }, []);

    const userFields = useMemo(() => [
        { label: "NOME COMPLETO", value: usuario?.nome, placeholder: "Exemplo da Silva", type: "text", name: "nome" },
        { label: "EMAIL", value: usuario?.email, placeholder: "exemplo@gmail.com", type: "email", name: "email" },
        { label: "REGISTRO", value: usuario?.n_registro, placeholder: "1234567890", type: "number", name: "n_registro" },
        { label: "CPF", value: usuario?.cpf, placeholder: "12345678900", type: "number", name: "cpf" },
        { label: "FUNÇÃO", value: usuario?.funcao, placeholder: "comum", type: "text", name: "funcao" },
        { label: "CARGO", value: usuario?.cargo, placeholder: "estagiario", type: "text", name: "cargo" },
        { label: "DEPARTAMENTO", value: usuario?.departamento, placeholder: "administrativo", type: "text", name: "departamento" }
    ], [usuario]);

    return (
        <main className={`mainCommon perfil text-base gap-2 flex justify-center items-center flex-col text-primary transition-colors`}>
            <article className="w-full bg-tertiary p-1.5 rounded-sm">
                <h1 className="text-4xl font-subrayada w-full text-left">DADOS DO USUÁRIO</h1>
                <div className="inputs-box grid grid-cols-6 gap-2 w-full my-2">
                    {userFields.map(field => (
                        <div key={field.name} className={`flex flex-col ${field.name === "n_registro" ? "col-span-1" : field.name === "email" ? "col-span-2" : "col-span-3"}`}>
                            <label className="w-full text-start">{field.label}</label>
                            <input className={`border-b-2 border-placeholder p-0.5 bg-card rounded-t-sm pointer-events-none`} value={field.value || ""} placeholder={field.placeholder} type={field.type} name={field.name} readOnly />
                        </div>
                    ))}
                </div>
            </article>
            <article className="w-full bg-tertiary p-1.5 rounded-sm">
                <div className={`flex justify-between items-center ${!colapsed ? "pb-0.5 border-b-1 border-card mb-1" : ""}`}>
                    <h1 className="text-4xl font-subrayada w-full text-left">REGISTRO DE HORAS</h1>
                    {colapsed ? (
                        <ChevronDown strokeWidth={0.9} className="icon bg-highlight rounded-sm text-secondary cursor-pointer" size={50} onClick={handleColapse} />
                    ) : (
                        <ChevronUp strokeWidth={0.9} className="icon bg-highlight rounded-sm text-secondary cursor-pointer" size={50} onClick={handleColapse} />
                    )}                
                </div>
                {!colapsed && (
                    <>
                        <div className="w-full mb-2 flex items-center justify-center">
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                className="w-full p-0.5 bg-secondary border-b-2 border-primary rounded-t-sm text-primary font-medium focus:outline-none focus:border-highlight transition-colors cursor-pointer"
                                onClick={(e) => e.currentTarget.showPicker()}
                            />
                        </div>
                        <GeneratePoints date={selectedDateISO} />
                    </>
                )}
            </article>
        </main>
    );
}