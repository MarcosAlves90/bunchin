import { useContext } from "react";
import { UserContext } from "../../utils/context/userContext.tsx";
import { UserContextType } from "../../types/interfaces";

export default function LoginFeathers() {
    const { tema } = useContext(UserContext) as UserContextType;

    return (
        <>
            <img 
                className={`login-penas-left ${tema === "dark" ? "invert-100" : ""}`}
                src={"https://res.cloudinary.com/dflvo098t/image/upload/penas_esquerda_login_rmo2aj.svg"} 
                alt={"Penas à esquerda"} 
            />
            <img 
                className={`login-penas-right ${tema === "dark" ? "invert-100" : ""}`}
                src={"https://res.cloudinary.com/dflvo098t/image/upload/penas_direita_login_c14tob.svg"}
                alt={"Penas à direita"} 
            />
        </>
    );
}
