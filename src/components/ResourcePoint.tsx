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
                <p className="point-title text-lg font-semibold">{title}</p>
                <p className="point-p text-justify text-base">{description}</p>
            </div>
            <div className="point-clock">
                <svg className="line" width="170" height="110" xmlns="http://www.w3.org/2000/svg">
                    <line x1="85" y1="0" x2="85" y2="110" strokeWidth="12" />
                </svg>
                <Clock3 size={170} strokeWidth={1.5} />
            </div>
        </div>
    );
}
