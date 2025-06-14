import { useState, useEffect } from "react";

/**
 * Hook personalizado para animação de pontos de carregamento
 * Cicla entre 0, 1, 2 e 3 pontos a cada 500ms
 */
export default function useLoadingDots(isLoading: boolean) {
    const [dots, setDots] = useState("");

    useEffect(() => {
        if (!isLoading) {
            setDots("");
            return;
        }

        const interval = setInterval(() => {
            setDots(prevDots => {
                switch (prevDots) {
                    case "":
                        return ".";
                    case ".":
                        return "..";
                    case "..":
                        return "...";
                    case "...":
                        return "";
                    default:
                        return "";
                }
            });
        }, 500);

        return () => clearInterval(interval);
    }, [isLoading]);

    return dots;
}
