import { ApiProperty } from '@nestjs/swagger'
import { TipoUnidade } from '@prisma/client'

export interface RespondeModelDto{
  name: string
  marca: string
  ano:string
}
export interface Fornecedor{
  name:string
}

export class ResponseProductDto{
  id:number
  descricao:string
  tipo: TipoUnidade
  modelos: RespondeModelDto[]
  fornecedores: Fornecedor[]
  categoria:string
  name:string
  imgUrl?:string
}