export function validatePhone(phone: string): boolean {
    // Remove todos os caracteres não numéricos
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Telefone brasileiro deve ter 10 ou 11 dígitos
    // 10 dígitos: (XX) XXXX-XXXX (telefone fixo)
    // 11 dígitos: (XX) XXXXX-XXXX (celular)
    return cleanPhone.length === 10 || cleanPhone.length === 11;
}

export function formatPhone(phone: string): string {
    // Remove todos os caracteres não numéricos
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Se não tem dígitos, retorna vazio
    if (cleanPhone.length === 0) return '';
    
    // Aplica a formatação baseada no número de dígitos
    if (cleanPhone.length <= 2) {
        return `(${cleanPhone}`;
    } else if (cleanPhone.length <= 6) {
        return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2)}`;
    } else if (cleanPhone.length <= 10) {
        return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 6)}-${cleanPhone.slice(6)}`;
    } else {
        // Para celular (11 dígitos)
        return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 7)}-${cleanPhone.slice(7, 11)}`;
    }
}
