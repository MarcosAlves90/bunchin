import PropTypes from "prop-types";
import { useCallback, useContext, useState, useMemo } from "react";
import { UserContext } from "../assets/ContextoDoUsuario.jsx";
import { useLocation } from "react-router-dom";
import ReactModal from 'react-modal';
import { SendEmail } from "./SendEmail.jsx";

ReactModal.setAppElement('#root');

export function GeneratePoints({ registros, deletePonto }) {
    const { tema, usuario } = useContext(UserContext);
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [charCount, setCharCount] = useState(0);
    const [message, setMessage] = useState("");
    const [reason, setReason] = useState("");

    const handleOpenModal = useCallback((registro) => {
        setSelectedItem(registro);
        setShowModal(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedItem(null);
        setShowModal(false);
        setCharCount(0);
        setMessage("");
        setReason("");
    }, []);

    const handleTextareaChange = (event) => {
        const { value } = event.target;
        setCharCount(value.length);
        setMessage(value);
    };

    const handleReasonChange = (event) => setReason(event.target.value);

    const handleSendMessage = (data) => {
        if (usuario.email) {
            SendEmail(import.meta.env.VITE_PUBLIC_API_KEY,
                import.meta.env.VITE_SERVICE_API_KEY,
                import.meta.env.VITE_TEMPLATE_API_KEY_2, {
                email: usuario.email,
                complaint: message,
                to_name: usuario.nome,
                datePoint: data,
                reason: reason,
            });
            handleCloseModal();
        } else {
            console.log('Email inválido');
        }
    };

    const sortedRegistros = useMemo(() => registros.sort((a, b) => new Date(a.data) - new Date(b.data)), [registros]);

    return (
        <>
            <ReactModal
                isOpen={showModal}
                contentLabel="onRequestClose Example"
                onRequestClose={handleCloseModal}
                className={`Modal ${tema}`}
                overlayClassName="Overlay"
                bodyOpenClassName="no-scroll"
            >
                <p className="modal-title">HOUVE UM ERRO NO SEU PONTO?</p>
                <p className="modal-p light">Fique à vontade para nos dizer o motivo. Nós analisaremos e retornaremos seu chamado via email cadastrado</p>
                <select className={`common-input ${tema} select`} onChange={handleReasonChange} value={reason}>
                    <option value="Outro">Outro</option>
                    <option value="Mudança de turno">Mudança de turno</option>
                    <option value="Erro de fuso">Erro de fuso</option>
                    <option value="Instruções não claras">Instruções não claras</option>
                    <option value="Horário de verão">Horário de verão</option>
                </select>
                <textarea className={`common-input ${tema} textarea`} maxLength={250} rows={3} onChange={handleTextareaChange} value={message} />
                <p className="charCount">{charCount}/250</p>
                <div className="box-buttons">
                    <button className="button-cancel" onClick={handleCloseModal}>Cancelar</button>
                    <button className="button-send" onClick={() => handleSendMessage(selectedItem.data)}>Enviar</button>
                </div>
            </ReactModal>
            <article className={`article-registro-itens ${tema}`}>
                {sortedRegistros.map(registro => {
                    const date = new Date(registro.data);
                    const isAdmin = location.pathname !== "/pontos" && location.pathname !== "/perfil" && usuario.funcao === "administrador";
                    return (
                        <div key={registro.id} className="registro-item">
                            {!isAdmin && <i className="bi bi-exclamation-circle-fill icon-warning" onClick={() => handleOpenModal(registro)}></i>}
                            {isAdmin && <i className="bi bi-trash3 icon-delete" onClick={() => deletePonto(registro.id)}></i>}
                            {isAdmin && <i className="bi bi-pen icon-edit"></i>}
                            <div className="display-flex-center">
                                <p className="nome">{registro.nome}</p>
                            </div>
                            <p className="horario">{date.toLocaleTimeString()}</p>
                            <div className="container-data">
                                <img className="icon-calendar" src="/Calendar_Days.svg" alt="Ícone de calendário" />
                                <p className="data">{`${date.getDate()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`}</p>
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
    deletePonto: PropTypes.func.isRequired
};