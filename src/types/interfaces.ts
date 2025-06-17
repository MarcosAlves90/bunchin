// Interfaces principais do sistema Bunchin
// Arquivo criado para centralizar todas as definições de tipos

// ==================== INTERFACES DE USUÁRIO ====================

export interface Usuario {
    id?: string;
    n_registro: number;
    nome: string;
    email: string;
    funcao: string;
    cargo: string;
    departamento: string;
    cpf: string;
    status: string;
    organizacao_id: number;
    organizacao?: Organizacao;
}

export interface Organizacao {
    idOrganizacao: number;
}

export interface UserContextType {
    tema: string;
    setTema: React.Dispatch<React.SetStateAction<string>>;
    usuario: Usuario | null;
    setUsuario: React.Dispatch<React.SetStateAction<Usuario | null>>;
    API_URL: string;
}

export interface UserProviderProps {
    children: React.ReactNode;
}

// ==================== INTERFACES DE FUNCIONÁRIO ====================

export interface Funcionario {
    cpf: string;
    nome: string;
    email: string;
    n_registro: number;
    funcao: string;
    cargo: string;
    departamento: string;
}

export interface InputsType {
    senha: string;
    organizacao: {
        idOrganizacao: number;
    };
    n_registro?: string;
}

// ==================== INTERFACES DE PONTO ====================

export interface RegistroPonto {
    id: string;
    funcionario_fk: number;
    nome: string;
    data: Date;
}

export interface Ponto {
    id_ponto: string;
    data_hora: string;
    nome_tipo: string;
    funcionario_fk: number;
}

export interface PontoProcessado {
    nome: string;
    id: string;
    data: Date;
    funcionario_fk: number;
}

export interface GeneratePointsProps {
    canDelete?: boolean;
    canRefresh?: boolean;
    funcionario_id?: string;
    onPointsChange?: (registros: RegistroPonto[]) => void;
    date?: string;
}

export interface GeneratePointsRef {
    refreshPoints: () => Promise<void>;
    setLoadingNewPoint: (loading: boolean) => void;
}

export interface EditState {
    id: string | null;
    date: string;
    time: string;
}

export interface RegistroItemProps {
    registro: RegistroPonto;
    isAdmin: boolean;
    handleOpenModal: (registro: RegistroPonto) => void;
    onDeletePonto?: (id: string) => void;
    editState: EditState;
    setEditState: React.Dispatch<React.SetStateAction<EditState>>;
    updatePonto: (registro: RegistroPonto) => Promise<void>;
    formatLocalDate: (date: Date) => string;
}

// ==================== INTERFACES DE COMPONENTES ====================

export interface FormState {
    message: string;
    reason: string;
}

export interface ErrorModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedItem: RegistroPonto | null;
    formState: FormState;
    setFormState: React.Dispatch<React.SetStateAction<FormState>>;
    handleSendMessage: (data: Date) => void;
}

export interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    inverse?: boolean;
}

export interface PricingCardProps {
    title: string;
    price: string;
    period: string;
    features: string[];
    isPopular?: boolean;
    buttonText: string;
}

export interface ResourcePointProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
}

export interface DecorativePenasProps {
    isDown?: boolean;
}

// ==================== INTERFACES DE NAVEGAÇÃO ====================

export interface NavLink {
    to: string;
    label: string;
}

// ==================== INTERFACES DE FAQ ====================

export interface FAQ {
    pergunta: string;
    resposta: string;
    categoria: 'geral' | 'pontos' | 'conta' | 'sistema';
}

// ==================== INTERFACES DE COMPONENTES VISUAIS ====================

export interface PointSkeletonProps {
    tema: string;
}

export interface EmployeeSkeletonProps {
    tema: string;
}

export interface MapViewProps {
    latitude: number;
    longitude: number;
    zoom?: number;
    height?: string;
    width?: string;
}

export interface ThemeOption {
    value: string;
    label: string;
    icon: string;
}

export interface StoryProps {
    text: string;
    author: string;
    starNumber: number;
}

// ==================== INTERFACES DE PROJETO ====================

export interface FuncionarioProjeto {
    nome: string;
}

export interface Projeto {
    id: number;
    nome: string;
    dataInicio: string;
    dataTermino: string;
    descricao: string;
    idOrganizacao: string;
    responsavel: string;
    status: string;
    funcionarios: FuncionarioProjeto[];
    atividades: any[];
}

export interface ProjetoInputs {
    nome: string;
    dataInicio: string;
    dataTermino: string;
    descricao: string;
    idOrganizacao: string;
    responsavel: string;
    status: string;
    funcionarios: FuncionarioProjeto[];
    atividades: any[];
}
