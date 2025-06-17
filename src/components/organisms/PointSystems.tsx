import axios from "axios";
import PropTypes from "prop-types";
import ReactModal from 'react-modal';
import { useCallback, useContext, useState, useMemo, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { UserContext } from "../../utils/context/userContext";
import { useLocation } from "react-router-dom";
import { SendEmail } from "../../utils/services/sendEmail";
import { CalendarDays, BadgeX, Pencil, PencilOff, OctagonAlert } from "lucide-react";
import { getPoints } from "../../utils/services/getPoints";
import { ErrorModal } from "../molecules/ErrorModal";
import { PointSkeleton } from "../atoms/PointSkeleton";
import { 
    RegistroPonto, 
    GeneratePointsProps, 
    GeneratePointsRef, 
    EditState, 
    RegistroItemProps,
    FormState
} from "../../types/interfaces";

ReactModal.setAppElement('#root');

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
            )}
            {isAdmin && (
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
                    className="max-w-6 text-base text-center font-bold"
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

export const GeneratePoints = forwardRef<GeneratePointsRef, GeneratePointsProps>(({ canDelete = false, canRefresh = false, funcionario_id, onPointsChange, date }, ref) => {
    const { tema, usuario, API_URL } = useContext(UserContext);
    const location = useLocation();
    const [registros, setRegistros] = useState<RegistroPonto[]>([]);
    const [selectedItem, setSelectedItem] = useState<RegistroPonto | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [formState, setFormState] = useState<FormState>({ message: '', reason: '' });
    const [editState, setEditState] = useState<EditState>({ id: null, date: '', time: '' });
    const [loadingNewPoint, setLoadingNewPoint] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const abortControllerRef = useRef<AbortController | null>(null);
    const onPointsChangeRef = useRef(onPointsChange);

    useEffect(() => {
        onPointsChangeRef.current = onPointsChange;
    }, [onPointsChange]);

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
    }, [usuario, formState, handleCloseModal]);

    const getPonto = useCallback(async (): Promise<void> => {
        const funcionarioIdToUse = funcionario_id || String(usuario?.n_registro) || '';
        if (funcionarioIdToUse) {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            const controller = new AbortController();
            abortControllerRef.current = controller;

            setIsLoading(true);
            try {
                const dateToUse = date || new Date().toISOString();
                const pontos = await getPoints(funcionarioIdToUse, dateToUse, API_URL, controller.signal);
                if (!controller.signal.aborted) {
                    setRegistros(pontos);
                    if (onPointsChangeRef.current) {
                        onPointsChangeRef.current(pontos);
                    }
                }
                
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Requisição cancelada:", error.message);
                    return;
                }
                console.error("Erro ao buscar pontos:", error);
                setRegistros([]);
                if (onPointsChangeRef.current) {
                    onPointsChangeRef.current([]);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        }
    }, [funcionario_id, usuario?.n_registro, API_URL, date]);

    useImperativeHandle(ref, () => ({
        refreshPoints: getPonto,
        setLoadingNewPoint
    }), [getPonto]);

    useEffect(() => {
        getPonto();

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [getPonto]);

    const deletePonto = useCallback(async (id: string): Promise<void> => {
        if (!canDelete) return;

        try {
            setIsLoading(true);
            await axios.delete(`${API_URL}ponto/${id}`);
            console.log("Ponto deletado com sucesso!");
            await getPonto();
        } catch (error) {
            console.error("Erro ao deletar ponto:", error);
            setIsLoading(false);
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
            if (canRefresh) {
                setIsLoading(true);
                await getPonto();
            }
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
                {isLoading && !loadingNewPoint ? (
                    Array(4).fill(0).map((_, index) => (
                        <PointSkeleton key={`loading-${index}`} tema={tema} />
                    ))
                ) : (
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
                            <PointSkeleton key="new-point-loading" tema={tema} />
                        )}
                        {(!loadingNewPoint && sortedRegistros.length === 0) && (
                            <div className="col-span-4 flex items-center justify-center min-h-9 max-h-9 h-full">
                                <span className="text-center text-card w-full text-lg font-normal">Nenhum ponto registrado</span>
                            </div>
                        )}
                    </>
                )}
            </article>
        </>
    );
});

GeneratePoints.propTypes = {
    canDelete: PropTypes.bool,
    canRefresh: PropTypes.bool,
    funcionario_id: PropTypes.string,
    onPointsChange: PropTypes.func,
    date: PropTypes.string
};