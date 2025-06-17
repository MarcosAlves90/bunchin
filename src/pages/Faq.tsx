import FAQItem from "../components/molecules/FAQItem";
import { faqData } from "../utils/data/faqData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Faq() {
    const navigate = useNavigate();
    const [openItemIndex, setOpenItemIndex] = useState<number | null>(null);

    function handleHomeButtonClick() {
        navigate("/");
    }

    function handleItemToggle(index: number) {
        setOpenItemIndex(openItemIndex === index ? null : index);
    }

    return (
        <main className={`mainCommon text-base flex justify-center items-center flex-col`}>
            <div className="container rounded-sm p-2 flex flex-col gap-3 text-primary transition-colors max-w-60">
                <h1 className="title text-4xl font-subrayada">Perguntas Frequentes</h1>
                <div className="max-w-4xl mx-auto space-y-2">
                    {faqData.slice(0, 6).map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.pergunta}
                            answer={faq.resposta}
                            isOpen={openItemIndex === index}
                            onToggle={() => handleItemToggle(index)}
                        />
                    ))}
                </div>
                <button className="button-home button-session mx-auto" onClick={handleHomeButtonClick}>
                    Voltar para a página inicial
                </button>
            </div>
        </main>
    );
}