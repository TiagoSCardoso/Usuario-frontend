export type Usuario = {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
}

export type NovoUsuario = Omit<Usuario, 'id'>;

// Estado inicial para um novo usuário (ideal para formulários de criação)
export const initialNovoUsuarioState: NovoUsuario = {
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
  };
  
  // Estado inicial para um usuário existente (ideal para formulários de edição)
  export const initialUsuarioState: Usuario = {
    id: 0,
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
  };