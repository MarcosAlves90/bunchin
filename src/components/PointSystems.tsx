import axios from "axios";
import PropTypes from "prop-types";
import ReactModal from 'react-modal';
import { useCallback, useContext, useState, useMemo } from "react";
import { UserContext } from "../utils/userContext.jsx";
import { useLocation } from "react-router-dom";
import { SendEmail } from "../utils/sendEmail.jsx";

ReactModal.setAppElement('#root');

export function GeneratePoints({ registros, deletePonto, getPonto }) {
    // Contexto e hooks principais
    const { tema, usuario, API_URL } = useContext(UserContext);
    const location = useLocation();

    // Estados do componente
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [charCount, setCharCount] = useState(0);
    const [message, setMessage] = useState("");
    const [reason, setReason] = useState("");
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [editedDate, setEditedDate] = useState("");
    const [editedTime, setEditedTime] = useState("");

    // Abre modal de erro de ponto
    const handleOpenModal = useCallback((registro) => {
        setSelectedItem(registro);
        setShowModal(true);
    }, []);

    // Fecha modal e reseta estados
    const handleCloseModal = useCallback(() => {
        setSelectedItem(null);
        setShowModal(false);
        setCharCount(0);
        setMessage("");
        setReason("");
    }, []);

    // Atualiza mensagem do textarea
    const handleTextareaChange = (event) => {
        setCharCount(event.target.value.length);
        setMessage(event.target.value);
    };

    // Atualiza motivo selecionado
    const handleReasonChange = (event) => setReason(event.target.value);

    // Envia email de erro de ponto
    const handleSendMessage = (data) => {
        if (usuario.email) {
            SendEmail(
                import.meta.env.VITE_PUBLIC_API_KEY,
                import.meta.env.VITE_SERVICE_API_KEY,
                import.meta.env.VITE_TEMPLATE_API_KEY_2,
                {
                    email: usuario.email,
                    complaint: message,
                    to_name: usuario.nome,
                    datePoint: data,
                    reason: reason,
                }
            );
            handleCloseModal();
        }
    };

    // Permite apenas números e separadores nos inputs de data/hora
    const handleKeyDown = (event, separator) => {
        const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', separator];
        const value = event.target.value;
        if (event.key === 'Backspace' && value[event.target.selectionStart - 1] === separator) {
            event.preventDefault();
        } else if (!allowedKeys.includes(event.key) && !/^\d$/.test(event.key)) {
            event.preventDefault();
        }
    };

    // Atualiza estados de data/hora
    const handleChange = (setter) => (event) => setter(event.target.value);

    // Gera data/hora atualizada para edição
    const getUpdatedDate = (originalDate) => {
        const [day, month, year] = (editedDate || originalDate.toLocaleDateString('pt-BR')).split('/').map(Number);
        const fullYear = year < 100 ? 2000 + year : year;
        const [hours, minutes, seconds] = (editedTime || originalDate.toLocaleTimeString('pt-BR')).split(':').map(Number);
        return new Date(fullYear, month - 1, day, hours, minutes, seconds);
    };

    // Atualiza ponto editado
    const updatePonto = async (registro) => {
        const updatedDate = getUpdatedDate(new Date(registro.data));
        const updatedData = {
            id_ponto: registro.id,
            funcionario_fk: registro.funcionario_fk,
            nome_tipo: registro.nome,
            data_hora: updatedDate.toISOString()
        };
        try {
            await axios.put(`${API_URL}ponto`, updatedData);
            getPonto();
        } catch (error) {
            console.error("Erro ao salvar ponto:", error);
        }
    };

    // Alterna modo de edição do ponto
    const handlePenButtonClick = (registro) => {
        if (selectedPoint === registro.id) {
            updatePonto(registro);
            setSelectedPoint(null);
            setEditedDate("");
            setEditedTime("");
        } else {
            setSelectedPoint(registro.id);
            const originalDate = new Date(registro.data);
            setEditedDate(
                originalDate
                    .toLocaleDateString('pt-BR')
                    .replace(/(\d{4})$/, (match) => match.slice(-2))
            );
            setEditedTime(originalDate.toLocaleTimeString('pt-BR'));
        }
    };

    // Ordena registros conforme contexto
    const sortedRegistros = useMemo(() => {
        const isPerfilOrAdmin = location.pathname === "/perfil" || usuario.funcao === "administrador";
        return registros.sort((a, b) => {
            const dateA = new Date(a.data);
            const dateB = new Date(b.data);
            if (isPerfilOrAdmin) {
                return dateA.toDateString() === dateB.toDateString() ? dateA - dateB : dateB - dateA;
            } else {
                return dateA - dateB;
            }
        });
    }, [registros, location.pathname, usuario.funcao]);

    // Renderização principal
    return (
        <>
            {/* Modal para reportar erro de ponto */}
            <ReactModal
                isOpen={showModal}
                onRequestClose={handleCloseModal}
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
                    onChange={handleReasonChange}
                    value={reason}
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
                    onChange={handleTextareaChange}
                    value={message}
                />
                <p className="charCount">{charCount}/250</p>
                <div className="box-buttons">
                    <button className="button-cancel" onClick={handleCloseModal}>Cancelar</button>
                    <button className="button-send" onClick={() => handleSendMessage(selectedItem.data)}>Enviar</button>
                </div>
            </ReactModal>

            {/* Lista de registros de ponto */}
            <article className={`article-registro-itens ${tema}`}>
                {sortedRegistros.map(registro => {
                    const originalDate = new Date(registro.data);
                    const isAdmin = location.pathname !== "/pontos" && location.pathname !== "/perfil" && usuario.funcao === "administrador";
                    return (
                        <div key={registro.id} className="registro-item">
                            {/* Ícones de ação */}
                            {!isAdmin && (
                                <i
                                    className="bi bi-exclamation-circle-fill icon-warning"
                                    onClick={() => handleOpenModal(registro)}
                                ></i>
                            )}
                            {isAdmin && (
                                <>
                                    <i
                                        className="bi bi-trash3-fill icon-delete"
                                        onClick={() => deletePonto(registro.id)}
                                    ></i>
                                    <i
                                        className={`bi ${selectedPoint === registro.id ? "bi-pen" : "bi-pen-fill"} icon-edit`}
                                        onClick={() => handlePenButtonClick(registro)}
                                    ></i>
                                </>
                            )}

                            {/* Nome do ponto */}
                            <div className="display-flex-center">
                                <p className="nome">{registro.nome}</p>
                            </div>

                            {/* Input de horário */}
                            <input
                                className="horario"
                                name="hours"
                                disabled={selectedPoint !== registro.id}
                                onChange={handleChange(setEditedTime)}
                                onKeyDown={(e) => handleKeyDown(e, ':')}
                                value={
                                    selectedPoint === registro.id
                                        ? editedTime
                                        : originalDate.toLocaleTimeString('pt-BR')
                                }
                            />

                            {/* Input de data */}
                            <div className="container-data">
                                <img className="icon-calendar" src="/Calendar_Days.svg" alt="Ícone de calendário" />
                                <input
                                    className="data"
                                    name="date"
                                    disabled={selectedPoint !== registro.id}
                                    onChange={handleChange(setEditedDate)}
                                    onKeyDown={(e) => handleKeyDown(e, '/')}
                                    value={
                                        selectedPoint === registro.id
                                            ? editedDate
                                            : originalDate
                                                .toLocaleDateString('pt-BR')
                                                .replace(/(\d{4})$/, (match) => match.slice(-2))
                                    }
                                />
                            </div>
                        </div>
                    );
                })}
            </article>
        </>
    );
}

GeneratePoints.propTypes = {
    registros: PropTypes.array.isRequired,
    deletePonto: PropTypes.func.isRequired,
    getPonto: PropTypes.func.isRequired
};