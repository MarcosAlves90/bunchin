import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FAQItemProps } from "../../types/interfaces";

export default function FAQItem({ question, answer }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-tertiary rounded-sm overflow-hidden bg-secondary/10 backdrop-blur-sm">
            <button
                className="w-full p-4 text-left flex justify-between items-center hover:bg-secondary/20 transition-colors duration-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium text-primary pr-4 transition-colors duration-200">
                    {question}
                </span>
                {isOpen ? (
                    <ChevronUp className="text-highlight flex-shrink-0" size={20} />
                ) : (
                    <ChevronDown className="text-highlight flex-shrink-0" size={20} />
                )}
            </button>
            {isOpen && (
                <div className="p-4 pt-0 border-t border-tertiary/50">
                    <p className="text-primary/80 leading-relaxed transition-colors duration-200">
                        {answer}
                    </p>
                </div>
            )}
        </div>
    );
}
