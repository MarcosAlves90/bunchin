interface PricingCardProps {
    title: string;
    price: string;
    period: string;
    features: string[];
    isPopular?: boolean;
    buttonText: string;
}

export default function PricingCard({ 
    title, 
    price, 
    period, 
    features, 
    isPopular = false, 
    buttonText 
}: PricingCardProps) {
    return (
        <div className={`relative border rounded-sm p-2 transition-all duration-300 ${
            isPopular ? 'border-highlight border-2 transform scale-105 bg-tertiary' : 'border-tertiary bg-secondary'
        }`}>
            {isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-3 py-1 rounded-sm font-medium text-highlight">
                        Mais Popular
                    </span>
                </div>
            )}
            
            <div className="text-center mb-1">
                <h3 className="text-xl font-semibold text-primary mb-1 transition-colors duration-200">
                    {title}
                </h3>
                <div className="flex items-baseline justify-center mb-1">
                    <span className="text-3xl font-bold text-primary transition-colors duration-200">
                        {price}
                    </span>
                    <span className="text-primary/60 ml-[0.2rem] transition-colors duration-200">
                        {period}
                    </span>
                </div>
            </div>

            <ul className="space-y-1 mb-2">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-highlight/20 flex items-center justify-center flex-shrink-0">
                            <div className="w-1 h-1 rounded-full bg-highlight"></div>
                        </div>
                        <span className="text-primary/80 transition-colors duration-200">
                            {feature}
                        </span>
                    </li>
                ))}
            </ul>

            <button className={`border-none transition text-lg px-2 py-[0.7rem] rounded-sm cursor-pointer font-medium max-w-20 w-full ${
                isPopular 
                    ? 'bg-highlight hover:bg-primary text-secondary' 
                    : 'bg-tertiary hover:bg-highlight text-card hover:text-secondary hover:border-highlight'
            }`}>
                {buttonText}
            </button>
        </div>
    );
}
