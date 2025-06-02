import { useEffect, useState } from "react";

export default function LiveClock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="horario text-7xl min-w-20">
            {time.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
        </div>
    );
}