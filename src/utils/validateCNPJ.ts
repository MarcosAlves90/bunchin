/**
 * Valida se um CNPJ é válido
 * @param cnpj - CNPJ para validar (pode conter máscaras)
 * @returns true se o CNPJ for válido, false caso contrário
 */
export function validateCNPJ(cnpj: string): boolean {
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    
    // Verifica se tem 14 dígitos
    if (cleanCNPJ.length !== 14) {
        return false;
    }
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{13}$/.test(cleanCNPJ)) {
        return false;
    }
    
    // Validação do primeiro dígito verificador
    let sum = 0;
    let weight = 5;
    for (let i = 0; i < 12; i++) {
        sum += parseInt(cleanCNPJ.charAt(i)) * weight;
        weight = weight === 2 ? 9 : weight - 1;
    }
    let remainder = sum % 11;
    const firstDigit = remainder < 2 ? 0 : 11 - remainder;
    if (firstDigit !== parseInt(cleanCNPJ.charAt(12))) return false;
    
    // Validação do segundo dígito verificador
    sum = 0;
    weight = 6;
    for (let i = 0; i < 13; i++) {
        sum += parseInt(cleanCNPJ.charAt(i)) * weight;
        weight = weight === 2 ? 9 : weight - 1;
    }
    remainder = sum % 11;
    const secondDigit = remainder < 2 ? 0 : 11 - remainder;
    if (secondDigit !== parseInt(cleanCNPJ.charAt(13))) return false;
    
    return true;
}

/**
 * Formata um CNPJ para exibição com máscara
 * @param cnpj - CNPJ para formatar
 * @returns CNPJ formatado (xx.xxx.xxx/xxxx-xx)
 */
export function formatCNPJ(cnpj: string): string {
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    return cleanCNPJ.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}
