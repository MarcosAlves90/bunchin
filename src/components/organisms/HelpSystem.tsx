import { useState } from "react";
import ReactModal from 'react-modal';
import { X, ChevronRight, MessageSquare, LifeBuoy } from 'lucide-react';
import { FAQ, getCategorias } from '../../utils/data/faqData';

export default function HelpSystem() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedFAQ(null);
    };    const selectFAQ = (faq: FAQ) => setSelectedFAQ(faq);
    const backToList = () => setSelectedFAQ(null);

    return (
        <>            
            <div
                className="fixed bottom-1 right-1 bg-highlight p-0.5 rounded-full z-5 border-3 border-secondary group cursor-pointer transition-colors duration-200 hover:bg-primary"
                onClick={openModal}
            >
                <LifeBuoy
                    size={35}
                    className="transition-transform duration-300 text-secondary group-hover:rotate-[18deg] group-hover:scale-110"
                />
            </div>

            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="Modal bg-secondary max-w-75 w-full rounded-sm p-2.5 flex flex-col"
                overlayClassName="Overlay"
                bodyOpenClassName="no-scroll"
            >
                <div className="flex items-center justify-between mb-2 pb-1 border-b-1 border-card">
                    <div className="flex items-center gap-1">
                        <MessageSquare className="text-highlight" size={24} />
                        <h2 className="text-2xl font-subrayada text-primary">CENTRAL DE AJUDA</h2>
                    </div>
                    <X 
                        className="cursor-pointer text-primary hover:text-red transition-colors" 
                        size={24} 
                        onClick={closeModal}
                    />
                </div>

                <div className="flex-1 overflow-y-auto max-h-[60vh]">
                    {!selectedFAQ ? (
                        <div className="space-y-3">
                            <p className="text-primary text-base mb-2">
                                Selecione uma pergunta abaixo para ver a resposta:
                            </p>
                            
                            {getCategorias().map(categoria => (
                                <div key={categoria.nome} className="mb-2">
                                    <h3 className="text-lg font-semibold text-highlight mb-1 border-b border-card pb-1">
                                        {categoria.label}
                                    </h3>
                                    <div className="space-y-1">
                                        {categoria.faqs.map((faq, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between p-1 rounded-sm border border-card hover:bg-card cursor-pointer transition-colors group"
                                                onClick={() => selectFAQ(faq)}
                                            >
                                                <span className="text-primary group-hover:text-primary text-sm font-semibold">
                                                    {faq.pergunta}
                                                </span>
                                                <ChevronRight 
                                                    size={16} 
                                                    className="text-card group-hover:text-primary transition-colors"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 mb-2">
                                <button
                                    onClick={backToList}
                                    className="text-highlight cursor-pointer hover:text-primary transition-colors text-sm flex items-center gap-1"
                                >
                                    ← Voltar
                                </button>
                            </div>
                            
                            <div className="bg-tertiary p-2 rounded-sm">
                                <h3 className="text-xl font-semibold text-highlight mb-1">
                                    {selectedFAQ.pergunta}
                                </h3>
                                <p className="text-primary text-base leading-relaxed">
                                    {selectedFAQ.resposta}
                                </p>
                            </div>

                            <div className="bg-card/30 p-2 rounded-sm">
                                <p className="text-primary text-sm">
                                    <strong>Ainda precisa de ajuda?</strong> Entre em contato conosco através da página de 
                                    <span className="text-highlight"> Contato</span> ou envie um email para 
                                    <span className="text-highlight"> contato@bunchin.com</span>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </ReactModal>
        </>
    );
}