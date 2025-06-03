import { useNavigate } from "react-router-dom";

export default function Sobre() {
    const navigate = useNavigate();

    function handleHomeButtonClick() {
        navigate("/");
    }

    return (
        <main className={`mainCommon text-base flex justify-center items-center flex-col`}>
            <div className="bg-card rounded-sm w-full p-2 flex flex-col gap-1 text-primary transition-colors">
                <h1 className="sobre-title text-4xl font-subrayada mb-2">Sobre Nós</h1>
                <p className="sobre-description text-lg text-justify">
                    Bem-vindo ao Bunchin! Somos uma plataforma inovadora dedicada à gestão de ponto e dados de
                    funcionários. Nossa missão é transformar a maneira como as empresas gerenciam suas equipes,
                    oferecendo uma solução intuitiva, eficiente e confiável.<br/>No Bunchin, acreditamos que a tecnologia
                    pode simplificar processos e melhorar a produtividade, permitindo que as empresas se concentrem no
                    que realmente importa: seu crescimento e sucesso. Junte-se a nós e descubra como podemos facilitar a
                    vida da sua empresa e de seus colaboradores.
                </p>
                <button className="button-home button-session mx-auto mt-2" onClick={handleHomeButtonClick}>
                    Voltar para a página inicial
                </button>
            </div>
        </main>
    );
}