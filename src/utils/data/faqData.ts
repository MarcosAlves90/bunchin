import { FAQ } from "../../types/interfaces";

export const faqData: FAQ[] = [
    {
        pergunta: "Como registrar meu ponto?",
        resposta: "Para registrar seu ponto, vá até a página de Pontos e clique no botão 'BATER PONTO'. O sistema registrará automaticamente a data e horário atual. Certifique-se de estar próximo ao local de trabalho se o modo 'ponto por proximidade' estiver ativado.",
        categoria: 'pontos'
    },    {
        pergunta: "Como alterar minha senha?",
        resposta: "Para alterar sua senha, vá até a página de Login e clique em 'Esqueci a senha'. Siga as instruções enviadas para seu email para redefinir sua senha.",
        categoria: 'conta'
    },
    {
        pergunta: "O que fazer se marquei o ponto incorretamente?",
        resposta: "Se você marcou o ponto incorretamente, clique no ícone de alerta (⚠️) no registro de ponto específico e relate o problema. Nossa equipe analisará sua solicitação e fará os ajustes necessários.",
        categoria: 'pontos'
    },
    {
        pergunta: "Como visualizar meu histórico de pontos?",
        resposta: "Você pode visualizar seu histórico de pontos na página de Perfil ou na página de Pontos. Use o seletor de data para filtrar registros de dias específicos. Os registros são organizados cronologicamente.",
        categoria: 'pontos'
    },    {
        pergunta: "Como atualizar meus dados pessoais?",
        resposta: "Você não pode editar seus dados pessoais diretamente no sistema. Para qualquer alteração em seus dados, entre em contato com um funcionário administrador que poderá fazer as mudanças necessárias.",
        categoria: 'conta'
    },
    {
        pergunta: "O sistema não está funcionando corretamente, o que fazer?",
        resposta: "Se você está enfrentando problemas técnicos, primeiro tente atualizar a página (F5). Se o problema persistir, verifique sua conexão com a internet. Para problemas mais complexos, entre em contato com o suporte através da página de Contato.",
        categoria: 'sistema'
    },
    {
        pergunta: "Como funciona o modo escuro/claro?",
        resposta: "Você pode alternar entre o modo claro e escuro clicando no ícone de configurações (⚙️) no canto superior direito da tela e selecionando sua preferência de tema. Sua escolha será salva automaticamente.",
        categoria: 'sistema'
    },
    {
        pergunta: "Posso registrar ponto de qualquer lugar?",
        resposta: "Isso depende das configurações da sua empresa. Se o 'ponto por proximidade' estiver ativado, você só poderá registrar pontos quando estiver próximo ao local de trabalho. Caso contrário, você pode registrar de qualquer lugar com acesso à internet.",
        categoria: 'pontos'
    }
];

// Função utilitária para obter categorias organizadas
export const getCategorias = () => {
    const categorias = Array.from(new Set(faqData.map(faq => faq.categoria)));
    return categorias.map(categoria => ({
        nome: categoria,
        label: categoria === 'geral' ? 'Geral' : 
            categoria === 'pontos' ? 'Registro de Pontos' :
            categoria === 'conta' ? 'Conta e Perfil' : 'Sistema',
        faqs: faqData.filter(faq => faq.categoria === categoria)
    }));
};
