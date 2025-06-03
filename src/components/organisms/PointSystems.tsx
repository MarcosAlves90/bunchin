import axios from "axios";
import PropTypes from "prop-types";
import ReactModal from 'react-modal';
import { useCallback, useContext, useState, useMemo } from "react";
import { UserContext } from "../../utils/context/userContext";
import { useLocation } from "react-router-dom";
import { SendEmail } from "../../utils/services/sendEmail";
import { CalendarDays, BadgeX, Pencil, PencilOff, OctagonAlert } from "lucide-react";
import Skeleton from 'react-loading-skeleton';
// @ts-ignore
import 'react-loading-skeleton/dist/skeleton.css';

ReactModal.setAppElement('#root');

export interface RegistroPonto {
    id: string;
    funcionario_fk: string;
    nome: string;
    data: Date;
}

interface GeneratePointsProps {
    registros: RegistroPonto[];
    deletePonto?: (id: string) => void;
    getPonto?: () => void;
}

interface FormState {
    message: string;
    reason: string;
}

interface EditState {
    id: string | null;
    date: string;
    time: string;
}

interface ErrorModalProps {
    isOpen: boolean;
    onClose: () => void;
    tema: string;
    selectedItem: RegistroPonto | null;
    formState: FormState;
    setFormState: React.Dispatch<React.SetStateAction<FormState>>;
    handleSendMessage: (data: Date) => void;
}

interface RegistroItemProps {
    registro: RegistroPonto;
    isAdmin: boolean;
    handleOpenModal: (registro: RegistroPonto) => void;
    deletePonto?: (id: string) => void;
    editState: EditState;
    setEditState: React.Dispatch<React.SetStateAction<EditState>>;
    updatePonto: (registro: RegistroPonto) => Promise<void>;
    formatLocalDate: (date: Date) => string;
}

// Componente de Modal extraído para melhorar a organização
const ErrorModal = ({ isOpen, onClose, tema, selectedItem, formState, setFormState, handleSendMessage }: ErrorModalProps) => (
    <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        className={`Modal ${tema}`}
        overlayClassName="Overlay"
        bodyOpenClassName="no-scroll"
    >
        <p className="modal-title">HOUVE UM ERRO NO SEU PONTO?</p>
        <p className="modal-p light">
            Fique à vontade para nos dizer o motivo. Nós analisaremos e retornaremos seu chamado via email cadastrado
        </p>
        <select
            className={`common-input ${tema} select`}
            onChange={e => setFormState(prev => ({ ...prev, reason: e.target.value }))}
            value={formState.reason}
        >
            <option value="Outro">Outro</option>
            <option value="Mudança de turno">Mudança de turno</option>
            <option value="Erro de fuso">Erro de fuso</option>
            <option value="Instruções não claras">Instruções não claras</option>
            <option value="Horário de verão">Horário de verão</option>
        </select>
        <textarea
            className={`common-input ${tema} textarea`}
            maxLength={250}
            rows={3}
            onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))}
            value={formState.message}
        />
        <p className="charCount">{formState.message.length}/250</p>
        <div className="box-buttons">
            <button className="button-cancel" onClick={onClose}>Cancelar</button>
            <button 
                className="button-send" 
                onClick={() => selectedItem && handleSendMessage(selectedItem.data)}
                disabled={!selectedItem}
            >
                Enviar
            </button>
        </div>
    </ReactModal>
);

// Componente para esqueletos de registros
const SkeletonItem = ({ tema }: { tema: string }) => {
    // Cores diferentes baseadas no tema
    const baseColor = tema === 'light' ? '#0f0f0f' : '#f0f0f0';
    const highlightColor = tema === 'light' ? '#212121' : '#d1d1d1';
    
    return (
        <Skeleton 
        className="absolute inset-0 h-full min-h-9 max-h-9 w-full rounded-sm"
        containerClassName='min-h-9 max-h-9 flex items-center justify-center'
        baseColor={baseColor}
        highlightColor={highlightColor}
        />
    );
};

// Componente para itens de registro (memoizado para evitar renderizações desnecessárias)
const RegistroItem = ({ registro, isAdmin, handleOpenModal, deletePonto, editState, 
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
                    {deletePonto && (
                        <BadgeX className="absolute top-0.5 right-0.5 cursor-pointer hover:text-red" onClick={() => deletePonto(registro.id)} />
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

export function GeneratePoints({ registros, deletePonto, getPonto }: GeneratePointsProps) {
    const { tema, usuario, API_URL } = useContext(UserContext);
    const location = useLocation();

    // Estados combinados para reduzir a quantidade de useState
    const [selectedItem, setSelectedItem] = useState<RegistroPonto | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [formState, setFormState] = useState<FormState>({ message: '', reason: '' });
    const [editState, setEditState] = useState<EditState>({ id: null, date: '', time: '' });

    // Funções utilitárias
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

    // Handlers otimizados
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

    const updatePonto = useCallback(async (registro: RegistroPonto): Promise<void> => {
        try {
            const updatedDate = getUpdatedDate(new Date(registro.data));
            await axios.put(`${API_URL}ponto/${registro.id}`, {
                id_ponto: registro.id,
                funcionario_fk: registro.funcionario_fk,
                nome_tipo: registro.nome,
                data_hora: updatedDate.toISOString()
            });
            // Chama getPonto apenas se estiver disponível
            if (getPonto) getPonto();
        } catch (error) {
            console.error("Erro ao salvar ponto:", error);
        }
    }, [API_URL, getUpdatedDate, getPonto]);

    // Ordenação de registros otimizada com memoização
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

    // Verificação se é administrador - memoizada para evitar recálculo
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
                tema={tema}
                selectedItem={selectedItem}
                formState={formState}
                setFormState={setFormState}
                handleSendMessage={handleSendMessage}
            />

            <article className={`grid grid-cols-4 gap-1`}>
                {sortedRegistros.length > 0 ? (
                    sortedRegistros.map(registro => (
                        <RegistroItem 
                            key={registro.id}
                            registro={registro}
                            isAdmin={isAdmin}
                            handleOpenModal={handleOpenModal}
                            deletePonto={deletePonto}
                            editState={editState}
                            setEditState={setEditState}
                            updatePonto={updatePonto}
                            formatLocalDate={formatLocalDate}
                        />
                    ))
                ) : (
                    // Renderiza 4 esqueletos quando não há registros
                    Array(4).fill(0).map((_, index) => (
                        <SkeletonItem key={index} tema={tema} />
                    ))
                )}
            </article>
        </>
    );
}

GeneratePoints.propTypes = {
    registros: PropTypes.array.isRequired,
    deletePonto: PropTypes.func,
    getPonto: PropTypes.func
};