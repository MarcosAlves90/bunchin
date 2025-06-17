import { PanelLeft, PanelLeftDashed, Trash, PenOff, Pen } from "lucide-react";

interface AdminHeaderProps {
    sidebarCollapsed: boolean;
    funcionarioSelecionado: string;
    lockInputs: boolean;
    onSidebarToggle: () => void;
    onDeleteUser: (cpf: string) => void;
    onToggleLock: () => void;
}

export function AdminHeader({
    sidebarCollapsed,
    funcionarioSelecionado,
    lockInputs,
    onSidebarToggle,
    onDeleteUser,
    onToggleLock
}: AdminHeaderProps) {
    return (
        <div className="flex gap-1 items-center justify-center">
            {!sidebarCollapsed && (
                <PanelLeft 
                    strokeWidth={1.5} 
                    size={40} 
                    className="cursor-pointer transition-colors hover:text-highlight" 
                    onClick={onSidebarToggle} 
                />
            )}
            {sidebarCollapsed && (
                <PanelLeftDashed 
                    strokeWidth={1.5} 
                    size={40} 
                    className="cursor-pointer transition-colors hover:text-highlight" 
                    onClick={onSidebarToggle} 
                />
            )}
            <h1 className="text-4xl font-subrayada w-full text-left">DADOS DO PERFIL</h1>
            {funcionarioSelecionado && (
                <Trash
                    strokeWidth={1.5}
                    size={40}
                    className="transition-colors hover:text-red cursor-pointer"
                    onClick={() => onDeleteUser(funcionarioSelecionado)}
                />
            )}
            {funcionarioSelecionado && (
                lockInputs ? (
                    <PenOff
                        strokeWidth={1.5}
                        size={40}
                        className="cursor-pointer"
                        onClick={onToggleLock}
                    />
                ) : (
                    <Pen
                        strokeWidth={1.5}
                        size={40}
                        className="cursor-pointer"
                        onClick={onToggleLock}
                    />
                )
            )}
        </div>
    );
}
