import { ReactNode } from "react";
import { Clock3 } from "lucide-react";

interface ResourcePointProps {
    icon: ReactNode;
    title: string;
    description: string;
}

export default function ResourcePoint({
    icon,
    title,
    description
}: ResourcePointProps) {
    return (
        <div className="mainCommon__resources__box-points__point-wrapper">
            <div className="point bg-card p-1 rounded-sm flex flex-col items-center justify-center gap-0.5 grow w-full text-primary transition-colors duration-200">
                {icon}
                <p className="point-title text-lg font-bold font-montserrat">{title}</p>
                <p className="point-p text-justify text-base font-normal">{description}</p>
            </div>
            <div className="point-clock flex items-center justify-center flex-col relative origin-top">
                <svg className="line mt-[-10px] text-card transition-colors duration-200" width="170" height="80" xmlns="http://www.w3.org/2000/svg">
                    <line x1="85" y1="0" x2="85" y2="110" stroke="currentColor" strokeWidth="8" />
                </svg>
                <Clock3 size={120} strokeWidth={1.5} className="mt-[-10px] text-card transition-colors duration-200" />
            </div>
        </div>
    );
}
