import { ChevronDown, ChevronUp } from "lucide-react";
import { GeneratePoints } from "../organisms/PointSystems";

interface EmployeeTimeRecordsProps {
    funcionarioSelecionado: string;
    colapsed: boolean;
    selectedDate: string;
    selectedDateISO: string;
    onCollapseToggle: () => void;
    onDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function EmployeeTimeRecords({
    funcionarioSelecionado,
    colapsed,
    selectedDate,
    selectedDateISO,
    onCollapseToggle,
    onDateChange
}: EmployeeTimeRecordsProps) {
    if (!funcionarioSelecionado) return null;

    return (
        <article className="w-full bg-tertiary p-1.5 rounded-sm">
            <div className={`flex justify-between items-center ${!colapsed ? "pb-0.5 border-b-1 border-card mb-1" : ""}`}>
                <h1 className="text-4xl font-subrayada w-full text-left">REGISTRO DE HORAS</h1>
                {colapsed ? (
                    <ChevronDown 
                        strokeWidth={0.9} 
                        className="icon bg-highlight rounded-sm text-secondary cursor-pointer" 
                        size={50} 
                        onClick={onCollapseToggle} 
                    />
                ) : (
                    <ChevronUp 
                        strokeWidth={0.9} 
                        className="icon bg-highlight rounded-sm text-secondary cursor-pointer" 
                        size={50} 
                        onClick={onCollapseToggle} 
                    />
                )}
            </div>
            {!colapsed && (
                <>
                    <div className="w-full mb-2 flex items-center justify-center">
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={onDateChange}
                            className="w-full border-b-2 border-primary p-0.5 bg-secondary rounded-t-sm"
                            onClick={(e) => e.currentTarget.showPicker()}
                        />
                    </div>
                    <GeneratePoints 
                        funcionario_id={funcionarioSelecionado} 
                        date={selectedDateISO} 
                        canDelete={true} 
                        canRefresh={true} 
                    />
                </>
            )}
        </article>
    );
}
