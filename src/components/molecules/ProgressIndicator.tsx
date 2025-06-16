interface ProgressIndicatorProps {
    step: number;
    onStepClick: (targetStep: number) => void;
    canNavigateToStep: (targetStep: number) => boolean;
}

export default function ProgressIndicator({
    step,
    onStepClick,
    canNavigateToStep
}: ProgressIndicatorProps) {
    return (
        <div className="flex items-center justify-center mt-2 opacity-80">
            <div
                className={`w-1 h-1 rounded-full flex items-center justify-center transition-colors cursor-pointer
                    ${step >= 1 ? "bg-(--highlight)" : "bg-(--primary)"}
                    ${canNavigateToStep(1) ? "hover:scale-110" : ""}
                `}
                onClick={() => canNavigateToStep(1) && onStepClick(1)}
                title="Etapa 1: Dados da empresa"
            />
            <div className={`h-[0.3rem] w-1 ${step === 2 ? "bg-(--highlight)" : "bg-(--primary)"}`}></div>
            <div
                className={`w-1 h-1 rounded-full flex items-center justify-center transition-colors cursor-pointer
                    ${step === 2 ? "bg-(--highlight)" : "bg-(--primary)"}
                    ${canNavigateToStep(2) ? "hover:scale-110" : "cursor-not-allowed opacity-50"}
                `}
                onClick={() => canNavigateToStep(2) && onStepClick(2)}
                title="Etapa 2: Dados pessoais"
            />
        </div>
    );
}
