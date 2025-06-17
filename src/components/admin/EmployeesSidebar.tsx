import { X, ChevronRight, Search, UserRoundPlus } from "lucide-react";
import { Funcionario } from "../../types/interfaces";
import { EmployeeSkeleton } from "../atoms/EmployeeSkeleton";
import { useMemo } from "react";

interface EmployeesSidebarProps {
    funcionarios: Funcionario[];
    searchTerm: string;
    funcionarioSelecionado: string;
    isLoading: boolean;
    tema: string;
    usuario: any;
    sidebarCollapsed: boolean;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onEmployeeSelect: (funcionario: Funcionario) => void;
    onClearSelection: () => void;
}

export function EmployeesSidebar({
    funcionarios,
    searchTerm,
    funcionarioSelecionado,
    isLoading,
    tema,
    usuario,
    sidebarCollapsed,
    onSearchChange,
    onEmployeeSelect,
    onClearSelection
}: EmployeesSidebarProps) {
    const filteredFuncionarios = useMemo(() => {
        return funcionarios.filter((funcionario: Funcionario) =>
            funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [funcionarios, searchTerm]);

    const renderEmployeesList = () => {
        if (isLoading) {
            return (
                <article className="flex flex-col gap-0.5">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <EmployeeSkeleton tema={tema} key={`skeleton-${index}`} />
                    ))}
                </article>
            );
        }

        if (filteredFuncionarios.length === 0) {
            return (
                <article className="flex flex-col gap-0.5">
                    <p className="text-center text-base text-primary opacity-70 py-2">
                        {funcionarios.length === 0 ? "Nenhum funcionário encontrado" : "Nenhum funcionário corresponde à pesquisa"}
                    </p>
                </article>
            );
        }

        return (
            <article className="flex flex-col gap-0.5">
                {filteredFuncionarios
                    .filter((funcionario: Funcionario) => usuario?.n_registro !== funcionario.n_registro)
                    .map((funcionario: Funcionario) => (
                        <div
                            key={funcionario.n_registro}
                            onClick={() => onEmployeeSelect(funcionario)}
                            className={`flex items-center justify-between cursor-pointer border-1 p-0.5 rounded-sm transition-colors hover:bg-tertiary ${
                                funcionarioSelecionado === String(funcionario.n_registro) 
                                    ? "border-highlight text-highlight" 
                                    : "border-tertiary"
                            }`}
                        >
                            <p className="nome truncate max-w-[160px]">{funcionario.nome}</p>
                            {funcionarioSelecionado === String(funcionario.n_registro) ? (
                                <X
                                    strokeWidth={2.5}
                                    size={16}
                                    absoluteStrokeWidth={true}
                                    className="text-highlight"
                                />
                            ) : (
                                <ChevronRight
                                    strokeWidth={2.5}
                                    size={16}
                                    absoluteStrokeWidth={true}
                                />
                            )}
                        </div>
                    ))}
            </article>
        );
    };
    return (
        <article className={`sidebar pt-[90px] pb-2 flex items-center justify-center text-primary transition-[max-width,padding] duration-500 ease-in-out ${
            sidebarCollapsed ? 'max-w-0 pl-0 overflow-hidden' : 'max-w-[280px] pl-1'
        }`}>
            <div className={`bg-secondary border-tertiary border-1 p-1 h-full flex flex-col rounded-sm min-w-17 gap-1 transition-[opacity,transform] duration-500 ease-in-out ${
                sidebarCollapsed ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}>
                <div className="div-title flex justify-between items-center">
                    <p className="text-lg">Funcionários</p>
                    <div>
                        <UserRoundPlus 
                            className="cursor-pointer transition-colors hover:text-highlight" 
                            onClick={onClearSelection} 
                        />
                    </div>
                </div>
                <div className="relative group">
                    <input 
                        className="border-b-2 w-full border-primary p-0.5 pr-[2.2rem] bg-tertiary rounded-t-sm group-focus-within:border-highlight" 
                        value={searchTerm} 
                        onChange={onSearchChange} 
                        placeholder="Pesquisar funcionários" 
                    />
                    <Search className="absolute right-0.5 top-1/2 transform -translate-y-1/2 text-primary group-focus-within:text-highlight" />
                </div>
                {renderEmployeesList()}
            </div>
        </article>
    );
}
