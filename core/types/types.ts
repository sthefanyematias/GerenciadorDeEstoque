export interface Produto {
    id: number;
    nome: string;
    fabricante: string;
    data_fabricacao: string;
    data_validade: string;
    preco: number;
    quantidade: number;
}

export interface Funcionario {
    id: number;
    nome: string;
    cargo: string;
    setor: string;
    salario: number;
    data_admissao: string;
    role: 'admin' | 'operador' | 'consulta';
    senha: string;
    onboarded: boolean;
    nomePreferido?: string;
    // idade?: number;
    email?: string;
}

export interface AuthData {
    id: number;
    nome: string;
    role: 'admin' | 'operador' | 'consulta';
    token?: string;
    onboarded: boolean;
}
