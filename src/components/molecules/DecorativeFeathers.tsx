import { useContext } from "react";
import { UserContext } from "../../utils/context/userContext";

interface DecorativePenasProps {
    isDown?: boolean;
}

interface UserContextType {
    tema: string;
}

export default function DecorativePenas({ isDown = false }: DecorativePenasProps) {
    const { tema } = useContext(UserContext) as UserContextType;

    return (
        <>
            <img 
                className={`mainCommon__hero__penas ${isDown ? "down" : ""} left left-[-180px] ${tema === "light" ? "invert-100" : ""}`} 
                src={"https://res.cloudinary.com/dflvo098t/image/upload/penas_esquerda_home_d8exir.svg"}
                alt={"Penas à esquerda"} 
            />
            <img 
                className={`mainCommon__hero__penas ${isDown ? "down" : ""} right right-[-180px] ${tema === "light" ? "invert-100" : ""}`} 
                src={"https://res.cloudinary.com/dflvo098t/image/upload/penas_direita_home_xdc34t.svg"}
                alt={"Penas à direita"} 
            />
        </>
    );
}
