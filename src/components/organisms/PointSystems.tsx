import axios from "axios";
import PropTypes from "prop-types";
import ReactModal from 'react-modal';
import { useCallback, useContext, useState, useMemo, useEffect, forwardRef, useImperativeHandle } from "react";
import { UserContext } from "../../utils/context/userContext";
import { useLocation } from "react-router-dom";
import { SendEmail } from "../../utils/services/sendEmail";
import { CalendarDays, BadgeX, Pencil, PencilOff, OctagonAlert } from "lucide-react";
import { getPoints } from "../../utils/services/getPoints";
import { ErrorModal, FormState } from "../molecules/ErrorModal";
import { PointSkeleton } from "../atoms/PointSkeleton";

ReactModal.setAppElement('#root');

export interface RegistroPonto {
    id: string;
    funcionario_fk: string;
    nome: string;
    data: Date;
}

interface GeneratePointsProps {
    canDelete?: boolean;
    canRefresh?: boolean;
    cpf?: string;
    onPointsChange?: (registros: RegistroPonto[]) => void;
    todayOnly?: boolean;
}

export interface GeneratePointsRef {
    refreshPoints: () => Promise<void>;
    setLoadingNewPoint: (loading: boolean) => void;
}

interface EditState {
    id: string | null;
    date: string;
    time: string;
}

interface RegistroItemProps {
    registro: RegistroPonto;
    isAdmin: boolean;
    handleOpenModal: (registro: RegistroPonto) => void;
    onDeletePonto?: (id: string) => void;
    editState: EditState;
    setEditState: React.Dispatch<React.SetStateAction<EditState>>;
    updatePonto: (registro: RegistroPonto) => Promise<void>;
    formatLocalDate: (date: Date) => string;
}

const RegistroItem = ({ registro, isAdmin, handleOpenModal, onDeletePonto, editState,
    setEditState, updatePonto, formatLocalDate }: RegistroItemProps) => {
    const originalDate = new Date(registro.data);
    const isEditing = editState.id === registro.id;

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>, separator: string) => {
        const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', separator];
        const value = e.currentTarget.value;
        const selectionStart = e.currentTarget.selectionStart;
        if (e.key === 'Backspace' && selectionStart !== null && value[selectionStart - 1] === separator) {
            e.preventDefault();
        } else if (!allowedKeys.includes(e.key) && !/^\d$/.test(e.key)) {
            e.preventDefault();
        }
    }, []);

    const handlePenButtonClick = () => {
        if (isEditing) {
            updatePonto(registro);
            setEditState({ id: null, date: '', time: '' });
        } else {
            setEditState({
                id: registro.id,
                date: formatLocalDate(originalDate),
                time: originalDate.toLocaleTimeString('pt-BR')
            });
        }
    };

    return (
        <div className="registro-item relative flex min-h-9 flex-col items-center justify-center gap-1 rounded-sm bg-primary p-0.5 text-secondary transition-colors">
            {!isAdmin && (
                <OctagonAlert className="absolute top-0.5 right-0.5 cursor-pointer hover:text-red" onClick={() => handleOpenModal(registro)} />
            )}            {isAdmin && (
                <>
                    {onDeletePonto && (
                        <BadgeX className="absolute top-0.5 right-0.5 cursor-pointer hover:text-red" onClick={() => onDeletePonto(registro.id)} />
                    )}
                    {!isEditing ? (
                        <Pencil className="absolute top-0.5 left-0.5 cursor-pointer" onClick={handlePenButtonClick} />
                    ) : (
                        <PencilOff className="absolute top-0.5 left-0.5 cursor-pointer" onClick={handlePenButtonClick} />
                    )}
                </>
            )}

            <p className="w-full text-center text-xl font-bold">{registro.nome}</p>

            <input
                className="w-full text-center text-2xl font-bold"
                name="hours"
                disabled={!isEditing}
                onChange={e => setEditState(prev => ({ ...prev, time: e.target.value }))}
                onKeyDown={e => handleKeyDown(e, ':')}
                value={isEditing ? editState.time : originalDate.toLocaleTimeString('pt-BR')}
            />

            <div className="w-full flex items-center justify-center">
                <CalendarDays />
                <input
                    className="max-w-6 text-base text-center"
                    name="date"
                    disabled={!isEditing}
                    onChange={e => setEditState(prev => ({ ...prev, date: e.target.value }))}
                    onKeyDown={e => handleKeyDown(e, '/')}
                    value={isEditing ? editState.date : formatLocalDate(originalDate)}
                />
            </div>
        </div>
    );
};

