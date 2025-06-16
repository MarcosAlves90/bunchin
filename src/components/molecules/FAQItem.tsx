import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { FAQItemProps } from "../../types/interfaces";

export default function FAQItem({ question, answer }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setHeight(isOpen ? contentRef.current.scrollHeight : 0);
        }
    }, [isOpen]);

    return (
        <div className="bg-tertiary rounded-sm overflow-hidden">
            <button
                className="w-full p-1 text-left flex justify-between cursor-pointer items-center hover:bg-secondary/20 transition-colors duration-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium text-primary pr-4 transition-colors duration-200">
                    {question}
                </span>
                <div className={`transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <ChevronDown className="text-highlight flex-shrink-0" size={20} />
                </div>
            </button>
            <div 
                className="transition-all duration-300 ease-in-out overflow-hidden"
                style={{ height: `${height}px` }}
            >
                <div 
                    ref={contentRef}
                    className={`p-1 border-t border-card flex items-center justify-center transition-opacity duration-200 ${
                        isOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <p className="text-primary/80 leading-relaxed text-justify">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
}
