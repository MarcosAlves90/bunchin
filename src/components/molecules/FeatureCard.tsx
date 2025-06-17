import { FeatureCardProps } from "../../types/interfaces";

export default function FeatureCard({ title, description, icon, inverse }: FeatureCardProps) {
    return (
        <div className={`rounded-sm p-2 cursor-pointer hover:scale-110 transition-all duration-300 ${inverse ? "bg-tertiary" : "bg-primary"}`}>
            <div className={`mb-1 flex justify-center text-highlight`}>
                {icon}
            </div>
            <h3 className={`text-xl font-semibold mb-1 text-center ${inverse ? "text-primary" : "text-secondary"}`}>
                {title}
            </h3>
            <p className={`leading-relaxed text-justify ${inverse ? "text-primary/80" : "text-secondary/80"}`}>
                {description}
            </p>
        </div>
    );
}
