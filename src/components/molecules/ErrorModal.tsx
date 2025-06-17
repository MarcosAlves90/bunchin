import ReactModal from 'react-modal';
import { ErrorModalProps } from '../../types/interfaces';

export const ErrorModal = ({ isOpen, onClose, selectedItem, formState, setFormState, handleSendMessage }: ErrorModalProps) => (
    <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        className={`Modal bg-secondary max-w-50 w-full rounded-sm p-2.5 flex flex-col items-center justify-center`}
        overlayClassName="Overlay"
        bodyOpenClassName="no-scroll"
    >
        <p className="modal-title font-subrayada text-3xl font-bold mb-1 text-primary">HOUVE UM ERRO NO SEU PONTO?</p>
        <p className="modal-p font-montserrat text-sm mb-0.5 text-primary">
            Fique à vontade para nos dizer o motivo. Nós analisaremos e retornaremos seu chamado via email cadastrado
        </p>
        <select
            className={`common-input select mb-2 w-full rounded-sm border-3 border-primary bg-secondary p-[0.7rem] text-base font-semibold text-primary`}
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
            className={`common-input textarea w-full resize-none rounded-sm border-3 border-primary bg-secondary p-[0.7rem] text-base text-primary`}
            maxLength={250}
            rows={3}
            onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))}
            value={formState.message}
        />
        <p className="charCount w-full text-start text-sm font-semibold text-primary">{formState.message.length}/250</p>
        <div className="box-buttons w-full mt-2.5 mb-0.5 flex items-center justify-center gap-1.5">
            <button className="button-cancel w-full max-w-15 cursor-pointer rounded-sm border-3 border-primary px-3.5 py-0.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-secondary" onClick={onClose}>Cancelar</button>
            <button className="button-send w-full max-w-15 cursor-pointer rounded-sm border-3 border-highlight px-3.5 py-0.5 text-sm font-semibold text-highlight transition-colors hover:bg-highlight hover:text-secondary" onClick={() => selectedItem && handleSendMessage(selectedItem.data)} disabled={!selectedItem}>
                Enviar
            </button>        </div>
    </ReactModal>
);
