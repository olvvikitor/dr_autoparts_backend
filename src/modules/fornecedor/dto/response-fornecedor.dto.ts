import { ApiProperty } from '@nestjs/swagger';

export class ResponseFornecedorDto {

  @ApiProperty({
    description: 'id do fornecedor',
    example: 'Pireli'
    })
  id: number


  @ApiProperty({
    description: 'Nome do fornecedor',
    example: 'Pireli'
    })
  name: string
  @ApiProperty({
    description: 'Código do fornecedor',
    example: 'P45704'
    })
  code:string
}