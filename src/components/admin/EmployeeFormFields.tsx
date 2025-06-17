import { Lock, Shield } from "lucide-react";

interface FieldOption {
    value: string;
    label: string;
}

interface FormField {
    label: string;
    name: string;
    type: "input" | "select";
    inputType?: string;
    placeholder: string;
    colSpan: string;
    disabled: boolean;
    locked?: boolean;
    options?: FieldOption[];
}

interface EmployeeFormFieldsProps {
    fields: FormField[];
    inputs: Record<string, string>;
    funcionarioSelecionado: string;
    lockInputs: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

function GenerateLockIcon({ funcionarioSelecionado, lockInputs }: { funcionarioSelecionado: string; lockInputs: boolean }) {
    return (
        <>
            {funcionarioSelecionado && lockInputs && (
                <Lock className="absolute right-0.5 top-1/2" />
            )}
        </>
    );
}

export function EmployeeFormFields({
    fields,
    inputs,
    funcionarioSelecionado,
    lockInputs,
    onChange
}: EmployeeFormFieldsProps) {
    return (
        <article className="my-2 grid grid-cols-6 gap-2">
            {fields.map(field => (
                <div key={field.name} className={`flex flex-col ${field.colSpan} relative`}>
                    <label className="w-full text-start">{field.label}</label>
                    {field.type === "input" ? (                        <input
                            className={`border-b-2 p-0.5 rounded-t-sm focus:border-highlight ${
                                field.disabled ? 'pointer-events-none' : ''
                            } 
                            ${
                                field.name === 'n_registro' || (field.name === 'cpf' && field.locked)
                                    ? 'bg-card border-placeholder' 
                                    : 'bg-secondary border-primary'
                            }`}
                            value={inputs[field.name] || ""}
                            placeholder={field.placeholder}
                            type={field.inputType}
                            name={field.name}
                            onChange={onChange}
                            disabled={field.disabled}
                        />
                    ) : (
                        <select
                            className={`border-b-2 border-primary p-0.5 bg-secondary rounded-t-sm focus:border-highlight ${
                                field.disabled ? 'pointer-events-none appearance-none' : ''
                            }`}
                            value={inputs[field.name] || field.options?.[0]?.value || ""}
                            name={field.name}
                            onChange={onChange}
                            disabled={field.disabled}
                        >
                            {field.options?.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    )}
                    {field.locked ? (
                        <Shield className="absolute right-0.5 top-1/2 text-placeholder" />
                    ) : (
                        <GenerateLockIcon funcionarioSelecionado={funcionarioSelecionado} lockInputs={lockInputs} />
                    )}
                </div>
            ))}
        </article>
    );
}
