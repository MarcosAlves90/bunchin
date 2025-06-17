import { AdminHeader } from "./AdminHeader";
import { EmployeeFormFields } from "./EmployeeFormFields";
import useLoadingDots from "../../utils/hooks/useLoadingDots";
import { useMemo } from "react";

interface EmployeeFormProps {
    inputs: Record<string, string>;
    funcionarioSelecionado: string;
    lockInputs: boolean;
    loadingSubmit: boolean;
    showSuccessMessage: boolean;
    showEditModeMessage: boolean;
    sidebarCollapsed: boolean;
    cpfError: string;
    onSubmit: (event: React.FormEvent) => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSidebarToggle: () => void;
    onDeleteUser: (cpf: string) => void;
    onToggleLock: () => void;
}

export function EmployeeForm({
    inputs,
    funcionarioSelecionado,
    lockInputs,
    loadingSubmit,
    showSuccessMessage,
    showEditModeMessage,
    sidebarCollapsed,
    cpfError,
    onSubmit,
    onChange,
    onSidebarToggle,
    onDeleteUser,
    onToggleLock
}: EmployeeFormProps) {
    const loadingDots = useLoadingDots(loadingSubmit);

    const userFields = useMemo(() => [
        {
            label: "NOME COMPLETO",
            name: "nome",
            type: "input" as const,
            inputType: "text",
            placeholder: "Digite seu nome aqui",
            colSpan: "col-span-3",
            disabled: funcionarioSelecionado ? lockInputs : false
        },
        {
            label: "EMAIL",
            name: "email",
            type: "input" as const,
            inputType: "email",
            placeholder: "exemplo@gmail.com",
            colSpan: "col-span-2",
            disabled: funcionarioSelecionado ? lockInputs : false
        },
        {
            label: "REGISTRO",
            name: "n_registro",
            type: "input" as const,
            inputType: "number",
            placeholder: "",
            colSpan: "col-span-1",
            disabled: true,
            locked: true
        },
        {
            label: "CPF",
            name: "cpf",
            type: "input" as const,
            inputType: "text",
            placeholder: "000.000.000-00",
            colSpan: "col-span-3",
            disabled: !!funcionarioSelecionado, // CPF desabilitado apenas quando funcionário está selecionado
            locked: !!funcionarioSelecionado // Mostra o escudo quando funcionário está selecionado
        },
        {
            label: "FUNÇÃO",
            name: "funcao",
            type: "select" as const,
            placeholder: "",
            colSpan: "col-span-3",
            disabled: funcionarioSelecionado ? lockInputs : false,
            options: [
                { value: "comum", label: "Comum" },
                { value: "administrador", label: "Administrador" }
            ]
        },
        {
            label: "CARGO",
            name: "cargo",
            type: "select" as const,
            placeholder: "",
            colSpan: "col-span-3",
            disabled: funcionarioSelecionado ? lockInputs : false,
            options: [
                { value: "estagiario", label: "Estagiário" },
                { value: "auxiliar-administrativo", label: "Auxiliar administrativo" },
                { value: "gerente", label: "Gerente" },
                { value: "diretor", label: "Diretor" }
            ]
        },
        {
            label: "DEPARTAMENTO",
            name: "departamento",
            type: "select" as const,
            placeholder: "",
            colSpan: "col-span-3",
            disabled: funcionarioSelecionado ? lockInputs : false,
            options: [
                { value: "administrativo", label: "Administrativo" },
                { value: "financeiro", label: "Financeiro" },
                { value: "marketing", label: "Marketing" },
                { value: "producao", label: "Produção" }
            ]
        }
    ], [lockInputs, funcionarioSelecionado]);

    return (
        <article className="bg-tertiary rounded-sm p-1.5 flex flex-col">
            <AdminHeader
                sidebarCollapsed={sidebarCollapsed}
                funcionarioSelecionado={funcionarioSelecionado}
                lockInputs={lockInputs}
                onSidebarToggle={onSidebarToggle}
                onDeleteUser={onDeleteUser}
                onToggleLock={onToggleLock}
            />
            <form onSubmit={onSubmit}>
                <EmployeeFormFields
                    fields={userFields}
                    inputs={inputs}
                    funcionarioSelecionado={funcionarioSelecionado}
                    lockInputs={lockInputs}
                    onChange={onChange}
                />
                <div className="container-save-button">
                    <button
                        className={`border-none transition text-lg px-2 py-[0.7rem] rounded-sm text-secondary cursor-pointer font-medium max-w-20 w-full ${
                            loadingSubmit ? "bg-gray-400 cursor-not-allowed pointer-events-none" :
                            cpfError ? "bg-red hover:bg-red-600 cursor-not-allowed" :
                            showSuccessMessage ? "bg-green hover:bg-green-600" :
                            showEditModeMessage ? "bg-red hover:bg-secondary hover:text-red" :
                            "bg-highlight hover:bg-primary"
                        }`}
                        type="submit"
                        disabled={loadingSubmit || !!cpfError}
                    >
                        {loadingSubmit ? `Carregando${loadingDots}` :
                        cpfError ? cpfError :
                        showSuccessMessage ? (funcionarioSelecionado ? "Funcionário atualizado!" : "Funcionário criado!") :
                        showEditModeMessage ? "Modo de Edição Necessário" :
                        (!funcionarioSelecionado ? "Criar usuário" : "Salvar alterações")
                        }
                    </button>
                </div>
            </form>
        </article>
    );
}