export const GeneratePoints = forwardRef<GeneratePointsRef, GeneratePointsProps>(({ canDelete = false, canRefresh = false, cpf, onPointsChange, todayOnly = false }, ref) => {
    const { tema, usuario, API_URL } = useContext(UserContext);
    const location = useLocation();
    const [registros, setRegistros] = useState<RegistroPonto[]>([]);
    const [selectedItem, setSelectedItem] = useState<RegistroPonto | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [formState, setFormState] = useState<FormState>({ message: '', reason: '' });
    const [editState, setEditState] = useState<EditState>({ id: null, date: '', time: '' });
    const [loadingNewPoint, setLoadingNewPoint] = useState(false);

    const formatLocalDate = useCallback((date: Date): string =>
        date.toLocaleDateString('pt-BR').replace(/(\d{4})$/, match => match.slice(-2)), []);

    const getUpdatedDate = useCallback((originalDate: Date): Date => {
        const { date, time } = editState;
        if (!date && !time) return originalDate;

        const [day, month, year] = (date || originalDate.toLocaleDateString('pt-BR')).split('/').map(Number);
        const fullYear = year < 100 ? 2000 + year : year;
        const [hours, minutes, seconds] = (time || originalDate.toLocaleTimeString('pt-BR')).split(':').map(Number);
        return new Date(fullYear, month - 1, day, hours, minutes, seconds);
    }, [editState]);

    const handleOpenModal = useCallback((registro: RegistroPonto): void => {
        setSelectedItem(registro);
        setShowModal(true);
    }, []);

    const handleCloseModal = useCallback((): void => {
        setSelectedItem(null);
        setShowModal(false);
        setFormState({ message: '', reason: '' });
    }, []);

    const handleSendMessage = useCallback((data: Date): void => {
        if (usuario?.email) {
            SendEmail(
                // @ts-ignore
                import.meta.env.VITE_PUBLIC_API_KEY,
                // @ts-ignore
                import.meta.env.VITE_SERVICE_API_KEY,
                // @ts-ignore
                import.meta.env.VITE_TEMPLATE_API_KEY_2,
                {
                    email: usuario.email,
                    complaint: formState.message,
                    to_name: usuario.nome || '',
                    datePoint: data,
                    reason: formState.reason,
                }
            );
            handleCloseModal();
        }
    }, [usuario, formState, handleCloseModal]); const getPonto = useCallback(async (): Promise<void> => {
        const cpfToUse = cpf || usuario?.cpf || '';
        if (cpfToUse) {
            try {
                const pontos = await getPoints(cpfToUse, todayOnly, API_URL);
                setRegistros(pontos);
                if (onPointsChange) {
                    onPointsChange(pontos);
                }
            } catch (error) {
                console.error("Erro ao buscar pontos:", error);
                setRegistros([]);
                if (onPointsChange) {
                    onPointsChange([]);
                }
            }
        }
    }, [cpf, usuario?.cpf, API_URL, todayOnly, onPointsChange]);
    useImperativeHandle(ref, () => ({
        refreshPoints: getPonto,
        setLoadingNewPoint
    }), [getPonto]);

    useEffect(() => {
        getPonto();
    }, [getPonto]);

    const deletePonto = useCallback(async (id: string): Promise<void> => {
        if (!canDelete) return;

        try {
            await axios.delete(`${API_URL}ponto/${id}`);
            console.log("Ponto deletado com sucesso!");
            await getPonto();
        } catch (error) {
            console.error("Erro ao deletar ponto:", error);
        }
    }, [API_URL, canDelete, getPonto]);

    const updatePonto = useCallback(async (registro: RegistroPonto): Promise<void> => {
        try {
            const updatedDate = getUpdatedDate(new Date(registro.data));
            await axios.put(`${API_URL}ponto/${registro.id}`, {
                id_ponto: registro.id,
                funcionario_fk: registro.funcionario_fk,
                nome_tipo: registro.nome,
                data_hora: updatedDate.toISOString()
            });
            if (canRefresh) await getPonto();
        } catch (error) {
            console.error("Erro ao salvar ponto:", error);
        }
    }, [API_URL, getUpdatedDate, canRefresh, getPonto]);

    const sortedRegistros = useMemo(() => {
        const isPerfilOrAdmin = location.pathname === "/perfil" || usuario?.funcao === "administrador";
        return [...registros].sort((a, b) => {
            const dateA = new Date(a.data).getTime();
            const dateB = new Date(b.data).getTime();
            const sameDay = new Date(a.data).toDateString() === new Date(b.data).toDateString();

            return isPerfilOrAdmin
                ? (sameDay ? dateA - dateB : dateB - dateA)
                : dateA - dateB;
        });
    }, [registros, location.pathname, usuario?.funcao]);

    const isAdmin = useMemo(() =>
        location.pathname !== "/pontos" &&
        location.pathname !== "/perfil" &&
        usuario?.funcao === "administrador",
        [location.pathname, usuario?.funcao]);

    return (
        <>
            <ErrorModal
                isOpen={showModal}
                onClose={handleCloseModal}
                selectedItem={selectedItem}
                formState={formState}
                setFormState={setFormState}
                handleSendMessage={handleSendMessage}
            />            
            <article className={`grid grid-cols-4 gap-1`}>
                {sortedRegistros.length > 0 ? (
                    <>
                        {sortedRegistros.map(registro => (
                            <RegistroItem
                                key={registro.id}
                                registro={registro}
                                isAdmin={isAdmin}
                                handleOpenModal={handleOpenModal}
                                onDeletePonto={canDelete ? deletePonto : undefined}
                                editState={editState}
                                setEditState={setEditState}
                                updatePonto={updatePonto}
                                formatLocalDate={formatLocalDate}
                            />
                        ))}
                        {loadingNewPoint && (
                            <PointSkeleton key="loading" tema={tema} />
                        )}
                    </>
                ) : (
                    Array(4).fill(0).map((_, index) => (
                        <PointSkeleton key={index} tema={tema} />
                    ))
                )}
            </article>
        </>
    );
});

GeneratePoints.propTypes = {
    canDelete: PropTypes.bool,
    canRefresh: PropTypes.bool,
    cpf: PropTypes.string,
    onPointsChange: PropTypes.func,
    todayOnly: PropTypes.bool
};