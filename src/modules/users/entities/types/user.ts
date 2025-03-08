
export type User = {
  id: number
  name: string
  cpf: string
  password: string
  empresa: Empresa
  endereco: Address
  contato: Contato
}
export type Address = {
  id: number
  estado: string
  cidade: string
  bairro: string
  rua: string
  numero: string
  cep: number
}
export type Contato ={
  id: number
  telefone: number
  email: string | null
}

export type Empresa ={
  id: number
  razão_social: string
  nome_fantasia: string | null
  atividade: string | null
  cnpj: number | null
  data_de_abertura: Date | null
  natureza_juridica: string | null
  cnaes_utilizados: string | null
  enderecoId: number | null
  contatoId: number | null
  userId: number
  created_at: Date
  updated_at: Date | null
}